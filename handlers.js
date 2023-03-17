"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const FuzzySearch = require("fuzzy-search");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns an array of limited Acronyms
const getAllAcronym = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const query = req.query;

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const searchQuery = req.query.search;

  let startIndex = (page - 1) * limit;
  let endIndex = page * limit;

  let limitedAcronym = [];
  try {
    await client.connect();
    const db = client.db("Project");

    const acronymData = await db.collection("Backend").find().toArray();

    if (acronymData) {
      const searcher = new FuzzySearch(acronymData, ["acronym", "definition"]);
      const searchedAcronym = searcher.search(searchQuery);

      if (endIndex > searchedAcronym.length) {
        limitedAcronym = searchedAcronym.slice(
          startIndex,
          searchedAcronym.length
        );
      } else {
        limitedAcronym = searchedAcronym.slice(startIndex, endIndex);
      }

      res.status(200).json({
        status: 200,
        data: limitedAcronym,
        message: "It Returns The limited Acronym",
      });
    } else {
      res
        .status(400)
        .json({ status: 400, data: null, message: "The Acronym Is Not Found" });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// creates a new Acronym
const addAcronym = async (req, res) => {
  const { acronym, definition } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Project");

    const newAcronym = await db.collection("Backend").insertOne({
      _id: uuidv4(),
      acronym: acronym,
      definition: definition,
    });

    if (newAcronym) {
      res.status(200).json({
        status: 200,
        data: newAcronym,
        message: "The New Acronym Is Created Successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        data: null,
        message: "The New Acronym Craetion Is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// updates a specified Acronym

const updateAcronymData = async (req, res) => {
  const { updatedAcronym, updatedDefinition } = req.body;
  const { acronymID } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  let updateAcronymData = {};

  try {
    await client.connect();
    const db = client.db("Project");

    if (updatedAcronym && !updatedDefinition) {
      updateAcronymData = await db.collection("Backend").updateOne(
        { _id: acronymID },
        {
          $set: {
            acronym: updatedAcronym,
          },
        }
      );
    } else if (!updatedAcronym && updatedDefinition) {
      updateAcronymData = await db.collection("Backend").updateOne(
        { _id: acronymID },
        {
          $set: {
            definition: updatedDefinition,
          },
        }
      );
    } else if (updatedAcronym && updatedDefinition) {
      updateAcronymData = await db.collection("Backend").updateOne(
        { _id: acronymID },
        {
          $set: {
            acronym: updatedAcronym,
            definition: updatedDefinition,
          },
        }
      );
    }

    if (updateAcronymData.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The Acronym Is Updatad Successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        data: null,
        message: "The Acronym Update Is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

// delete a specific Acronym
const deleteAcronym = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { acronymID } = req.params;

  try {
    await client.connect();
    const db = client.db("Project");

    const deleteAcronym = await db
      .collection("Backend")
      .deleteOne({ _id: acronymID });

    if (deleteAcronym.acknowledged) {
      res.status(200).json({
        status: 200,
        message: "The Acronym Is Deleted Successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        data: null,
        message: "The Operation Is Not Completed",
      });
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
};

module.exports = {
  getAllAcronym,
  addAcronym,
  updateAcronymData,
  deleteAcronym,
};
