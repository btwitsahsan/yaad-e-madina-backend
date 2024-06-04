import { createAudio, deleteAudio, findAudioByName, getAllAudiosFromDB, getAudioById, updateAudio } from "../database/modals/audios";
export const create_audio = async (req: any, resp: any) => {
  try {
    // console.log(req.body);
      const { title, categories, albums, status, naatKhawans, audioFile, imageFile, lyrics, audioDetails } = req.body;

      if (!title || !audioFile || !imageFile || !status) {
          resp.status(422).send({ success: false, message: "Required fields are missing" });
          return;
      }

      // Extracting ids and names from categories and albums arrays of objects
      const categoryData = categories.map((category: any) => ({ id: category.value, name: category.label }));
      const albumData = albums.map((album: any) => ({ id: album.value, name: album.label }));
      const naatKhawanData = naatKhawans.map((nk: any) => ({ id: nk.value, name: nk.label }));

      // Check if audio already exists
      const existingAudio = await findAudioByName(title);
      if (existingAudio) {
          resp.status(409).send({ success: false, message: "Audio already exists" });
          return;
      }

      // Create new audio
      const newAudio = await createAudio({
          title,
          categories: categoryData,
          albums: albumData,
          status,
          naatKhawans: naatKhawanData,
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




// Update audio by ID
export const update_audio = async (req:any, res:any) => {
  try {
    const { id } = req.params;
    const { title, categories, albums, status, naatKhawans, audioFile, imageFile, lyrics, audioDetails } = req.body;

    // Check for required fields
    if (!title || !audioFile || !imageFile || !status) {
      return res.status(422).send({ success: false, message: "Please provide all required fields" });
    }

    // Convert array of objects to arrays of strings containing IDs and labels
    const categoryIds = categories.map((category:any) => ({ id: category.id, name: category.label }));
    const albumIds = albums.map((album:any) => ({ id: album.id, name: album.label }));
    const naatKhawanIds = naatKhawans.map((naatKhawan:any) => ({ id: naatKhawan.id, name: naatKhawan.label }));

    // Update the audio entry in the database
    const updatedAudio = await updateAudio(id, { 
      title, 
      categories: categoryIds, 
      albums: albumIds, 
      status, 
      naatKhawans: naatKhawanIds, 
      audioFile, 
      imageFile, 
      lyrics, 
      audioDetails 
    });

    if (!updatedAudio) {
      return res.status(404).send({ success: false, message: "Audio not found" });
    }

    res.status(200).send({ success: true, audio: updatedAudio });
  } catch (err:any) {
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





  