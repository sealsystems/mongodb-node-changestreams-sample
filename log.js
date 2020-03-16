var winston = require("winston");
var Elasticsearch = require("winston-elasticsearch");

var esTransportOpts = {
  level: "info",
  index: process.env.ES_INDEX || "winston",
  clientOpts: {
    node: process.env.ES_NODE || "http://localhost:9200"
  }
};
var logger = winston.createLogger({
  transports: [new Elasticsearch(esTransportOpts)]
});

const log = (origin, obj) => {
  logger.info(origin, obj);
};

module.exports = log;
