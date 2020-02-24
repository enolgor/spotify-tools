import fetch from 'node-fetch';
import spotifyCreds from './creds';

// eslint-disable-next-line no-shadow
export const refreshToken = async (fetch, refToken, clientId, clientSecret) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refToken);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: params,
  });
  const jsonRes = await response.json();
  return jsonRes;
};

export default async (req, res) => {
  const { token } = req.params;
  /*
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', token);
  params.append('client_id', spotifyCreds.client_id);
  params.append('client_secret', spotifyCreds.client_secret);
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: params,
  });
  const jsonRes = await response.json();*/
  const jsonRes = await refreshToken(fetch, token, spotifyCreds.client_id, spotifyCreds.client_secret);
  res.status(200).json(jsonRes);
};
