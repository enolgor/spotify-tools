/* global database */
export default async () => {
  const resp = await database.find({ type: 'credential' });
  return resp;
};
