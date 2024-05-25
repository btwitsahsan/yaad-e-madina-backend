import { create_admin_object, find_admin_by_email } from "../database/modals/admin";
import { encrpt_admin_password } from "../encryptions/password_encrypt";

export const create_admin = async (req: any, resp: any) => {
    try {
      const { name, email, password } = req.body;
  
      const upcEmail = email.replace(/^./, email[0].toUpperCase());
  
      if (!name)
        return resp
          .status(422)
          .send({ success: false, message: "Name not entered" });
  
      if (!email)
        return resp
          .status(422)
          .send({ success: false, message: "Email not entered" });
  
      if (!password)
        return resp
          .status(422)
          .send({ success: false, message: "Password not entered" });
  
      if (await find_admin_by_email(upcEmail))
        return resp
          .status(409)
          .send({ success: false, message: "Admin already created!" });
  
      const hashPass = await encrpt_admin_password(password);
  
      await create_admin_object({
        name,
        email: upcEmail,
        password: hashPass,
      });
  
      resp.status(200).send({
        success: true,
        message: "Admin created successfully",
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };