/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

const loginUrl = 'https://accounts.spotify.com/authorize';
const redirectUri = process.env.REACT_APP_SPOTIFY_AUTH_CALLBACK;
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const scopes = ['playlist-read-private'];

const addQueryParams = (url, params) => {
  const query = Object.keys(params)
    .reduce((agg, key) => `${agg}${key}=${params[key]}&`, '')
    .slice(0, -1);
  return `${url}${query && '?'}${query}`;
};

function SpotifyLogin({ spotifyLogin, children }) {
  const queryParams = {
    redirect_uri: redirectUri,
    client_id: clientId,
    response_type: 'code',
    scope: scopes.join(' '),
  };
  return !spotifyLogin.refreshToken
    ? <a href={addQueryParams(loginUrl, queryParams)}>Login to Spotify</a>
    : children;
}

const mapStateToProps = ({ spotifyLogin = {} }) => ({
  spotifyLogin,
});

export default connect(mapStateToProps)(SpotifyLogin);
