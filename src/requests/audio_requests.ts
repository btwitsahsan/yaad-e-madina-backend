import { createAudio, deleteAudio, findAudioByName, getAllAudiosFromDB, getAudioById, updateAudio } from "../database/modals/audios";



export const create_audio = async (req: any, resp: any) => {
  try {
    const { title, category, album, status, naatKhawan, audioFile, imageFile, lyrics, audioDetails } = req.body;

    if (!title || !audioFile || !imageFile || !status) {
      resp.status(422).send({ success: false, message: "Required fields are missing" });
      return;
    }

    // Extracting IDs and names from category and album objects
    const categoryData = { id: category.value, name: category.label };
    const albumData = { id: album.value, name: album.label };
    const naatKhawanData = { id: naatKhawan.value, name: naatKhawan.label };

    // Check if audio already exists
    const existingAudio = await findAudioByName(title);
    if (existingAudio) {
      resp.status(409).send({ success: false, message: "Audio already exists" });
      return;
    }

    // Create new audio
    const newAudio = await createAudio({
      title,
      category: categoryData,
      album: albumData,
      status,
      naatKhawan: naatKhawanData,
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
  





// Get audio by ID
export const get_audio_by_id = async (req:any, res:any) => {
  try {
    const { id } = req.params;
    const audio = await getAudioById(id);

    if (!audio) {
      return res.status(404).send({ success: false, message: "Audio not found" });
    }

    res.status(200).send({ success: true, audio });
  } catch (err:any) {
    res.status(500).send({ success: false, message: err.message });
  }
};




export const update_audio = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { title, category, album, status, naatKhawan, audioFile, imageFile, lyrics, audioDetails } = req.body;
console.log(req.body);
    // Check for required fields
    if (!title || !audioFile || !imageFile || !status) {
      return res.status(422).send({ success: false, message: "Please provide all required fields" });
    }

    // Extracting IDs and names from category and album objects
    const categoryId = category.value;
    const albumId = album.value;
    const naatKhawanId = naatKhawan.value;

    // Update the audio entry in the database
    const updatedAudio = await updateAudio(id, {
      title,
      category: { id: categoryId, name: category.label },
      album: { id: albumId, name: album.label },
      status,
      naatKhawan: { id: naatKhawanId, name: naatKhawan.label },
      audioFile,
      imageFile,
      lyrics,
      audioDetails,
    });

    if (!updatedAudio) {
      return res.status(404).send({ success: false, message: "Audio not found" });
    }

    res.status(200).send({ success: true, audio: updatedAudio });
  } catch (err: any) {
    res.status(500).send({ success: false, message: err.message });
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





  