import {
  registerUser,
  loginUser,
  deleteUser,
  verifyUser,
  updateUser,
  registerUserMobile,
  verifyUserMobile,
  passResetEmail,
  ResetPassword,
} from "../controllers/userController.js";
import express from "express";
import User from "../models/usersModel.js";
const router = express.Router();

// express router method to create route for registering users
router.route("/register").post(registerUser);

// express router method to create route for logging in users
router.route("/login").post(loginUser);

// express router method to create route for deleting users
router.route("/delete/:id").delete(deleteUser);

// router method to create route for verifying email
router.route("/verify/:id").put(verifyUser);

// router method to create route for updating user information
router.route("/update").put(updateUser);

// router method to create route for updating user information
router.route("/registerMobile").post(registerUserMobile);

// router method to create route for updating user information
router.route("/verifyMobile").put(verifyUserMobile);

// router method to create route for updating user information
router.route("/passResetEmail").post(passResetEmail);

// router method to create route for updating user information
router.route("/ResetPassword/:id").put(ResetPassword);

export default router;
