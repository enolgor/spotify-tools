import express from 'express';

import Authcallback from './authcallback';
import RefreshToken from './refreshToken';
import Links from './links';

const app = express();

app.get('/authcallback', Authcallback);
app.get('/refresh/:token', RefreshToken);
app.use('/links', Links);

export default app;
