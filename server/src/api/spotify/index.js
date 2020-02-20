import express from "express";

import Authcallback from "./authcallback";

const app = express();

app.get("/authcallback", Authcallback);

export default app;
