/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setUserLinkedPlaylistsAction } from './actions';

function LinkedItem({ dest, origs, onDelete }) {
  return (
    <li style={{ margin: '5px' }}>
      <button onClick={onDelete}>Delete</button>&nbsp;
      <span style={{ fontWeight: 'bold' }}>{dest}</span>
      &nbsp;=
  {origs.map((id, idx) => (<span>&nbsp;<span style={{color: 'blue'}} >{id}</span>&nbsp;<span style={{ fontWeight: 'bold' }}>{idx < origs.length - 1 ? '+' : null}</span></span>))}
    </li>
  );
}

function SyncedPlaylists({ spotiApi, playlists, onUserLinkedPlaylistsFetched, linked, userInfo }) {
  useEffect(() => {
    (async () => {
      if(!userInfo.id) return;
      const resp = await fetch(`/api/spotify/links/${userInfo.id}`);
      const links = await resp.json();
      onUserLinkedPlaylistsFetched(links);
    })();
  }, [userInfo, spotiApi, onUserLinkedPlaylistsFetched]);
  const deleteLinked = async (dest) => {
    await fetch(`/api/spotify/links/delete/${userInfo.id}/${dest}`);
    const resp = await fetch(`/api/spotify/links/${userInfo.id}`);
    const links = await resp.json();
    onUserLinkedPlaylistsFetched(links);
  };
  const getName = (id) => playlists.items.find((playlist) => playlist.id === id).name;
  return (
    playlists.items.length === 0 ? null : (
      <div>
        <ul>{linked.map((link) => <LinkedItem key={link.dest} onDelete={() => deleteLinked(link.dest)}dest={getName(link.dest)} origs={link.origs.map(getName)} />)}</ul>
      </div>
    )
  );
}

// eslint-disable-next-line no-shadow
const mapStateToProps = (state) => ({
  spotiApi: state.spotify.spotiApi,
  linked: state.linked,
  playlists: state.spotify.playlists,
  userInfo: state.spotify.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onUserLinkedPlaylistsFetched: (linked) => dispatch(setUserLinkedPlaylistsAction({ linked })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SyncedPlaylists);
