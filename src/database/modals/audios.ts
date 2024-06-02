import mongoose from 'mongoose';
import crypto from 'crypto';

const COLLECTION = 'audios';

const AUDIO_SCHEMA = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID(), // Generate UUID
  },
  title: {
    type: String,
    required: true,
  },
  categories: [{
    type: String,
  }],
  albums: [{
    type: String,
  }],
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
  },
  naatKhawans: [{
    type: String,
  }],
  audioFile: {
    type: String,
    required: true,
  },
  imageFile: {
    type: String,
    required: true,
  },
  lyrics: {
    type: String,
  },
  audioDetails: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value is the current date/time
  },
}, {
  collection: COLLECTION,
});

const Audio = mongoose.model(COLLECTION, AUDIO_SCHEMA);

export const findAudioByName = async (name: any) => {
  return await Audio.findOne({ title: name });
};

export const createAudio = async (audioData: any) => {
  const audio = new Audio(audioData);
  return await audio.save();
};

export const getAllAudiosFromDB = async () => {
  return await Audio.find({}).select("-_id");
};

export const deleteAudio = async (id: any) => {
  try {
    const deletedAudio = await Audio.findOneAndDelete({ id: id });
    return deletedAudio; // Return the deleted audio
  } catch (error) {
    console.error("Error deleting audio:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};