import mongoose from "mongoose";

const COLLECTION = "categories";

const CATEGORY_SCHEMA = new mongoose.Schema({
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
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
  },
  createdAt: {
    type: Date,
    default: Date.now  // Default value is the current date/time
  }

}, {
  collection: COLLECTION,
});

const Category = mongoose.model(COLLECTION, CATEGORY_SCHEMA);

export const find_category_by_name = async (name:any) => {
  return await Category.findOne({ name });
};

export const Create_Category = async (categoryData:any) => {
  const category = new Category(categoryData);
  return await category.save();
};

export const get_all_categories_from_db = async () => {
  return await Category.find({}).select("-_id");
};

export const getCategoryById = async (id:any) => {
  return await Category.findOne({ id: id }).select("-_id");
};

export const updateCategory = async (id:any, updatedData:any) => {
  return await Category.findOneAndUpdate({ id }, updatedData, { new: true });
};

export const deleteCategory = async (id:any) => {
   await Category.findOneAndDelete({ id: id });
};