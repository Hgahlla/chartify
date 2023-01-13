import fetcher from "../../../../lib/fetcher";

export default async function handler(req, res) {
  const { aid } = req.query;

  try {
    // Get artist insights (monthly listeners, "Discovered On" playlists, cities w/ most listeners, etc)
    const artistInsights = await fetcher(
      `${process.env.SP_API_BASE_URL}${process.env.SP_API_ARTIST_INSIGHTS}${aid}`
    );
    const { data } = artistInsights;

    return res.json({ data });
  } catch (err) {
    const { success, message } = err;

    return res.json({ error: { success, message } });
  }
}
