module.exports = (sf) => ({
  getUserInfo: async () => await sf.get('/me'),
  getAllUserPlaylists: async () => await sf.getAll('/me/playlists'),
  getAllPlaylistTracks: async (id) => await sf.getAll(`/playlists/${id}/tracks`),
  createPlaylist: async (userId, options) => await sf.post(`/users/${userId}/playlists`, options),
  addAllTracksToPlaylist: async (playListId, tracks) => {
    const batches = [];
    let cursor = 0;
    let batch;
    do {
      batch = tracks.slice(cursor, cursor + 100);
      cursor += 100;
      if (batch.length > 0) batches.push(batch);
    } while (batch.length > 0);
    promises = [];
    batches.forEach((trackbatch) => promises.push(sf.post(`/playlists/${playListId}/tracks`, {
      uris: trackbatch,
    })));
    return await Promise.all(promises);
  },
  clearTracksFromPlaylist: async (playlistId) => {

  },
});
