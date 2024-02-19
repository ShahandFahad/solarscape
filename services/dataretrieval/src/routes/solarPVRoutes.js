const express = require("express");
const router = express.Router();

// Get controller
const solarPVController = require("../controllers/solarPVController");

// Setup a special route for posting data to assessment model
router.post("/pv-assessment", solarPVController.postSolarPV);

module.exports = router;
