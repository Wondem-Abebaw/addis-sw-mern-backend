// controllers/statistics.js
const statisticsService = require("../services/statisticsService");
const AppError = require("../utils/appError");

exports.getTotalCounts = async (req, res, next) => {
  try {
    const counts = await statisticsService.getTotalCounts();
    res.json(counts);
  } catch (error) {
    next(new AppError("Failed to fetch total counts", 500));
  }
};

exports.getSongsPerGenre = async (req, res, next) => {
  try {
    const genreStats = await statisticsService.getSongsPerGenre();
    res.json(genreStats);
  } catch (error) {
    next(new AppError("Failed to fetch genre statistics", 500));
  }
};

exports.getArtistStats = async (req, res, next) => {
  try {
    const artistStats = await statisticsService.getArtistStats();
    res.json(artistStats);
  } catch (error) {
    next(new AppError("Failed to fetch artist statistics", 500));
  }
};

exports.getAlbumStats = async (req, res, next) => {
  try {
    const albumStats = await statisticsService.getAlbumStats();
    res.json(albumStats);
  } catch (error) {
    next(new AppError("Failed to fetch album statistics", 500));
  }
};
