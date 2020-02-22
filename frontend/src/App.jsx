import React from 'react';
import './App.css';
import SpotifyLogin from './SpotifyLogin';
import Greeting from './Greeting';
import UserPlaylists from './UserPlaylists';

function App() {
  return (
    <div>
      <SpotifyLogin>
        <Greeting />
        <br />
        <UserPlaylists />
      </SpotifyLogin>
    </div>
  );
}

export default App;
