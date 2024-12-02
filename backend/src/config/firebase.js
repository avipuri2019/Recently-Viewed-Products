const admin = require("firebase-admin");

const serviceAccount = require("../../serviceAccountKey.json"); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://liver-recently-viewed-products.firebaseio.com",
});

const db = admin.firestore();

module.exports = { admin, db };
