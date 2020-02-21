import express from 'express';

import Authcallback from './authcallback';
import RefreshToken from './refreshToken';

const app = express();

app.get('/authcallback', Authcallback);
app.get('/refresh/:token', RefreshToken);

export default app;
