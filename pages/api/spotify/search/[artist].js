import { getToken } from "next-auth/jwt";
import spotifyApi from "../../../../lib/spotifyWebApi";

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  spotifyApi.setAccessToken(token.accessToken);
  spotifyApi.setRefreshToken(token.refreshToken);

  const { artist } = req.query;

  try {
    const { body, headers, statusCode } = await spotifyApi.searchArtists(
      artist,
      { limit: 10 }
    );

    return res.json({ body, headers, statusCode });
  } catch (err) {
    const { body, headers, statusCode } = err;

    return res.json({ body, headers, statusCode });
  }
}
