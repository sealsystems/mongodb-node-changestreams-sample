"use strict";

const connect = require("./connect");
const log = require("./log");

let counter = 0;
(async () => {
  try {
    const client = await connect();
    client.watch().on("change", event => {
      console.log(event.operationType)
      counter++;
      log("listen", {
        insertedId: event.documentKey._id,
        timestamp: new Date().toISOString(),
        diff: Date.now() - event.fullDocument.ts
      });
      console.log(counter);
    });
    console.log("Listening...");
  } catch (err) {
    log("listen", err);
  }
})();
