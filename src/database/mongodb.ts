require("dotenv").config();

import mongoose from "mongoose";

const USER = process.env.MONGO_DB_USER_NAME;
const PASSWORD = process.env.MONGO_DB_PASSWORD;

const CONN_STRING = `mongodb+srv://${USER}:${PASSWORD}@cluster0.ekur4.mongodb.net/Yaad-E-Madina`;

export const Connect_DB = async () => {
  try {
    await mongoose.connect(CONN_STRING);
    console.log(`DB CONNECTED!!`);
  } catch (err: any) {
    console.log(err.message);
  }
};
