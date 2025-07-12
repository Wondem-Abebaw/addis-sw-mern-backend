// routes/statistics.js
const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statistics");

// Separate endpoints for each statistic
router.get("/total-counts", statisticsController.getTotalCounts);
router.get("/songs-per-genre", statisticsController.getSongsPerGenre);
router.get("/artist-stats", statisticsController.getArtistStats);
router.get("/album-stats", statisticsController.getAlbumStats);

module.exports = router;
