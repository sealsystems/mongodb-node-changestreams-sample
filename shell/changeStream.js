const config = require('./config'); 

conn = new Mongo(config.mongoDBUrl);
db = conn.getDB("demo");
collection = db.stock;

const insertOps = {
  $match: { operationType: "insert" }
};

let updateOps = {
  $match: {
    $and: [
      { "updateDescription.updatedFields.quantity": { $lte: 10 } },
      { operationType: "update" }
    ]
  }
};

//The $match stage below references the "fullDocument" node, which requires specifying fullDocument:'updateLookup' for update operations (which don't include the fullDocument node by default)
/*
const changeStream = collection.watch(
  [{
    $match: {
      $and: [
        { "fullDocument.quantity": { $lte: 10 } },
        { operationType: "update" }
      ]
    }
  }],
  {
    fullDocument: 'updateLookup'
  }
);
*/


//Include the option below if you want 'update' operations to include the 'fullDocument' node in the change stream
let updateOptions = {
  fullDocument: "updateLookup"
};

const changeStreamCursor = collection.watch([
  csFilter === 0 ? insertOps : updateOps
]);

//pollStream(changeStreamCursor);
resumeStream(changeStreamCursor, true);

//this function polls a change stream and prints out each change as it comes in
function pollStream(cursor) {
  while (!cursor.isExhausted()) {
    if (cursor.hasNext()) {
      change = cursor.next();
      print(JSON.stringify(change));
    }
  }
  pollStream(cursor);
}

//this function is similar to the pollStream above. The only difference is that it prints out the first change right away, then simulates an app crash (for 10 seconds) and finally resumes processing the remaining changes by picking the change stream where it was left off (by using the resumeAfter option of the watch method)
function resumeStream(cursor, forceResume = false) {
  let resumeToken;
  while (!cursor.isExhausted()) {
    if (cursor.hasNext()) {
      change = cursor.next();
      print(JSON.stringify(change));
      resumeToken = change._id;
      if (forceResume === true) {
        print("\r\nSimulating app failure for 10 seconds...");
        sleepFor(10000);
        cursor.close();
        const newChangeStreamCursor = collection.watch(
          [csFilter === 0 ? insertOps : updateOps],
          {
            resumeAfter: resumeToken
          }
        );
        print(
          "\r\nResuming change stream with token " +
            JSON.stringify(resumeToken) +
            "\r\n"
        );
        resumeStream(newChangeStreamCursor);
      }
    }
  }
  resumeStream(cursor, forceResume);
}

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
