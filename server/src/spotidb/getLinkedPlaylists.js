/* global database */
export default async (user) => {
  const resp = await database.find({ user, type: 'playlist_link' });
  return resp;
};
