const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");

router.get("/test-firebase-simple", (req, res) => {
  try {
    res.json({ success: true, message: "¡Firebase conectado correctamente!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
