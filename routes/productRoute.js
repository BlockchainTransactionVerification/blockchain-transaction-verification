import { addProduct, getItems } from "../controllers/productController.js";
import express from "express";
import jwt from "jsonwebtoken";
import Supply from "../models/productModel.js";
const productRouter = express.Router();
import auth from "../auth/auth.js";

// express router method to create route for uploading information on an item to be sold
productRouter.route("/addProduct").post(auth, addProduct);

// express router method to create route for logging in users
productRouter.route("/getItem").get(getItems);

// express router method to create route for deleting users
//productRouter.route('/delete/:id').delete(deleteUser)

export default productRouter;
