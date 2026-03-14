const express = require("express");
const router = express.Router();
const generationController = require("../controllers/generation.controller");


router.get("/", generationController.getGenerationData);

module.exports = router;