import { find_admin_by_email } from "../database/modals/admin";
import { Create_Category, find_category_by_name, get_all_categories_from_db } from "../database/modals/categories";
import { verify_admin_password } from "../encryptions/password_encrypt";
import { Create_Admin_Token } from "../functions/jwtAuths";
import crypto from "crypto";

export const admin_login = async (req: any, resp: any) => {
    try {
      const { email, password } = req.body;
      const upcEmail = email.replace(/^./, email[0].toUpperCase());
  
      if (!email)
        return resp
          .status(422)
          .send({ success: false, message: "Email not entered" });
  
      if (!password)
        return resp
          .status(422)
          .send({ success: false, message: "Password not entered" });
  
      const user = await find_admin_by_email(upcEmail);
  
      if (!user)
        return resp
          .status(401)
          .send({ success: false, message: "Email is Incorrect!" });
  
      if (!verify_admin_password(password, user.password))
        return resp
          .status(401)
          .send({ success: false, message: "Incorrect Password!" });
  
      const token = Create_Admin_Token({ email });
  
      resp.send({
        success: true,
        email: upcEmail,
        token: token,
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };









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

    const id = await crypto.randomUUID();
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