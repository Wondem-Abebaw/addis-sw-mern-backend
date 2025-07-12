// services/statisticsService.js
const Song = require("../models/Song");

const getTotalCounts = async () => {
  const [totalSongs, artists, albums, genres] = await Promise.all([
    Song.countDocuments(),
    Song.distinct("artist"),
    Song.distinct("album"),
    Song.distinct("genre"),
  ]);

  return {
    totalSongs,
    totalArtists: artists.length,
    totalAlbums: albums.length,
    totalGenres: genres.length,
  };
};

const getSongsPerGenre = async () => {
  return Song.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
};

const getArtistStats = async () => {
  return Song.aggregate([
    {
      $group: {
        _id: "$artist",
        songs: { $sum: 1 },
        albums: { $addToSet: "$album" },
      },
    },
    {
      $project: {
        artist: "$_id",
        songs: 1,
        albums: { $size: "$albums" },
      },
    },
    { $sort: { songs: -1 } },
  ]);
};

const getAlbumStats = async () => {
  return Song.aggregate([
    {
      $group: {
        _id: { album: "$album" },
        songs: { $sum: 1 },
        artist: { $first: "$artist" },
      },
    },
    {
      $project: {
        _id: 0,
        artist: 1,
        album: "$_id.album",
        songs: 1,
      },
    },
    { $sort: { songs: -1 } },
  ]);
};

module.exports = {
  getTotalCounts,
  getSongsPerGenre,
  getArtistStats,
  getAlbumStats,
};
