import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

//register function to register a user
//input - Username, Password, Email, CompanyName, BusinessAddress, RepFirstName, RepLastName, Position
//output -
        // success - status: 200; success: true, msg: "User has been successfully activated"
        // failed - status: 442; error:"some message"

export const registerUser = asyncHandler(async(req, res) => {
    console.log("you are in register api")
    const {Username, Password, Email, CompanyName, BusinessAddress, 
           RepFirstName, RepLastName, Position} = req.body
    if(!Username || !Password || !Email){
        return res.status(442).json({error:"please add all the fields"})
    }
    //checks database for a user with this username
    User.findOne({Username:Username})
    .then(savedUser=>{
        //if a user by this username exists, error
        if(savedUser){
            return res.status(442).json({error:"Username Taken"})
        }
        //if it does not exist, hash the password
       bcrypt.hash(Password,12)
         .then(hashedPassword=>{
             const Users = new User({
                 Username,
                 Password:hashedPassword,
                 Email,
                 CompanyName,
                 BusinessAddress,
                 RepFirstName,
                 RepLastName,
                 Position,
                 temporarytoken: jwt.sign(Username, process.env.JWT_SECRET),
                 active: false
             })
             Users.save()
             .then(user=>{
                 console.log("saved successfully")
                 sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                 const hrefLink = "https://blkchn-trxn-verif.herokuapp.com/api/verify/" + Users.temporarytoken;
                 const msg = {
                     to: user.Email, // Change to your recipient
                     from: 'BlockChainUCFSD@gmail.com', // Change to your verified sender
                     subject: 'Thank you For Registering with BlockChain Transaction Verification',
                     text: `Hello ${Users.Username}, Click Here to Activate your Account.`,
                     //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here to Activate your Account or don't I am not your mom`,
                     html: `Hello<strong> ${Users.Username}</strong>,<br><br><a href=${hrefLink}> Click Here to Activate your Account.</a>`,
                 }
                 sgMail.send(msg)
                 .then(() => {
                     console.log('Email sent')
                 })
                 .catch((error) => {
                     console.error(error)
                 })
                 res.json({
                     //ID: user.id,
                     success: true,
                     msg: "User has been successfully added"
                 });
              })
             .catch(err=>{console.log(err)})
         }).catch(err=>{console.log(err)})
    })
})


//login function to login a user
//input - Username, Password
//output -
        // success - status: 200;  token, id: savedUser._id, name: savedUser.FirstName, email: savedUser.Email
        // failed - status: 442; error:"some message"

export const loginUser  = asyncHandler(async(req, res) => {
    console.log("login")
    const {Username,Password} = req.body
    if(!Username || !Password){
        console.log("something is missing")
        return res.status(442).json({error:"Please add both Email and Password"})
    }
    User.findOne({Username:Username})
    .then(savedUser=>{
        console.log(savedUser)
        if(!savedUser){
            console.log("username is scuffed")
            return res.status(442).json({error:"Please add both Email and Password"})
        }
        if(savedUser.active == false){
            console.log("user not verified")
            return res.status(442).json({error:"the user is not verified"})
        }
        console.log(Password + "  saved   " + savedUser.Password)
        bcrypt.compare(Password,savedUser.Password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({msg:"successfully signed in"})
                const token = jwt.sign(
                    {_id:savedUser._id},
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            id: savedUser._id,
                            name: savedUser.RepFirstName,
                            email: savedUser.Email
                        })
                    }
                )
            }
            else{
                console.log("pass is scuffed")
                return res.status(442).json({error:"Please add both Email and Password"})
            }
        }).catch(err=>{console.log(err)})
    })
})


// function to delete users
export const deleteUser  = asyncHandler(async(req, res) => {
    const id = req.params.id;
    if(!id){
        console.log("id is missing")
        return res.status(442).json({error:"ID is missing"})
    }
    User.deleteOne({_id: id}, function(err){
        if(err) console.log(err);
        res.json({
            //ID: user.id,
            success: true,
            msg: "User has been successfully deleted"
        });
    })
})


//function to verify users
//input - token
//output -
        // success - status: 200; success: true, msg: "User has been successfully activated"
        // failed - status: 442; error:"some message"

