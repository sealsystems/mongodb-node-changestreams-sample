"use strict";

const connect = require("./connect");
const log = require("./log");

const createDocument = () => {
  return {
    name: "foobar"
  };
};

(async () => {
  try {
    const client = await connect();
    while (true) {
      const doc = createDocument();
      const { insertedId } = await client.insertOne(doc);

      log("producer", { insertedId, timestamp: Date.now() });
    }
  } catch (err) {
    log("producer", err);
  }
})();
