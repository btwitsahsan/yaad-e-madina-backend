import { createAlbum, deleteAlbum, findAlbumByName, getAlbumById, getAllAlbumsFromDB, updateAlbum } from "../database/modals/album";
import mongoose from 'mongoose';
import crypto from "crypto";



export const create_album = async (req: any, resp: any) => {
  try {
    console.log(req.body);
    const { name, image, status, naatKhawans } = req.body;

    if (!name) {
      resp.status(422).send({ success: false, message: "Album name not entered" });
      return;
    }

    if (!image) {
      resp.status(422).send({ success: false, message: "Album image not entered" });
      return;
    }

    if (!status) {
      resp.status(422).send({ success: false, message: "Album status not entered" });
      return;
    }

    // Check if album already exists
    const existingAlbum = await findAlbumByName(name);
    if (existingAlbum) {
      resp.status(409).send({ success: false, message: "Album already exists" });
      return;
    }

    // Create new album
    const id = crypto.randomUUID();
    const newAlbum = await createAlbum({
      id,
      name,
      image,
      status,
      naatKhawans,
    });

    resp.send({
      success: true,
      album: newAlbum,
    });
  } catch (err: any) {
    resp.status(400).send({ success: false, message: err.message });
  }
};
  
  
  export const get_all_album = async (req: any, resp: any) => {
    try {
      const albums = await getAllAlbumsFromDB();
      resp.send({
        success: true,
        albums: albums,
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };
  
  

  export const get_album_by_id = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const album = await getAlbumById(id);
  
      if (!album) {
        return res.status(404).send({ success: false, message: "Album not found" });
      }
  
      res.status(200).send({ success: true, album });
    } catch (err: any) {
      res.status(500).send({ success: false, message: err.message });
    }
  };
  
  
  


  export const update_album = async (req: any, resp: any) => {
    try {
      const { id } = req.params;
      const { name, image, status, naatKhawans } = req.body;
  
      if (!name && !image && !status && !naatKhawans) {
        return resp.status(422).send({ success: false, message: "No update data provided" });
      }
  
      const album = await getAlbumById(id);
  
      if (!album) {
        return resp.status(404).send({ success: false, message: "Album not found" });
      }
  
      const updatedData: any = {};
      if (name) updatedData.name = name;
      if (image) updatedData.image = image;
      if (status) updatedData.status = status;
      if (naatKhawans) updatedData.naatKhawans = naatKhawans
  
      const updatedAlbum = await updateAlbum(id, updatedData);
  
      resp.send({
        success: true,
        album: updatedAlbum,
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };




  export const delete_album = async (req: any, resp: any) => {
    try {
      const { id } = req.params;
  
      const album = await getAlbumById(id);
  
      if (!album) {
        return resp.status(404).send({ success: false, message: "Album not found" });
      }
  
      await deleteAlbum(id);
  
      resp.send({
        success: true,
        message: "Album deleted successfully",
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };