const baseUrl = 'https://api.spotify.com/v1';

export default (credentials) => {
  const createOpts = () => ({
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`,
    },
  });

  const get = async (path, fullUrl = false) => {
    const opts = createOpts();
    opts.method = 'GET';
    const url = fullUrl ? path : `${baseUrl}${path}`;
    const resp = await fetch(url, opts);
    const jsonResp = await resp.json();
    return jsonResp;
  };

  const getAll = async (path) => {
    const items = [];
    let resp = await get(path);
    items.push(...resp.items);
    while (resp.next) {
      // eslint-disable-next-line no-await-in-loop
      resp = await get(resp.next, true);
      items.push(...resp.items);
    }
    return { items };
  };

  const post = async (path, jsonBody, fullUrl = false) => {
    const opts = createOpts();
    opts.method = 'POST';
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(jsonBody);
    const url = fullUrl ? path : `${baseUrl}${path}`;
    const resp = await fetch(url, opts);
    const jsonResp = await resp.json();
    return jsonResp;
  };

  return {
    get,
    getAll,
    post,
  };
};
