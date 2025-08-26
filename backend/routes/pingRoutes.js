const express = require('express');
const router = express.Router();
const { getPing } = require('../controllers/pingController');

//GETs
router.get('/', getPing);

module.exports = router;