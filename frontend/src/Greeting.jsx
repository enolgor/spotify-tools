/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { spotifyUserInfo } from 'actions';
import spotiFetch from './spotiFetch';


function Greeting({ credentials, username, onUserInfoFetched }) {
  useEffect(() => {
    (async () => {
      const info = await spotiFetch(credentials).get('/me');
      onUserInfoFetched(info.display_name);
    })();
  }, [credentials, onUserInfoFetched]);

  return (
    <div>
      Hello&nbsp;
      {username}
    </div>
  );
}

// eslint-disable-next-line no-shadow
const mapStateToProps = ({ spotifyLogin, spotifyUserInfo = {} }) => ({
  credentials: spotifyLogin,
  username: spotifyUserInfo.username,
});

const mapDispatchToProps = (dispatch) => ({
  onUserInfoFetched: (username) => dispatch(spotifyUserInfo({ username })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Greeting);
