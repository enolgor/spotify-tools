export const SPOTIFY_NEW_CREDENTIALS = 'SPOTIFY_NEW_CREDENTIALS';

export const spotifyNewCredentialsAction = ({ accessToken, refreshToken }) => ({
  type: SPOTIFY_NEW_CREDENTIALS,
  accessToken,
  refreshToken,
});

export const SPOTIFY_SET_LAST_PLAYED_SONGS = 'SPOTIFY_SET_LAST_PLAYED_SONGS';

export const spotifySetLastPlayedSongsAction = ({ lastPlayedSongs }) => ({
  type: SPOTIFY_SET_LAST_PLAYED_SONGS,
  lastPlayedSongs,
});

export const SPOTIFY_SET_USER_INFO = 'SPOTIFY_SET_USER_INFO';

export const spotifySetUserInfoAction = ({ userInfo }) => ({
  type: SPOTIFY_SET_USER_INFO,
  userInfo,
});

export const SPOTIFY_SET_USER_PLAYLISTS = 'SPOTIFY_SET_USER_PLAYLISTS';

export const spotifySetUserPlaylistsAction = ({ playlists }) => ({
  type: SPOTIFY_SET_USER_PLAYLISTS,
  playlists,
});

export const SET_USER_LINKED_PLAYLISTS = 'SET_USER_LINKED_PLAYLISTS';

export const setUserLinkedPlaylistsAction = ({ linked }) => ({
  type: SET_USER_LINKED_PLAYLISTS,
  linked,
});
