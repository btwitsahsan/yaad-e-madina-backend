import mongoose from "mongoose";

const COLLECTION = "admins";

let ADMIN_SCHEMA = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION,
  }
);

export const ADMIN_MODAL = mongoose.model(COLLECTION, ADMIN_SCHEMA);




export const find_admin_by_email = async (email: string) => {
    const user = await ADMIN_MODAL.findOne({ email });
    return user;
  };

export const create_admin_object = async (values: Record<string, any>) =>
    await new ADMIN_MODAL(values).save().then((admin) => admin.toObject());