import express from 'express';

import Spotify from './spotify';

const app = express();

app.use('/spotify', Spotify);

export default app;
