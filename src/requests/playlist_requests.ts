import { createPlaylist, deletePlaylist, findPlaylistByName, getAllPlaylistsFromDB, getPlaylistById, updatePlaylist } from "../database/modals/playlist";

// Create a new playlist
export const create_playlist = async (req:any, resp:any) => {
  try {
    console.log(req.body);
    const { title, audios, status, image } = req.body;

    if (!title || !image || !status || audios.length === 0) {
      resp.status(422).send({ success: false, message: "Required fields are missing" });
      return;
    }

    const audioData = audios.map((audio:any) => ({ id: audio.value, title: audio.label }));

    const existingPlaylist = await findPlaylistByName(title);
    if (existingPlaylist) {
      resp.status(409).send({ success: false, message: "Playlist already exists" });
      return;
    }
// console.log({title, audios, status, image});
    const newPlaylist = await createPlaylist({
      title,
      audios: audioData,
      status,
      image,
    });

    resp.send({
      success: true,
      playlist: newPlaylist,
    });
  } catch (err:any) {
    resp.status(400).send({ success: false, message: err.message });
  }
};

// Get all playlists
export const get_all_playlists = async (req:any, resp:any) => {
  try {
    const playlists = await getAllPlaylistsFromDB();
    resp.send({
      success: true,
      playlists,
    });
  } catch (err:any) {
    resp.status(400).send({ success: false, message: err.message });
  }
};

// Get playlist by ID
export const get_playlist_by_id = async (req:any, res:any) => {
  try {
    const { id } = req.params;
    const playlist = await getPlaylistById(id);

    if (!playlist) {
      return res.status(404).send({ success: false, message: "Playlist not found" });
    }

    res.status(200).send({ success: true, playlist });
  } catch (err:any) {
    res.status(500).send({ success: false, message: err.message });
  }
};

// Update playlist by ID
export const update_playlist = async (req:any, res:any) => {
  try {
    console.log(req.body)
    const { id } = req.params;
    const { title, audios, status, image } = req.body;

    if (!title || !image || !status || audios.length === 0) {
      return res.status(422).send({ success: false, message: "Please provide all required fields" });
    }

    const audioData = audios.map((audio:any) => ({ id: audio.id, title: audio.label }));

    const updatedPlaylist = await updatePlaylist(id, { 
      title, 
      audios: audioData, 
      status, 
      image 
    });

    if (!updatedPlaylist) {
      return res.status(404).send({ success: false, message: "Playlist not found" });
    }

    res.status(200).send({ success: true, playlist: updatedPlaylist });
  } catch (err:any) {
    res.status(500).send({ success: false, message: err.message });
  }
};

// Delete playlist by ID
export const delete_playlist = async (req:any, res:any) => {
  try {
    const { id } = req.params;
    const playlist = await deletePlaylist(id);

    if (!playlist) {
      return res.status(404).send({ success: false, message: "Playlist not found" });
    }

    res.status(200).send({ success: true, playlist });
  } catch (err:any) {
    res.status(500).send({ success: false, message: err.message });
  }
};
