import express from "express";
import { uploadFiles } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

// Upload file(s)
uploadRouter.route("/files").post(uploadFiles);

export default uploadRouter;
