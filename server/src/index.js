import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import morgan from 'morgan';

import Api from './api';

let PORT = 8080;

if (process.env.SERVER_PORT) {
  PORT = parseInt(process.env.SERVER_PORT, 10);
}

const app = express();

app.use(morgan('common'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(`${__dirname}/static`));

// ignore content-type and always treat as json body
// app.use('/api, bodyParser.json({ type: () => true }), Api);
app.use('/api', Api);

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});
