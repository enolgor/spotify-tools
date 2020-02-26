import fetch from 'node-fetch';
import spoti from 'spotilib';
import { getAllCredentials, getLinkedPlaylists } from '../spotidb';
import { refreshToken } from '../api/spotify/refreshToken';

const creds = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

const syncPlaylist = async (api, dest, origs) => {
  await api.clearTracksFromPlaylist(dest);
  const tracks = [];
  await Promise.all(origs.map(async (playlistId) => {
    const response = await api.getAllPlaylistTracks(playlistId);
    tracks.push(...response.items.map((item) => item.track.uri));
  }));
  await api.addAllTracksToPlaylist(dest, tracks.filter(onlyUnique));
};

const syncForUser = async (user, refToken) => {
  const jsonRes = await refreshToken(
    fetch,
    refToken,
    creds.clientId,
    creds.clientSecret,
  );
  const accessToken = jsonRes.access_token;
  const sf = spoti.fetch(fetch, {
    accessToken,
    refreshToken: refToken,
  });
  const api = spoti.api(sf);
  const links = await getLinkedPlaylists(user);
  return Promise.all(
    links.map((entry) => syncPlaylist(api, entry.dest, entry.origins)),
  );
};

export default {
  name: 'resync',
  rule: '0 * * * *',
  job: async () => {
    const credentials = await getAllCredentials();
    await Promise.all(
      credentials.map((entry) => syncForUser(entry.user, entry.refreshToken)),
    );
    console.log(`Executed async on ${new Date()}`);
  },
};
