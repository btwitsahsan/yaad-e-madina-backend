import crypto from "crypto";
import { createAlbum, deleteAlbum, findAlbumByName, getAlbumById, getAllAlbumsFromDB, updateAlbum } from "../database/modals/album";


export const create_album = async (req: any, resp: any) => {
  try {
    const { name, image, status, naatKhawan } = req.body;
    if (!name || !image || !status || !naatKhawan) {
      resp.status(422).send({ success: false, message: "Required fields are missing" });
      return;
    }

    // Check if album already exists
    const existingAlbum = await findAlbumByName(name);
    if (existingAlbum) {
      resp.status(409).send({ success: false, message: "Album already exists" });
      return;
    }

    // Extracting ID and name from naatKhawan object
    const naatKhawanData = { id: naatKhawan.value, name: naatKhawan.label };
    

    // Create new album
    const id = crypto.randomUUID();
    const newAlbum = await createAlbum({
      id,
      name,
      image,
      status,
      naatKhawan: naatKhawanData,
    });

    resp.send({
      success: true,
      album: newAlbum,
    });
  } catch (err: any) {
    resp.status(400).send({ success: false, message: err.message });
  }
};
  



  
export const get_all_albums = async (req: any, resp: any) => {
  try {

    const albums = await getAllAlbumsFromDB();

    resp.send({
      success: true,
      albums,
    });
  } catch (err: any) {
    resp.status(400).send({ success: false, message: err.message });
  }
};

  
  
  export const get_album_by_id = async (req: any, resp: any) => {
    try {
      const { id } = req.params;
  
      // Check if album exists
      const album = await getAlbumById(id);
      if (!album) {
        resp.status(404).send({ success: false, message: "Album not found" });
        return;
      }
  
      resp.send({
        success: true,
        album,
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };
  
  
  
  


  export const update_album = async (req: any, resp: any) => {
    try {
      const { id } = req.params;
      const { name, image, status, naatKhawan } = req.body;
  
      if (!id || !name || !image || !status || !naatKhawan) {
        resp.status(422).send({ success: false, message: "Required fields are missing" });
        return;
      }
  
      // Check if album exists
      const existingAlbum = await getAlbumById(id);
      if (!existingAlbum) {
        resp.status(404).send({ success: false, message: "Album not found" });
        return;
      }
  
      // Extracting ID and name from naatKhawan object
      const naatKhawanData = { id: naatKhawan.value, name: naatKhawan.label };
  
      // Update album
      const updatedAlbum = await updateAlbum(id, {
        name,
        image,
        status,
        naatKhawan: naatKhawanData,
      });
  
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
  
      // Check if album exists
      const existingAlbum = await getAlbumById(id);
      if (!existingAlbum) {
        resp.status(404).send({ success: false, message: "Album not found" });
        return;
      }
  
      // Delete album
      await deleteAlbum(id);
  
      resp.send({
        success: true,
        message: "Album deleted successfully",
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };
  