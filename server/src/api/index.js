import express from "express";

import Tools from "./tools";
import Spotify from "./spotify";

const app = express();

app.get("/tools", Tools);
app.use("/spotify", Spotify);

export default app;
