const baseUrl = 'https://api.spotify.com/v1';

export default (credentials) => {
  const opts = {};
  opts.headers = {};
  opts.headers.Authorization = `Bearer ${credentials.accessToken}`;
  return {
    get: async (path) => {
      opts.method = 'GET';
      const resp = await fetch(`${baseUrl}${path}`, opts);
      const jsonResp = await resp.json();
      return jsonResp;
    },
  };
};
