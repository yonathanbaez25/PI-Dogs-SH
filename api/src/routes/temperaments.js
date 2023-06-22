const express = require("express");

const temperamentsRouter = express.Router();

temperamentsRouter.get("/");

module.exports = temperamentsRouter;
