import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import fleekStorage from "@fleekhq/fleek-storage-js";
import multiparty from "multiparty";

const apiKey = process.env.FLEEK_API_KEY;
const apiSecret = process.env.FLEEK_API_SECRET;

export const uploadFiles = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  // const { name, lastModified, size, type } = req.body;

  console.log("Inside upload controller");

  let form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    console.log(files);
    console.log(files);

    Object.keys(files).forEach(function (name) {
      console.log("Got file named " + name);
      console.log("The file name is " + files[name][0].originalFilename);
      const filePath = files[name][0].path;

      fs.readFile(filePath, async (err, data) => {
        if (!err) {
          testFunctionUpload(data);
        }
      });
    });
  });

  const testFunctionUpload = async (data) => {
    const date = new Date();
    const timestamp = date.getTime();

    const input = {
      apiKey,
      apiSecret,
      key: `file-${timestamp}`,
      data,
    };

    try {
      const result = await fleekStorage.upload(input);
      return res.json(result);
    } catch (e) {
      console.log("error", e);
    }
  };
});