export const verifyUser  = asyncHandler(async(req, res) => {
    User.findOne({ temporarytoken: req.params.id }, (err, user) => {
        if (err) throw err; // Throw error if cannot login
        const token = req.params.id // Save the token from URL for verification
        console.log("the token is", token)
        // Function to verify the user's token
        // jwt.verify(token, JWT_SECRET, (err, decoded) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(442).json({ error: "Activation link has expired." }); // Token is expired
            } else if (!user) {
                return res.status(442).json({ error: "Activation link has expired." }); // Token may be valid but does not match any user in the database
            } else {
                user.temporarytoken = false; // Remove temporary token
                user.active = true; // Change account status to Activated
                // Mongoose Method to save user into the database
                user.save(err => {
                    if (err) {
                        console.log(err); // If unable to save user, log error info to console/terminal
                    } else {
                        // If save succeeds, create e-mail object
                        // sgMail.setApiKey(SENDGRID_KEY)
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                        console.log("creating email");
                        const msg = {
                            to: user.Email, // Change to your recipient
                            from: 'BlockChainUCFSD@gmail.com', // Change to your verified sender
                            subject: 'Verified',
                            text: `Hello ${user.Username}, Your account has been successfully activated!`,
                            //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here to Activate your Account or don't I am not your mom`,
                            html: `Hello<strong> ${user.Username}</strong>,<br><br>Your account has been successfully activated!`,
                        }
                        // Send e-mail object to user
                        console.log("sending email");
                        sgMail.send(msg)
                        .then(() => {
                            console.log('Email sent')
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                        res.json({
                            success: true,
                            msg: "User has been successfully activated"
                        })
                    }
                })
            }
        })
    })
})


//update user
//input - id and any other valid field for users
//output -
        // success - status: 200; success: true, msg: "User has been successfully edited"
        // failed - status: 442; error:"some message"

export const updateUser = asyncHandler(async(req, res) => {
    if(!req.body.id){
        return res.status(442).json({error:"ID is missing"})
    }
    const updates = await User.findById(req.body.id)
    console.log(updates)
    if(!updates){
        return res.status(442).json({error:"User not found"})
    }

    for(var fieldName in req.body){
        updates[fieldName] = req.body[fieldName]
    }
    if(req.body.Password){
        await bcrypt.hash(Password,12)
        .then(hashedPass =>{
            updates.Password = hashedPass
        })
    }

    updates.save()
    .then((result, err) => {
        if(err){
            return res.status(442).json({error: err})
        }else{
            return res.json({
                success: true,
                msg: "User has been successfully edited"
            })
        }
    })

})


//register function to register a user via mobile
//input - Username, Password, Email, CompanyName, BusinessAddress, RepFirstName, RepLastName, Position, isSellable
//output -
        // success - status: 200; success: true, msg: "User has been successfully activated"
        // failed - status: 442; error:"some message"

export const registerUserMobile = asyncHandler(async(req, res) => {
    console.log("you are in registerMobile api")
    const {Username, Password, Email, CompanyName, BusinessAddress, 
           RepFirstName, RepLastName, Position, isSeller} = req.body
    if(!Username || !Password || !Email){
        return res.status(442).json({error:"please add all the fields"})
    }
    //checks database for a user with this username
    User.findOne({Username:Username})
    .then(savedUser=>{
        //if a user by this username exists, error
        if(savedUser){
            return res.status(442).json({error:"Username Taken"})
        }
        //if it does not exist, hash the password
       bcrypt.hash(Password,12)
         .then(hashedPassword=>{
             const Users = new User({
                 Username,
                 Password:hashedPassword,
                 Email,
                 CompanyName,
                 BusinessAddress,
                 RepFirstName,
                 RepLastName,
                 Position,
                 temporarytoken: Math.floor(Math.random() * (1000000 - 100000) + 100000),
                 active: false,
                 isSeller
             })
             Users.save()
             .then(user=>{
                 console.log("saved successfully")
                 sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                 const msg = {
                     to: user.Email, // Change to your recipient
                     from: 'BlockChainUCFSD@gmail.com', // Change to your verified sender
                     subject: 'Thank you For Registering with BlockChain Transaction Verification',
                     text: `Hello ${Users.Username}, Here is your 6 digit code: ${Users.temporarytoken}`
                 }
                 sgMail.send(msg)
                 .then(() => {
                     console.log('Email sent')
                 })
                 .catch((error) => {
                     console.error(error)
                 })
                 res.json({
                     //ID: user.id,
                     success: true,
                     msg: "User has been successfully added"
                 });
              })
             .catch(err=>{console.log(err)})
         }).catch(err=>{console.log(err)})
    })
})


//function to verify users via mobile
//input - token
//output -
        // success - status: 200; success: true, msg: "User has been successfully activated"
        // failed - status: 442; error:"some message"

