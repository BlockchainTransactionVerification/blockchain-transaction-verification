import { register, login } from "../controllers/userController.js";
import express from 'express'
const User = require('../models/user')
const router = express.Router()



// express router method to create route for registering users
router.route('/register').get(registerUser)

// express router method to create route for logging in users
router.route('/login').get(loginUser)

// express router method to create route for deleting users
router.route('/delete/:id').get(deleteUser)

export default router
