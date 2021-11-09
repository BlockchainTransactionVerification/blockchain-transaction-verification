import User from "../models/usersModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import mongoose from "mongoose";

//register function to register a user
//input - Username, Password, Email, CompanyName, BusinessAddress, RepFirstName, RepLastName, Position
//output -
// success - status: 200; success: true, msg: "User has been successfully activated"
// failed - status: 442; error:"some message"

export const registerUser = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("you are in register api");
  const {
    Username,
    Password,
    Email,
    CompanyName,
    BusinessAddress,
    RepFirstName,
    RepLastName,
    Position,
    isSeller,
  } = req.body;
  if (!Username || !Password || !Email) {
    console.log("register api: please add all the fields");
    return res.status(442).json({ error: "please add all the fields" });
  }
  if (isSeller === "0") {
    isSeller == false;
  } else if (isSeller === "1") {
    isSeller == true;
  } else {
    res.status(404).json({ error: "no seller status" });
  }
  //checks database for a user with this username
  User.findOne({ Username: Username }).then((savedUser) => {
    //if a user by this username exists, error
    if (savedUser) {
      console.log("register api: Username Taken");
      return res.status(442).json({ error: "Username Taken" });
    }
    //if it does not exist, hash the password
    bcrypt
      .hash(Password, 12)
      .then((hashedPassword) => {
        const Users = new User({
          Username,
          Password: hashedPassword,
          Email,
          CompanyName,
          BusinessAddress,
          RepFirstName,
          RepLastName,
          Position,
          isSeller,
          temporarytoken: jwt.sign(Username, process.env.JWT_SECRET),
          active: false,
        });
        Users.save()
          .then((user) => {
            console.log("saved successfully");
          })
          .catch((err) => {
            console.log(err);
          });
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const hrefLink =
          "https://blkchn-trxn-verif.herokuapp.com/api/verify/" +
          Users.temporarytoken;
        //"http://localhost:5000/api/verify/" + Users.temporarytoken;
        const msg = {
          to: Users.Email, // Change to your recipient
          from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
          subject:
            "Thank you For Registering with BlockChain Transaction Verification",
          text: `Hello ${Users.Username}, Click Here to Activate your Account.`,
          html: `Hello<strong> ${Users.Username}</strong>,<br><br><a href=${hrefLink}> Click Here to Activate your Account.</a>`,
        };
        sgMail
          .send(msg)
          .then((response) => {
            console.log("Email sent from register :" + response);
            return res.status(200).json({
              //ID: user.id,
              success: true,
              msg: "User has been registered",
            });
          })
          .catch((error) => {
            console.log("register catch error: " + error);
            console.error(error);
          });
        console.log("register redirect");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//login function to login a user
//input - Username, Password
//output -
// success - status: 200;  token, id: savedUser._id, name: savedUser.FirstName, email: savedUser.Email
// failed - status: 442; error:"some message"

export const loginUser = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("login");
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    console.log("something is missing");
    return res
      .status(442)
      .json({ error: "Please add both Email and Password" });
  }
  User.findOne({ Username: Username }).then((savedUser) => {
    if (!savedUser) {
      console.log("username is scuffed");
      return res
        .status(442)
        .json({ error: "Please add both Email and Password" });
    }
    if (savedUser.active == false) {
      console.log("user not verified");
      return res.status(442).json({ error: "the user is not verified" });
    }
    bcrypt
      .compare(Password, savedUser.Password)
      .then((doMatch) => {
        if (doMatch) {
          //res.json({msg:"successfully signed in"})
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                id: savedUser._id,
                username: savedUser.Username,
                email: savedUser.Email,
                companyName: savedUser.CompanyName,
                businessAddress: savedUser.BusinessAddress,
                firstName: savedUser.RepFirstName,
                lastName: savedUser.RepLastName,
                position: savedUser.Position,
                isSeller: savedUser.isSeller,
                walletID: savedUser.WalletID,
              });
            }
          );
        } else {
          console.log("pass is scuffed");
          return res
            .status(442)
            .json({ error: "Please add both Email and Password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// function to delete users
export const deleteUser = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  if (!id) {
    console.log("id is missing");
    return res.status(442).json({ error: "ID is missing" });
  }
  User.deleteOne({ _id: id }, function (err) {
    if (err) console.log(err);
    res.json({
      //ID: user.id,
      success: true,
      msg: "User has been successfully deleted",
    });
  });
});

//function to verify users
//input - token
//output -
// success - status: 200; success: true, msg: "User has been successfully activated"
// failed - status: 442; error:"some message"

export const verifyUser = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("verifyUser api: ");
  User.findOne({ temporarytoken: req.params.id }, (err, user) => {
    if (err) throw err; // Throw error if cannot login
    const token = req.params.id; // Save the token from URL for verification
    // Function to verify the user's token
    // jwt.verify(token, JWT_SECRET, (err, decoded) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(442).json({ error: "Activation link has expired." }); // Token is expired
      } else if (!user) {
        console.log("no user found");
        res.status(442).json({ error: "no user found" });
        //res.redirect(303, "https://blkchn-trxn-verif.herokuapp.com/login");
      } else {
        user.temporarytoken = false; // Remove temporary token
        user.active = true; // Change account status to Activated
        // Mongoose Method to save user into the database
        user.save((err) => {
          if (err) {
            console.log(err); // If unable to save user, log error info to console/terminal
          } else {
            // If save succeeds, create e-mail object
            // sgMail.setApiKey(SENDGRID_KEY)
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: user.Email, // Change to your recipient
              from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
              subject: "Verified",
              text: `Hello ${user.Username}, Your account has been successfully activated!`,
              //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here to Activate your Account or don't I am not your mom`,
              html: `Hello<strong> ${user.Username}</strong>,<br><br>Your account has been successfully activated!`,
            };
            // Send e-mail object to user
            sgMail
              .send(msg)
              .then(() => {
                console.log("Email sent from verify User");
              })
              .catch((error) => {
                console.error(error);
              });
            res.json({
              success: true,
              msg: "User has been successfully activated",
            });
            //res.redirect(303, "https://blkchn-trxn-verif.herokuapp.com/login");
            //res.redirect(303, "http://localhost:3000/login");
          }
        });
      }
    });
  });
});

