import mongoose from 'mongoose';
import crypto from 'crypto';

const COLLECTION = 'playlists';

const PLAYLIST_SCHEMA = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID(),
  },
  title: {
    type: String,
    required: true,
  },
  audios: [{
    id: String,
    title: String,
  }],
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: COLLECTION,
});

const Playlist = mongoose.model(COLLECTION, PLAYLIST_SCHEMA);

export const findPlaylistByName = async (name:any) => {
  return await Playlist.findOne({ title: name });
};

export const createPlaylist = async (playlistData:any) => {
    console.log(playlistData);
  const playlist = new Playlist(playlistData);
  return await playlist.save();
};

export const getAllPlaylistsFromDB = async () => {
  return await Playlist.find({}).select("-_id");
};

export const getPlaylistById = async (id:any) => {
  return await Playlist.findOne({ id }).select('-_id');
};

export const updatePlaylist = async (id:any, updatedData:any) => {
  return await Playlist.findOneAndUpdate({ id }, updatedData, { new: true });
};

export const deletePlaylist = async (id:any) => {
  try {
    const deletedPlaylist = await Playlist.findOneAndDelete({ id });
    return deletedPlaylist;
  } catch (error:any) {
    console.error("Error deleting playlist:", error);
    throw error;
  }
};
