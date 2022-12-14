const request = require("request");
const express = require("express");
const cors = require("cors");

const app = express();

//allow cross origin requests from any domain
app.use(cors());

const client_id = "55a3676e8327405db7edde8b0970749e";
const client_secret = "40701a0bab784b11b6e42e6d8801b8b6";

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
    scope:"user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-recently-played",
  },
  json: true,
};

app.get("/", async (req, res) => {
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const token = body.access_token;
      return res.status(200).send({
        token: token,
      });
    }
  });
});

app.listen(9000, () => {
  console.log("server is running");
});
