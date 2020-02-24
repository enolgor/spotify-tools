/* global database */
export default async (user, refreshToken) => {
  await database.update({ user, type: 'credential' }, { user, refreshToken, type: 'credential' }, {
    upsert: true,
  });
};
