"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getAllAcronym,
  addAcronym,
  updateAcronymData,
  deleteAcronym,
} = require("./handlers");

const PORT = 5678;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/acronym", getAllAcronym)
  .post("/add-acronym", addAcronym)
  .patch("/acronym/:acronymID", updateAcronymData)
  .delete("/acronym/:acronymID", deleteAcronym)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
