import React from "react";
import "./App.css";

const loginUrl = `https://accounts.spotify.com/authorize`;

const addQueryParams = (url, params) => {
  const query = Object.keys(params)
    .reduce((agg, key) => `${agg}${key}=${params[key]}&`, "")
    .slice(0, -1);
  return `${url}${query && "?"}${query}`;
};

function App() {
  const loginParams = {
    client_id: "988c958d2c054c3194dc99aa0c71e2c8",
    response_type: "code",
    redirect_uri: "http://localhost:8888/api/spotify/authcallback",
    scope: "playlist-read-private"
  };
  return (
    <div>
      <a href={addQueryParams(loginUrl, loginParams)}>Login to Spotify</a>
    </div>
  );
}

export default App;
