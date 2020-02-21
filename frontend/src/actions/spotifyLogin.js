export const SPOTIFY_LOGIN = 'SPOTIFY_LOGIN';

export const spotifyLogin = ({ accessToken, refreshToken }) => ({
  type: SPOTIFY_LOGIN,
  accessToken,
  refreshToken,
});