export const verifyUserMobile  = asyncHandler(async(req, res) => {
    User.findOne({ temporarytoken: req.body.token }, (err, user) => {
        if (err) throw err; // Throw error if cannot login
        const token = req.params.token // Save the token from URL for verification
        console.log("the token is", token)
        // Function to verify the user's token
        // jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (!user) {
            return res.status(442).json({ error: "Activation link has expired." }); // Token may be valid but does not match any user in the database
        } else {
            user.temporarytoken = false; // Remove temporary token
            user.active = true; // Change account status to Activated
            // Mongoose Method to save user into the database
            user.save(err => {
                if (err) {
                    console.log(err); // If unable to save user, log error info to console/terminal
                } else {
                    // If save succeeds, create e-mail object
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                    console.log("creating email");
                    const msg = {
                        to: user.Email, // Change to your recipient
                        from: 'BlockChainUCFSD@gmail.com', // Change to your verified sender
                        subject: 'Verified',
                        text: `Hello ${user.Username}, Your account has been successfully activated!`,
                        //html: `Hello<strong> ${Users.FirstName}</strong>,<br><br> Click Here to Activate your Account or don't I am not your mom`,
                        html: `Hello<strong> ${user.Username}</strong>,<br><br>Your account has been successfully activated!`,
                    }
                    // Send e-mail object to user
                    console.log("sending email");
                    sgMail.send(msg)
                    .then(() => {
                        console.log('Email sent')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    res.json({
                        success: true,
                        msg: "User has been successfully activated"
                    })
                }
            })
        }
    })
})



export const onGetAllUsers = asyncHandler (async(req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  })

  export const onGetUserById = asyncHandler (async(req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  })

//function to send password reset code to users email
//input - Email
//output -
        // success - status: 200; success: true, msg: "User has been successfully activated"
        // failed - status: 442; error:"some message"
export const passResetEmail  = asyncHandler(async(req, res) => {
    console.log("you are in passResetEmail api")
    const email = req.body.Email
    const updates = await User.findOne({Email: email})
    console.log(updates)
    if(!updates){
        return res.status(442).json({error:"User not found"})
    }
    updates.temporarytoken = Math.floor(Math.random() * (1000000 - 100000) + 100000)
    updates.save()
    .then((user, err)=>{
        if(err){
            return res.status(442).json({error: err})
        }else{
            console.log("saved successfully")
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const hrefLink = "https://localhost:5000/api/ResetPassword/" + user.temporarytoken;
            const msg = {
                to: user.Email, // Change to your recipient
                from: 'BlockChainUCFSD@gmail.com', // Change to your verified sender
                subject: 'BlockChain Transaction Verification Password Reset',
                text: `Hello ${user.Username}, Click Here to Reset your Password`,
                html: `Hello<strong> ${user.Username}</strong>,<br><br><a href=${hrefLink}> Click Here to Reset your Password.</a>`,
            }
            sgMail.send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
            res.json({
                //ID: user.id,
                success: true,
                msg: "User has been successfully added"
            });
        }
    })
})


//function to verify password reset code and set their new password
//input - password and param id(the id at the end of the url)
//output -
        // success - status: 200; success: true, msg: "password has been successfully reset"
        // failed - status: 442; error:"some message"
export const ResetPassword  = asyncHandler(async(req, res) => {
    if(!req.body.Password){
        return res.status(442).json({error:"please add all the fields"})
    }
    User.findOne({ temporarytoken: req.params.id }, async(err, user) => {
        if (err) throw err; // Throw error if cannot login
        if(!user) return res.status(442).json({error:"user not found"})
        const token = req.params.id // Save the token from URL for verification
        console.log("the token is", token)
        // Function to verify the user's token
        user.temporarytoken = false; // Remove temporary token
        await bcrypt.hash(req.body.Password,12)
        .then(hashedPass =>{
            user.Password = hashedPass
        })
        // Mongoose Method to save user into the database
        user.save(err => {
            if (err) {
                console.log(err); // If unable to save user, log error info to console/terminal
                return res.status(442).json({error:"user not found"})
            } else {
                // If save succeeds, create e-mail object
                // sgMail.setApiKey(SENDGRID_KEY)
                sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                console.log("creating email");
                const msg = {
                    to: user.Email, // Change to your recipient
                    from: 'BlockChainUCFSD@gmail.com', // Change to your verified sender
                    subject: 'Verified',
                    text: `Hello ${user.Username}, Your Password has been successfully Reset!`,
                }
                // Send e-mail object to user
                console.log("sending email");
                sgMail.send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
                res.json({
                    success: true,
                    msg: "password has been successfully reset"
                })
            }
        })
    })
    .catch((error) => {
        console.error(error)
        return res.status(442).json({error:"user not found"})
    })
})