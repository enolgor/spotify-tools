/* global database */
export default async (user, dest) => {
  await database.remove({ user, type: 'playlist_link', dest });
};
