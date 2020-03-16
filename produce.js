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
      const { result } = await client.insertOne(doc);
      log(result);
    }
  } catch (err) {
    log(err);
  }
})();
