import React from 'react';
import './App.css';
import SpotifyLogin from './SpotifyLogin';
import Greeting from './Greeting';
import UserPlaylists from './UserPlaylists';
import SyncedPlaylists from './SyncedPlaylists';

function App() {
  return (
    <div>
      <SpotifyLogin>
        <Greeting />
        <br />
        <UserPlaylists />
        <br />
        <SyncedPlaylists />
      </SpotifyLogin>
    </div>
  );
}

export default App;
