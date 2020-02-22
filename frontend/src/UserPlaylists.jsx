/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { spotifySetUserPlaylistsAction } from './actions';
import spotiFetch from './spotiFetch';
import createCombinedPlaylist from './createCombinedPlaylist';

function PlaylistItem({ playlistName, onCheckBoxChange }) {
  return (
    <li style={{ margin: '5px' }}><input type="checkbox" onChange={onCheckBoxChange} />{playlistName}</li>
  );
}

function UserPlaylists({ credentials, onUserPlaylistsFetched, playlists, userInfo }) {
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const selectPlaylist = (id, selected) => {
    const newSelectedPlaylists = selectedPlaylists.slice();
    const idx = selectedPlaylists.findIndex((p) => p === id);
    if (selected) {
      newSelectedPlaylists.push(id);
    } else {
      newSelectedPlaylists.splice(idx, 1);
    }
    setSelectedPlaylists(newSelectedPlaylists);
  };
  useEffect(() => {
    (async () => {
      const sf = spotiFetch(credentials);
      const fetchedPlaylists = await sf.getAll('/me/playlists');
      onUserPlaylistsFetched(fetchedPlaylists);
    })();
  }, [credentials, onUserPlaylistsFetched]);
  const combinePlaylists = () => {
    if (selectedPlaylists.length === 0) return;
    (async () => {
      const sf = spotiFetch(credentials);
      const ok = await createCombinedPlaylist(sf, newPlaylistName, selectedPlaylists, userInfo.id);
      alert(ok ? 'Playlist created successfully' : 'There was an error creating the playlist');
      setNewPlaylistName('');
      const fetchedPlaylists = await sf.getAll('/me/playlists');
      onUserPlaylistsFetched(fetchedPlaylists);
    })();
  };
  return (
    <div>
      <input type="text" value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)} /><button onClick={combinePlaylists}>Combine!</button><br />
      <ul>{playlists.items.map((item) => <PlaylistItem key={item.id} playlistName={item.name} onCheckBoxChange={(e) => selectPlaylist(item.id, e.target.checked)} />)}</ul>
    </div>
  );
}

// eslint-disable-next-line no-shadow
const mapStateToProps = (state) => ({
  credentials: state.spotify.credentials,
  playlists: state.spotify.playlists,
  userInfo: state.spotify.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onUserPlaylistsFetched: (playlists) => dispatch(spotifySetUserPlaylistsAction({ playlists })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPlaylists);
