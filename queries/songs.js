const db = require("../db/dbConfig");

// ALL SONGS
const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    return error;
  }
};

// ONE SONG
const getSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};

// await db.one("SELECT * FROM songs WHERE id=$[id]", {
//   id: id,
// });

// CREATE
const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name,  artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

// DELETE
const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateSongs = async (id, song) => {
  try {
    const updatedSongs = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3 time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite, id]
    );
    return updatedSongs;
  } catch (error) {
    return error;
  }
};

// // Artist Songs
// const getSongArtist = async (id) => {
//   try {
//     const artistsSong = await db.any(
//       "SELECT * FROM songs WHERE songs.artist_id=$1",
//       id
//     );
//     return artistsSong;
//   } catch (error) {
//     return error;
//   }
// };

//EXPORT
module.exports = {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSongs,
};
