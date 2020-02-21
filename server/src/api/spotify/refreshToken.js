import fetch from 'node-fetch';
import spotifyCreds from './creds';

export default async (req, res) => {
  const { token } = req.params;
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', token);
  params.append('client_id', spotifyCreds.client_id);
  params.append('client_secret', spotifyCreds.client_secret);
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: params,
  });
  const jsonRes = await response.json();
  res.status(200).json(jsonRes);
};
