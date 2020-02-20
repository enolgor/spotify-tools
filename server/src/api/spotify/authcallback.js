import { URLSearchParams } from "url";
import fetch, { Headers } from "node-fetch";
import { database } from "../../database";

const clientID = "988c958d2c054c3194dc99aa0c71e2c8";
const clientSecret = "9d910ef3edc8489d9751c70a7ff00c74";

export default async (req, res) => {
  console.log("Auth!");

  const { code, error } = req.query;

  if (error) {
    // handle error
  } else {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append(
      "redirect_uri",
      "http://localhost:8888/api/spotify/authcallback"
    );
    params.append("client_id", clientID);
    params.append("client_secret", clientSecret);
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: params
    });
    const jsonRes = await res.json();
    console.log(jsonRes);
  }

  console.log(req.query);
  res.status(200).send();
};
