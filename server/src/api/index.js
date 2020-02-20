import express from 'express';

import Tools from './tools';

const app = express();

app.get('/tools', Tools);

export default app;
