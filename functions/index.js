
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// Keeps track of the length of the 'likes' child list in a separate property.
exports.taskCountChange = functions.database.ref('/users/{uId}/schedules/{sId}/tasks/{tId}').onWrite((event) => {
  const scheduleRef = event.data.ref.parent;
  const countRef = scheduleRef.parent.child('taskCount');

  let increment;
  if (event.data.exists() && !event.data.previous.exists()) {
    increment = 1;
  } else {
    return null;
  }

  // Return the promise from countRef.transaction() so our function
  // waits for this async event to complete before it exits.
  return countRef.transaction((current) => {
    return (current || 0) + increment;
  }).then(() => {
    return console.log('Counter updated.');
  });
});
