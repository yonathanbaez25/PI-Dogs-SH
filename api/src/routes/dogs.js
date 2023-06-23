const express = require("express");
const {
  getDogs,
  getDogsByID,
  getDogsByName,
} = require("../controllers/getDogs");
const postDog = require("../controllers/postDog");

const dogsRouter = express.Router();

dogsRouter.get("/", getDogs);
dogsRouter.get("/:id", getDogsByID);
dogsRouter.post("/", postDog);

module.exports = dogsRouter;
