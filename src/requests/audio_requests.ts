import { createAudio, deleteAudio, findAudioByName, getAllAudiosFromDB } from "../database/modals/audios";

export const create_audio = async (req: any, resp: any) => {
    try {
      // console.log(req.body);
      const { title, categories, albums, status, naatKhawans, audioFile, imageFile, lyrics, audioDetails } = req.body;
  
      if (!title) {
        resp.status(422).send({ success: false, message: "Audio title not entered" });
        return;
      }
  
      if (!audioFile) {
        resp.status(422).send({ success: false, message: "Audio file not entered" });
        return;
      }
  
      if (!imageFile) {
        resp.status(422).send({ success: false, message: "Image file not entered" });
        return;
      }
  
      if (!status) {
        resp.status(422).send({ success: false, message: "Status not entered" });
        return;
      }
  
      // Check if audio already exists
      const existingAudio = await findAudioByName(title);
      if (existingAudio) {
        resp.status(409).send({ success: false, message: "Audio already exists" });
        return;
      }


      // Create new audio
      const id = crypto.randomUUID();
      const newAudio = await createAudio({
        id,
        title,
        categories,
        albums,
        status,
        naatKhawans,
        audioFile,
        imageFile,
        lyrics,
        audioDetails,
      });
  
      resp.send({
        success: true,
        audio: newAudio,
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };



  export const get_all_audios = async (req: any, resp: any) => {
    try {
      const audios = await getAllAudiosFromDB();
      resp.send({
        success: true,
        audios,
      });
    } catch (err: any) {
      resp.status(400).send({ success: false, message: err.message });
    }
  };
  
  export const delete_audio = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const audio = await deleteAudio(id);
  
      if (!audio) {
        return res.status(404).send({ success: false, message: "Audio not found" });
      }
  
      res.status(200).send({ success: true, audio });
    } catch (err: any) {
      res.status(500).send({ success: false, message: err.message });
    }
  };


  