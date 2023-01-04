import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
  "user-read-email",
  "user-follow-read",
  "user-read-private",
].join(",");

const params = {
  scopes: scopes,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;
