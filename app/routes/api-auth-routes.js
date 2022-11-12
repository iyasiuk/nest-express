/** @format */
const express = require("express");
const router = express.Router();
const { getArtifact, checkManifest } = require('../controllers/api-auth-controller');


router.post("/api/manifests", checkManifest);
router.get("/api/artifacts/:id", getArtifact);


module.exports = router;
