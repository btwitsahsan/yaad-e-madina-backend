
import { Create_Naat_Khawan, deleteNaatKhawan, find_naat_khawan_by_name, getNaatKhawanById, get_all_naat_khawans_from_db, updateNaatKhawan } from "../database/modals/naatKhawan";
import crypto from "crypto";



export const create_naat_khawan = async (req: any, resp: any) => {
    try {
      const { name, image } = req.body;
  
      if (!name) {
        return resp.status(422).send({ success: false, message: "Naat Khawan name not entered" });
      }
  
      if (!image) {
        return resp.status(422).send({ success: false, message: "Naat Khawan image not entered" });
      }
  
      const existingNaatKhawan = await find_naat_khawan_by_name(name);
  
      if (existingNaatKhawan) {
        return resp.status(409).send({ success: false, message: "Naat Khawan already exists" });
      }
  
      const id = crypto.randomUUID();
      const newNaatKhawan = await Create_Naat_Khawan({ id, name, image });
  
      resp.send({
        success: true,
        naatKhawan: newNaatKhawan,
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };
  
  
  
  export const get_all_naat_khawans = async (req: any, res: any) => {
    try {
      const naatKhawans = await get_all_naat_khawans_from_db();
      res.status(200).send({ success: true, naatKhawans });
    } catch (err: any) {
      res.status(500).send({ success: false, message: err.message });
    }
  };
  
  
  export const get_naat_khawan_by_id = async (req:any, res:any) => {
    try {
      const { id } = req.params;
      const naatKhawan = await getNaatKhawanById(id);
  
      if (!naatKhawan) {
        return res.status(404).send({ success: false, message: "Naat Khawan not found" });
      }
  
      res.status(200).send({ success: true, naatKhawan });
    } catch (err:any) {
      res.status(500).send({ success: false, message: err.message });
    }
  };
  
  export const update_naat_khawan = async (req:any, res:any) => {
    try {
      const { id } = req.params;
      const { name, image } = req.body;
  
      if (!name || !image) {
        return res.status(422).send({ success: false, message: "Please provide all required fields" });
      }
  
      const updatedNaatKhawan = await updateNaatKhawan(id, { name, image });
  
      if (!updatedNaatKhawan) {
        return res.status(404).send({ success: false, message: "Naat Khawan not found" });
      }
  
      res.status(200).send({ success: true, naatKhawan: updatedNaatKhawan });
    } catch (err:any) {
      res.status(500).send({ success: false, message: err.message });
    }
  };
  
  
  export const delete_naat_khawan = async (req:any, res:any) => {
    try {
      const { id } = req.params;
      await deleteNaatKhawan(id); // Implement this function in your controller
      res.status(200).json({ message: 'Naat Khawan deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete Naat Khawan', error });
    }
  };
  
  
  
  