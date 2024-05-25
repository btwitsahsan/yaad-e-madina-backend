import { find_admin_by_email } from "../database/modals/admin";
import { verify_admin_password } from "../encryptions/password_encrypt";
import { Create_Admin_Token } from "../functions/jwtAuths";

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