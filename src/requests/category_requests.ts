import { Create_Category, deleteCategory, find_category_by_name, getCategoryById, get_all_categories_from_db, updateCategory } from "../database/modals/categories";
import crypto from "crypto";


export const create_category = async (req:any, resp:any) => {
    try {
      const { name, image, status } = req.body;
  
      if (!name) {
        return resp.status(422).send({ success: false, message: "Category name not entered" });
      }
  
      if (!image) {
        return resp.status(422).send({ success: false, message: "Category image not entered" });
      }
  
      if (!status) {
        return resp.status(422).send({ success: false, message: "Category status not entered" });
      }
  
      const existingCategory = await find_category_by_name(name);
  
      if (existingCategory) {
        return resp.status(409).send({ success: false, message: "Category already exists" });
      }
  
      const id = crypto.randomUUID();
      const newCategory = await Create_Category({id, name, image, status });
  
      resp.send({
        success: true,
        category: newCategory,
      });
    } catch (err:any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };
  
  export const get_all_categories = async (req: any, res: any) => {
    try {
      const categories = await get_all_categories_from_db();
      res.status(200).send({ success: true, categories });
    } catch (err: any) {
      res.status(500).send({ success: false, message: err.message });
    }
  };
  
  
  
  
  export const get_category_by_id = async (req:any, res:any) => {
    try {
      const { id } = req.params;
      const category = await getCategoryById(id);
  
      if (!category) {
        return res.status(404).send({ success: false, message: "Category not found" });
      }
  
      res.status(200).send({ success: true, category });
    } catch (err:any) {
      res.status(500).send({ success: false, message: err.message });
    }
  };
  
  
  export const update_category = async (req:any, res:any) => {
    try {
      const { id } = req.params;
      const { name, image, status } = req.body;
  
      if (!name || !image || !status) {
        return res.status(422).send({ success: false, message: "Please provide all required fields" });
      }
  
      const updatedCategory = await updateCategory(id, { name, image, status });
  
      if (!updatedCategory) {
        return res.status(404).send({ success: false, message: "Category not found" });
      }
  
      res.status(200).send({ success: true, category: updatedCategory });
    } catch (err:any) {
      res.status(500).send({ success: false, message: err.message });
    }
  };
  
  
  
  export const delete_category = async (req:any, res:any) => {
    try {
      const { id } = req.params;
      await deleteCategory(id); // Implement this function in your controller
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete category', error });
    }
  };
  
  
  