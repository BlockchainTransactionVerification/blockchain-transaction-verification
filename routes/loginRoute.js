const express = require("express");
const routerChat = express.Router();

routerChat.route("/").post((req, res, next) => {
  username = localStorage.setItem("user", req.body.username);
});

module.exports = routerChat;
