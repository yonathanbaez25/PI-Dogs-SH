const express = require("express");
const postUser = require("../controllers/postUser");
const getUser = require("../controllers/getLogin");

const loginRouter = express.Router();

loginRouter.get("/", getUser);
loginRouter.post("/", postUser);

module.exports = loginRouter;
