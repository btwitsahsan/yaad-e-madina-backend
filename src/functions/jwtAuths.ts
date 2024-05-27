require("dotenv").config();
import jwt from "jsonwebtoken";


const ADMIN_SECRET: any = process.env.ACCESS_ADMIN_TOKEN_SECRET;
// const USER_SECRET: any = process.env.ACCESS_USER_TOKEN_SECRET;

export const Validate_Admin_Token = (token: string) => {
  try {
    jwt.verify(token, ADMIN_SECRET);
    return true;
  } catch (err: any) {
    return null;
  }
};

export const Create_Admin_Token = (user: any) => {
    const Token = jwt.sign(user, ADMIN_SECRET);
    return Token;
  };