export default async function handler(req, res) {
  const { aid } = req.query;

  try {
    const response = await fetch(
      `${process.env.SP_API_BASE_URL}${process.env.SP_API_ARTIST_INFO}${aid}`
    );
    const { success, data } = await response.json();

    const tracks = getTracks(data);
    data.tracks = tracks;

    return res.json({ success, data });
  } catch (err) {
    const { success, data } = err;

    return res.json({ success, data });
  }
}

const getTracks = (data) => {
  let tempTracks = [];

  for (let [releaseType, value] of Object.entries(data.releases)) {
    if (releaseType === "albums") {
      value.releases?.forEach((release) => {
        release.discs.forEach((disc) => {
          disc.tracks.forEach((track) => {
            track.cover = release.cover;
            tempTracks.push(track);
          });
        });
      });
    }
  }
  return tempTracks;
};
