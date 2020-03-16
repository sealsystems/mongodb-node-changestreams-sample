"use strict";

const connect = require("./connect");
const log = require("./log");

(async () => {
  try {
    const client = await connect();
    client.watch().on("change", c =>
      log("listen", {
        insertedId: c.documentKey._id
      })
    );
    console.log("Listening...");
  } catch (err) {
    log("listen", err);
  }
})();
