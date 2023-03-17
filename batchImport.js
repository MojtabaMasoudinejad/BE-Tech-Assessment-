const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const acronym = require("./data");
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let acronymList = [];

acronym.map((item) => {
  let tempAcronym = {
    _id: uuidv4(),
    ...item,
  };
  acronymList.push(tempAcronym);
});

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Project");
    await db.collection("Backend").insertMany(acronymList);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
    console.log("disconnected!");
  }
};

batchImport();
