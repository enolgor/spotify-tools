import {
  SPOTIFY_NEW_CREDENTIALS,
  SPOTIFY_SET_LAST_PLAYED_SONGS,
  SPOTIFY_SET_USER_INFO,
  SPOTIFY_SET_USER_PLAYLISTS,
} from './actions'

export default (state = {}, action) => {
  switch (action.type) {
    case SPOTIFY_NEW_CREDENTIALS: {
      return {
        ...state,
        spotify: {
          ...state.spotify,
          credentials: {
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
          },
        },
      };
    }
    case SPOTIFY_SET_LAST_PLAYED_SONGS: {
      return {
        ...state,
        spotify: {
          ...state.spotify,
          lastPlayedSongs: action.lastPlayedSongs,
        },
      };
    }
    case SPOTIFY_SET_USER_INFO: {
      return {
        ...state,
        spotify: {
          ...state.spotify,
          userInfo: action.userInfo,
        },
      };
    }
    case SPOTIFY_SET_USER_PLAYLISTS: {
      return {
        ...state,
        spotify: {
          ...state.spotify,
          playlists: action.playlists,
        },
      };
    }
    default: {
      return state;
    }
  }
};
