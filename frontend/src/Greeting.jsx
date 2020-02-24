/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { spotifySetUserInfoAction } from './actions';

function Greeting({ spotiApi, userInfo, onUserInfoFetched }) {
  useEffect(() => {
    (async () => {
      const info = await spotiApi.getUserInfo();
      onUserInfoFetched(info);
    })();
  }, [spotiApi, onUserInfoFetched]);
  return (
    <div>
      Hello&nbsp;
      {userInfo.display_name}
    </div>
  );
}

// eslint-disable-next-line no-shadow
const mapStateToProps = (state) => ({
  spotiApi: state.spotify.spotiApi,
  userInfo: state.spotify.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  onUserInfoFetched: (userInfo) => dispatch(spotifySetUserInfoAction({ userInfo })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Greeting);
