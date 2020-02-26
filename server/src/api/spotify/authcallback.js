import { URLSearchParams } from 'url';
import fetch from 'node-fetch';
import spoti from 'spotilib';
import spotifyCreds from './creds';
import { upsertRefreshToken } from '../../spotidb';

const redirectURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.BASE_URL_FRONTEND;
  }
  return '/';
};

export default async (req, res) => {
  const { code, error } = req.query;
  if (error) {
    res.redirect(303, `${redirectURL()}#failed`);
  } else {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.REACT_APP_SPOTIFY_AUTH_CALLBACK);
    params.append('client_id', spotifyCreds.client_id);
    params.append('client_secret', spotifyCreds.client_secret);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: params,
    });
    const jsonRes = await response.json();
    const sf = spoti.fetch(fetch, {
      accessToken: jsonRes.access_token,
      refreshToken: jsonRes.refresh_token,
    });
    const userInfo = await spoti.api(sf).getUserInfo();
    await upsertRefreshToken(userInfo.id, jsonRes.refresh_token);
    res.cookie('spotify_access_token', jsonRes.access_token, {
      maxAge: jsonRes.expires_in * 1000,
    });
    res.cookie('spotify_refresh_token', jsonRes.refresh_token, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    res.cookie('spotify_refresh_seconds', jsonRes.expires_in, {
      maxAge: jsonRes.expires_in * 1000,
    });
    res.redirect(303, redirectURL());
  }
};
