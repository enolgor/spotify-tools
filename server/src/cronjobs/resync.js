import { getAllCredentials, getLinkedPlaylists } from '../spotidb';
import { refreshToken } from '../api/spotify/refreshToken';

const syncPlaylist = async (dest, origs) => {
  console.log(`Syncing ${dest} and ${origs}`);
};

const syncForUser = async (user, refToken) => {
  const jsonRes = await refreshToken(refToken);
  console.log(jsonRes);
  const links = await getLinkedPlaylists(user);
  return Promise.all(links.map((entry) => syncPlaylist(entry.dest, entry.origins)));
};

export default {
  name: 'resync',
  rule: '* * * * *',
  job: async () => {
    const credentials = await getAllCredentials();
    await Promise.all(credentials.map((entry) => syncForUser(entry.user, entry.refreshToken)));
    console.log(`Executed async on ${new Date()}`);
  },
};
