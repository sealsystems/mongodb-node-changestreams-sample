"use strict";

const MongoClient = require("mongodb");
const config = require('./config');

const connect = () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(config.url, (err, client) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(client.db().collection(config.collection));
    });
  });

module.exports = connect;
