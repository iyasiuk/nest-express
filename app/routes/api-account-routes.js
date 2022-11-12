/** @format */
const express = require("express");
const router = express.Router();
const axios = require("axios");
const spa = require("../../config/spa");
const { ping, getConfig } = require('../controllers/api-account-controller');


router.get("/api/ping", ping);
router.get("/api/config", getConfig);


module.exports = router;
