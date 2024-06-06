import { Request, Response } from 'express';
import { get_all_categories_from_db } from '../database/modals/categories';
import { get_all_naat_khawans_from_db } from '../database/modals/naatKhawan';
import { getAllAlbumsFromDB } from '../database/modals/album';
import { getAllAudiosFromDB } from '../database/modals/audios';
import { getAllPlaylistsFromDB } from '../database/modals/playlist';


export const dashboard = async (req: Request, res: Response) => {
  try {
    const categories = await get_all_categories_from_db();
    const naatKhawans = await get_all_naat_khawans_from_db();
    const albums = await getAllAlbumsFromDB();
    const audios = await getAllAudiosFromDB();
    const playlists = await getAllPlaylistsFromDB();
   

    const counts = {
      categories: categories.length,
      naatKhawans: naatKhawans.length,
      albums: albums.length,
      audios: audios.length,
      playlists: playlists.length,
    };

    res.json(counts);
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
