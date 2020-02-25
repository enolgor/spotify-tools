import fetch from 'node-fetch';
import { spotiFetch, spotiApi } from 'spotilib';
import { getAllCredentials, getLinkedPlaylists } from '../spotidb';
import { refreshToken } from '../api/spotify/refreshToken';

const creds = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

const syncPlaylist = async (api, dest, origs) => {
  const resp = await api.clearTracksFromPlaylist(dest);
  console.log(resp);
  console.log(`Syncing ${dest} and ${origs}`);
};

const syncForUser = async (user, refToken) => {
  const jsonRes = await refreshToken(
    fetch,
    refToken,
    creds.clientId,
    creds.clientSecret,
  );
  const accessToken = jsonRes.access_token;
  const sf = spotiFetch(fetch, {
    accessToken,
    refreshToken: refToken,
  });
  const api = spotiApi(sf);
  const links = await getLinkedPlaylists(user);
  return Promise.all(
    links.map((entry) => syncPlaylist(api, entry.dest, entry.origins)),
  );
};

export default {
  name: 'resync',
  rule: '* * * * *',
  job: async () => {
    const credentials = await getAllCredentials();
    await Promise.all(
      credentials.map((entry) => syncForUser(entry.user, entry.refreshToken)),
    );
    console.log(`Executed async on ${new Date()}`);
  },
};
