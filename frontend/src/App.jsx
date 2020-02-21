import React from 'react';
import './App.css';
import SpotifyLogin from './SpotifyLogin';
import Greeting from './Greeting';

function App() {
  return (
    <div>
      <SpotifyLogin>
        <Greeting />
      </SpotifyLogin>
    </div>
  );
}

export default App;
