/* global database */
export default async (user, dest, origins) => {
  await database.update({ user, type: 'playlist_link', dest }, { user, type: 'playlist_link', dest, origins }, {
    upsert: true,
  });
};
