const express = require("express");
const {
  getDogs,
  getDogsByID,
  getDogsByName,
} = require("../controllers/getDogs");

const dogsRouter = express.Router();

dogsRouter.get("/", getDogs);
dogsRouter.get("/:id", getDogsByID);
dogsRouter.post("/");

module.exports = dogsRouter;
