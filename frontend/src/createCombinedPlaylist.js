const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export default async (spotiApi, playListName, playlistIds, userId) => {
  try {
    const tracks = [];
    const fetchAndAddTracks = async (id) => {
      const response = await spotiApi.getAllPlaylistTracks(id);
      tracks.push(...response.items.map((item) => item.track.uri));
    };
    const promises = [];
    playlistIds.forEach((id) => promises.push(fetchAndAddTracks(id)));
    await Promise.all(promises);
    const playlist = await spotiApi.createPlaylist(userId, {
      name: playListName,
      public: false,
      collaborative: false,
    });
    await spotiApi.addAllTracksToPlaylist(playlist.id, tracks.filter(onlyUnique));
    await fetch(`/api/spotify/links/create/${userId}/${playlist.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistIds),
    });
    return true;
  } catch (error) {
    return false;
  }
};
