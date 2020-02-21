import { combineReducers } from 'redux';

import spotifyLogin from './spotifyLogin';
import spotifyUserInfo from './spotifyUserInfo';

export default combineReducers({
  spotifyLogin,
  spotifyUserInfo,
});
