import { Validate_Admin_Token } from "../functions/jwtAuths";

require("dotenv").config();

const OWNER_ACCESS_TOKEN = process.env.OWNER_ACCESS_TOKEN;

export const authticate_owner = async (req: any, resp: any, next: any) => {
    try {
      const x_api_key = req.headers["x-api-key"];
  
      console.log(x_api_key);
  
      if (!x_api_key)
        return resp
          .status(401)
          .send({ success: false, message: "x_api_key not entered" });
  
      if (!x_api_key.match(OWNER_ACCESS_TOKEN))
        return resp
          .status(401)
          .send({ success: false, message: "Invalid x_api_key" });
  
      next();
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };
  


  export const authticate_admin = async (req: any, resp: any, next: any) => {
    try {
      const token = req.headers['authorization'];
  
      if (!token)
        return resp
          .status(401)
          .send({ success: false, message: "token not entered" });
  
      if (!Validate_Admin_Token(token))
        return resp
          .status(401)
          .send({ success: false, message: "Invalid token!" });
  
      next();
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };