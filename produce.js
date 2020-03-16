"use strict";

const connect = require("./connect");
const log = require("./log");

const createDocument = () => {
  return {
    name: "foobar",
    ts: Date.now()
  };
};

let counter = 0;
let stop = true;
(async () => {
  try {
    const client = await connect();
    while (stop) {
      const doc = createDocument();
      counter++;
      const { insertedId } = await client.insertOne(doc);
      log("producer", { insertedId, timestamp: new Date().toISOString() });
    }
  } catch (err) {
    log("producer", err);
  }
})();

process.on("SIGINT", async () => {
  stop = false;
  //it should depend on config
  const { TIMEOUT = 5000 } = process.env;
  console.log(
    `Graceful shutdown...in order to flush the winston buffer ...please wait ${TIMEOUT} ms`
  );
  console.log({ counter });
  await new Promise(res => setTimeout(res, TIMEOUT));
  process.exit();
});
