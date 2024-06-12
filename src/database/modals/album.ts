import mongoose from 'mongoose';
import crypto from 'crypto';

const COLLECTION = 'albums';

const ALBUM_SCHEMA = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID(), // Generate UUID
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
  },
  naatKhawan: {
    id: String,
    name: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Default value is the current date/time
  },
}, {
  collection: COLLECTION,
});

const Album = mongoose.model(COLLECTION, ALBUM_SCHEMA);

export const findAlbumByName = async (name: any) => {
  return await Album.findOne({ name });
};

export const createAlbum = async (albumData: any) => {
  // console.log(albumData);
  const album = new Album(albumData);
  return await album.save();
};

export const getAllAlbumsFromDB = async () => {
  return await Album.find({}).select("-_id");
};

export const getAlbumById = async (id: any) => {
  return await Album.findOne({ id }).select('-_id');
};

export const updateAlbum = async (id: any, updatedData: any) => {
  return await Album.findOneAndUpdate({ id }, updatedData, { new: true });
};

export const deleteAlbum = async (id: any) => {
  await Album.findOneAndDelete({ id });
};


