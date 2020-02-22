/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { spotifySetUserInfoAction } from './actions';
import spotiFetch from './spotiFetch';

function Greeting({ credentials, userInfo, onUserInfoFetched }) {
  useEffect(() => {
    (async () => {
      const sf = spotiFetch(credentials);
      const info = await sf.get('/me');
      onUserInfoFetched(info);
    })();
  }, [credentials, onUserInfoFetched]);
  return (
    <div>
      Hello&nbsp;
      {userInfo.display_name}
    </div>
  );
}

// eslint-disable-next-line no-shadow
const mapStateToProps = (state) => ({
  credentials: state.spotify.credentials,
  userInfo: state.spotify.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onUserInfoFetched: (userInfo) => dispatch(spotifySetUserInfoAction({ userInfo })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Greeting);
