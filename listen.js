"use strict";

const connect = require("./connect");
const log = require("./log");

(async () => {
  try {
    const client = await connect();
    client.watch().on("change", c => log(c));
    log('Listening...');
  } catch (err) {
    log(err);
  }
})();
