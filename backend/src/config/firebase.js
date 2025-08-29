const admin = require("firebase-admin");
const path = require("path");

// Ruta absoluta al archivo de clave privada
const serviceAccount = require(path.resolve(__dirname, "chamba-app-6dcc4-firebase-adminsdk-fbsvc-72c577a9ad.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
