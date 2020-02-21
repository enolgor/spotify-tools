export const SPOTIFY_USERINFO = 'SPOTIFY_USERINFO';

export const spotifyUserInfo = ({ username }) => ({
  type: SPOTIFY_USERINFO,
  username,
});
