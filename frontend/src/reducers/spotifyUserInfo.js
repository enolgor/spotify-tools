// eslint-disable-next-line import/no-unresolved
import { SPOTIFY_USERINFO } from 'actions';

export default (spotifyUserInfo = {}, { type, username }) => {
  switch (type) {
    case SPOTIFY_USERINFO: {
      return {
        username,
      };
    }
    default: {
      return spotifyUserInfo;
    }
  }
};
