var admin = require("firebase-admin");

var serviceAccount = require("./firebaseAdminSDK.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin; // Path: utils/firebase/firebase.js
// Compare this snippet from socket/socketHandler.js:   
