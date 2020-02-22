import Cookies from 'js-cookie';
import { spotifyNewCredentialsAction } from './actions';

const refreshTokens = (cb) => {
  const refreshToken = Cookies.get('spotify_refresh_token');
  (async () => {
    const resp = await fetch(`/api/spotify/refresh/${refreshToken}`);
    const jsonResp = await resp.json();
    const accessToken = jsonResp.access_token;
    const expirationSeconds = jsonResp.expires_in;
    const date = new Date();
    date.setTime(date.getTime() + (expirationSeconds * 1000));
    Cookies.set('spotify_access_token', accessToken, { expires: date });
    Cookies.set('spotify_refresh_seconds', expirationSeconds, { expires: date });
    cb();
  })();
};

const getTokensAndDispatch = (store, secondTime) => {
  const accessToken = Cookies.get('spotify_access_token');
  const refreshToken = Cookies.get('spotify_refresh_token');
  const expirationSeconds = Cookies.get('spotify_refresh_seconds');
  if (accessToken && refreshToken && expirationSeconds) {
    if (!secondTime) {
      refreshTokens(() => getTokensAndDispatch(store, true));
    } else {
      store.dispatch(spotifyNewCredentialsAction({
        accessToken,
        refreshToken,
      }));
      setTimeout(() => refreshTokens(() => getTokensAndDispatch(store, true)), expirationSeconds * 1000);
    }
  }
};

export default getTokensAndDispatch;
