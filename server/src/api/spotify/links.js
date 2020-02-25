import express from 'express';
import {
  createLinkedPlaylist,
  getLinkedPlaylists,
  deleteLinkedPlaylist,
} from '../../spotidb';

const app = express();

const createLink = async (req, res) => {
  const { userId, dest } = req.params;
  const playlistIds = req.body;
  try {
    await createLinkedPlaylist(userId, dest, playlistIds);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const getLinks = async (req, res) => {
  const { userId } = req.params;
  try {
    const entries = await getLinkedPlaylists(userId);
    const links = entries.map((entry) => ({
      dest: entry.dest,
      origs: entry.origins,
    }));
    res.status(200).json(links);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteLink = async (req, res) =>{
  const { userId, dest } = req.params;
  try {
    await deleteLinkedPlaylist(userId, dest);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

app.post('/create/:userId/:dest', createLink);
app.get('/delete/:userId/:dest', deleteLink);
app.get('/:userId', getLinks);

export default app;
