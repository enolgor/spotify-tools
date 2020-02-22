const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export default async (sf, playListName, playlistIds, userId) => {
  try {
    const tracks = [];
    const fetchAndAddTracks = async (id) => {
      const response = await sf.getAll(`/playlists/${id}/tracks`);
      tracks.push(...response.items.map((item) => item.track.uri));
    };
    let promises = [];
    playlistIds.forEach((id) => promises.push(fetchAndAddTracks(id)));
    await Promise.all(promises);
    const playlist = await sf.post(`/users/${userId}/playlists`, {
      name: playListName,
      public: false,
      collaborative: false,
    });
    const batches = [];
    const unique = tracks.filter(onlyUnique);
    let cursor = 0;
    let batch;
    do {
      batch = unique.slice(cursor, cursor + 100);
      cursor += 100;
      if (batch.length > 0) batches.push(batch);
    } while (batch.length > 0);
    promises = [];
    batches.forEach((trackbatch) => promises.push(sf.post(`/playlists/${playlist.id}/tracks`, {
      uris: trackbatch,
    })));
    await Promise.all(promises);
    return true;
  } catch (error) {
    return false;
  }
};
