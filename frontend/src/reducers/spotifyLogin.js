// eslint-disable-next-line import/no-unresolved
import { SPOTIFY_LOGIN } from 'actions';

export default (spotifyLogin = {}, { type, accessToken, refreshToken }) => {
  switch (type) {
    case SPOTIFY_LOGIN: {
      return {
        accessToken,
        refreshToken,
      };
    }
    default: {
      return spotifyLogin;
    }
  }
};