//update user
//input - id and any other valid field for users
//output -
// success - status: 200; success: true, msg: "User has been successfully edited"
// failed - status: 442; error:"some message"

export const updateUser = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  if (!req.body.id) {
    return res.status(442).json({ error: "ID is missing" });
  }
  const updates = await User.findById(req.body.id);
  if (!updates) {
    return res.status(442).json({ error: "User not found" });
  }

  for (var fieldName in req.body) {
    if (updates[fieldName] != null && !(updates[fieldName] === "")) {
      updates[fieldName] = req.body[fieldName];
    }
  }

  updates.save().then((result, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    } else {
      return res.json({
        success: true,
        msg: "User has been successfully edited",
      });
    }
  });
});

export const registerUserMobile = asyncHandler(async (req, res) => {
  console.log("you are in registerMobile api");
  const {
    Username,
    Password,
    Email,
    CompanyName,
    BusinessAddress,
    RepFirstName,
    RepLastName,
    Position,
    isSeller,
  } = req.body;
  if (!Username || !Password || !Email) {
    return res.status(442).json({ error: "please add all the fields" });
  }
  //checks database for a user with this username
  User.findOne({ Username: Username }).then((savedUser) => {
    //if a user by this username exists, error
    if (savedUser) {
      return res.status(442).json({ error: "Username Taken" });
    }
    //if it does not exist, hash the password
    bcrypt
      .hash(Password, 12)
      .then((hashedPassword) => {
        const Users = new User({
          Username,
          Password: hashedPassword,
          Email,
          CompanyName,
          BusinessAddress,
          RepFirstName,
          RepLastName,
          Position,
          temporarytoken: Math.floor(
            Math.random() * (1000000 - 100000) + 100000
          ),
          active: false,
          isSeller,
        });
        Users.save()
          .then((user) => {
            console.log("saved successfully");
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
              to: user.Email, // Change to your recipient
              from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
              subject:
                "Thank you For Registering with BlockChain Transaction Verification",
              text: `Hello ${Users.Username}, Here is your 6 digit code: ${Users.temporarytoken}`,
            };
            sgMail
              .send(msg)
              .then(() => {
                console.log("Email sent from register mobile");
              })
              .catch((error) => {
                console.error(error);
              });
            res.json({
              //ID: user.id,
              success: true,
              msg: "User has been successfully added",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//function to verify users via mobile
//input - token
//output -
// success - status: 200; success: true, msg: "User has been successfully activated"
// failed - status: 442; error:"some message"

export const verifyUserMobile = asyncHandler(async (req, res) => {
  console.log("verifyUserMobile");
  User.findOne({ temporarytoken: req.body.token }, (err, user) => {
    if (err) throw err; // Throw error if cannot login
    const token = req.params.token; // Save the token from URL for verification
    // Function to verify the user's token
    // jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!user) {
      return res.status(442).json({ error: "Activation link has expired." }); // Token may be valid but does not match any user in the database
    } else {
      user.temporarytoken = false; // Remove temporary token
      user.active = true; // Change account status to Activated
      // Mongoose Method to save user into the database
      user.save((err) => {
        if (err) {
          console.log(err); // If unable to save user, log error info to console/terminal
        } else {
          // If save succeeds, create e-mail object
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          console.log("creating email");
          const msg = {
            to: user.Email, // Change to your recipient
            from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
            subject: "Verified",
            text: `Hello ${user.Username}, Your account has been successfully activated!`,
            //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here to Activate your Account or don't I am not your mom`,
            html: `Hello<strong> ${user.Username}</strong>,<br><br>Your account has been successfully activated!`,
          };
          // Send e-mail object to user
          console.log("sending email");
          sgMail
            .send(msg)
            .then(() => {
              console.log("Email sent from verify mobile");
            })
            .catch((error) => {
              console.error(error);
            });
          res.json({
            success: true,
            msg: "User has been successfully activated",
          });
        }
      });
    }
  });
});

//function to send password reset code to users email
//input - Email
//output -
// success - status: 200; success: true, msg: "User has been successfully activated"
// failed - status: 442; error:"some message"
export const passResetEmail = asyncHandler(async (req, res) => {
  console.log("you are in passResetEmail api");
  const email = req.body.Email;
  const updates = await User.findOne({ Email: email });
  if (!updates) {
    return res.status(442).json({ error: "User not found" });
  }
  updates.temporarytoken = Math.floor(
    Math.random() * (1000000 - 100000) + 100000
  );
  updates.save().then((user, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    } else {
      console.log("saved successfully");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const hrefLink =
        "https://blkchn-trxn-verif.herokuapp.com/api/ResetPassword/" +
        user.temporarytoken;
      //"https://localhost:5000/api/ResetPassword/" + user.temporarytoken;
      const msg = {
        to: user.Email, // Change to your recipient
        from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
        subject: "BlockChain Transaction Verification Password Reset",
        text: `Hello ${user.Username}, Click Here to Reset your Password`,
        html: `Hello<strong> ${user.Username}</strong>,<br><br><a href=${hrefLink}> Click Here to Reset your Password.</a>`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent from reset password email");
        })
        .catch((error) => {
          console.error(error);
        });
      res.json({
        //ID: user.id,
        success: true,
        msg: "User has been successfully added",
      });
    }
  });
});

//function to send password reset code to users email
//input - Email
//output -
// success - status: 200; success: true, msg: "User has been successfully activated"
// failed - status: 442; error:"some message"

export const passResetEmailMobile = asyncHandler(async (req, res) => {
  console.log("you are in passResetEmailMobile api");
  const email = req.body.email;
  const updates = await User.findOne({ Email: email });
  if (!updates) {
    return res.status(442).json({ error: "User not found" });
  }
  updates.temporarytoken = Math.floor(
    Math.random() * (1000000 - 100000) + 100000
  );
  updates.save().then((user, err) => {
    if (err) {
      return res.status(442).json({ error: err });
    } else {
      console.log("saved successfully");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.Email, // Change to your recipient
        from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
        subject:
          "Thank you For Registering with BlockChain Transaction Verification",
        text: `Hello ${user.Username}, Here is your 6 digit code: ${user.temporarytoken}`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent from passresetemailmobile ");
        })
        .catch((error) => {
          console.error(error);
        });
      res.json({
        //ID: user.id,
        success: true,
        msg: "User has been successfully added",
      });
    }
  });
});

//function to verify password reset code and set their new password
//input - password and param id
//output -
// success - status: 200; success: true, msg: "password has been successfully reset"
// failed - status: 442; error:"some message"
export const resetPasswordMobile = asyncHandler(async (req, res) => {
  console.log("you are in resetPasswordMobile api");
  if (!req.body.newPass) {
    return res.status(442).json({ error: "please add all the fields" });
  }
  User.findOne({ temporarytoken: req.body.token }, async (err, user) => {
    if (err) throw err; // Throw error if cannot login
    if (!user) return res.status(442).json({ error: "user not found" });
    const token = req.body.token; // Save the token from URL for verification
    // Function to verify the user's token
    user.temporarytoken = false; // Remove temporary token
    await bcrypt.hash(req.body.newPass, 12).then((hashedPass) => {
      user.Password = hashedPass;
    });
    // Mongoose Method to save user into the database
    user.save((err) => {
      if (err) {
        console.log(err); // If unable to save user, log error info to console/terminal
        return res.status(442).json({ error: "user not found" });
      } else {
        // If save succeeds, create e-mail object
        // sgMail.setApiKey(SENDGRID_KEY)
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        console.log("creating email");
        const msg = {
          to: user.Email, // Change to your recipient
          from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
          subject: "Verified",
          text: `Hello ${user.Username}, Your Password has been successfully Reset!`,
        };
        // Send e-mail object to user
        console.log("sending email");
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent resetPasswordMobile");
          })
          .catch((error) => {
            console.error(error);
          });
        res.json({
          success: true,
          msg: "password has been successfully reset",
        });
      }
    });
  }).catch((error) => {
    console.error(error);
    return res.status(442).json({ error: "user not found" });
  });
});

//function to verify password reset code and set their new password
//input - password and param id(the id at the end of the url)
//output -
// success - status: 200; success: true, msg: "password has been successfully reset"
// failed - status: 442; error:"some message"
export const ResetPassword = asyncHandler(async (req, res) => {
  if (!req.body.Password) {
    return res.status(442).json({ error: "please add all the fields" });
  }
  User.findOne({ temporarytoken: req.params.id }, async (err, user) => {
    if (err) throw err; // Throw error if cannot login
    if (!user) return res.status(442).json({ error: "user not found" });
    const token = req.params.id; // Save the token from URL for verification
    // Function to verify the user's token
    user.temporarytoken = false; // Remove temporary token
    await bcrypt.hash(req.body.Password, 12).then((hashedPass) => {
      user.Password = hashedPass;
    });
    // Mongoose Method to save user into the database
    user.save((err) => {
      if (err) {
        console.log(err); // If unable to save user, log error info to console/terminal
        return res.status(442).json({ error: "user not found" });
      } else {
        // If save succeeds, create e-mail object
        // sgMail.setApiKey(SENDGRID_KEY)
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        console.log("creating email");
        const msg = {
          to: user.Email, // Change to your recipient
          from: "BlockChainUCFSD@gmail.com", // Change to your verified sender
          subject: "Verified",
          text: `Hello ${user.Username}, Your Password has been successfully Reset!`,
        };
        // Send e-mail object to user
        console.log("sending email");
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent ResetPassword");
          })
          .catch((error) => {
            console.error(error);
          });
        res.json({
          success: true,
          msg: "password has been successfully reset",
        });
      }
    });
  }).catch((error) => {
    console.error(error);
    return res.status(442).json({ error: "user not found" });
  });
});

//get Company Name
//input - id array
//output -
// success - status: 200; an array of JSON objects each with their ID and company name
// failed - status: 442; error:"some message"

export const getCompanyName = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("in getcompanyName");
  if (!req.body.id) {
    return res.status(442).json({ error: "ID is missing" });
  }
  var inputs = [];
  req.body.id.forEach((element) => {
    inputs.push(element);
  });

  inputs = inputs.map(function (el) {
    return mongoose.Types.ObjectId(el);
  });

  let outputs = await User.aggregate([
    {
      $project: {
        CompanyName: 1,
      },
    },
    { $match: { _id: { $in: inputs } } },
  ]);
  if (!outputs) {
    return res.status(442).json({ error: "User not found" });
  }
  return res.json(outputs);
});
