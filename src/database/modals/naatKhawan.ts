import mongoose from "mongoose";
// Define the schema/model for Naat Khawans
const NAAT_KHAWAN_COLLECTION = "naatKhawans";

const NAAT_KHAWAN_SCHEMA = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID() // Generate UUID
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: NAAT_KHAWAN_COLLECTION,
});

const NaatKhawan = mongoose.model(NAAT_KHAWAN_COLLECTION, NAAT_KHAWAN_SCHEMA);

export const find_naat_khawan_by_name = async (name: any) => {
  return await NaatKhawan.findOne({ name });
};

export const Create_Naat_Khawan = async (naatKhawanData: any) => {
  const naatKhawan = new NaatKhawan(naatKhawanData);
  return await naatKhawan.save();
};


export const get_all_naat_khawans_from_db = async () => {
  return await NaatKhawan.find({}).select("-_id");
};

export const deleteNaatKhawan = async (id:any) => {
  await NaatKhawan.findOneAndDelete({ id: id });
};