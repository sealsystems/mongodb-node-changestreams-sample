const MongoClient = require('mongodb');
const url = require('./config.js').mongoDBUrl;
const now = Date.now();
let deviceName = "ecobee_1234";
let doc;
/*
if(now % 2 == 0) {
  deviceName = "nest_5678"
}
*/

while (true) {

  doc = {
    device: {
      name: randomString(50, 200),
      celsiusTemperature: 16,
      timeStamp: new Date()
    }
  };

  MongoClient.connect(url, async (err, client) => {
    const coll = client.db("demo").collection("devices");
    await coll.insert(doc).then(() => client.close());
    console.log('Document inserted');
  });

}

function randomString(minLength, maxLength) {
  var length = randomNumber(minLength, maxLength);
  var text = "";
  var possible = "ABC DEFG HIJKLM NOPQRSTUV WXYZabcde fghijk lmn opqrstuvw xyz0 123 4567 8 9";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}