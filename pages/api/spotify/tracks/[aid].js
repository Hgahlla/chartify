import fetcher from "../../../../lib/fetcher";

export default async function handler(req, res) {
  const { aid } = req.query;

  try {
    // Get artist information
    const artistInfo = await fetcher(
      `${process.env.SP_API_BASE_URL}${process.env.SP_API_ARTIST_INFO}${aid}`
    );

    // Get all release IDs of an artist (albums & singles)
    const releaseIDs = getReleaseIDs(artistInfo.data.releases);

    let tracks = [];
    for (const releaseID of releaseIDs) {
      // Get release Info
      const releaseInfo = await fetcher(
        `${process.env.SP_API_BASE_URL}${process.env.SP_API_ALBUM_PLAY_COUNT}${releaseID}`
      );

      // Get tracks from a release
      const releaseTracks = getReleaseTracks(releaseInfo.data);

      // Add temp array to tracks array
      tracks.push(...releaseTracks);
    }

    return res.json(tracks);
  } catch (err) {
    const { success, message } = err;

    return res.json({ error: { success, message } });
  }
}

const getReleaseIDs = (releases) => {
  let tempReleaseIDs = [];

  for (let [releaseType, value] of Object.entries(releases)) {
    if (releaseType === "appears_on") {
      break;
    }

    value.releases.forEach((release) => {
      tempReleaseIDs.push(release.uri.split(":")[2]);
    });
  }
  return tempReleaseIDs;
};

const getReleaseTracks = (release) => {
  let tempTracks = [];

  release.discs.forEach((disc) => {
    disc.tracks.forEach((track) => {
      track.cover = release.cover;
      track.album_name = release.name;

      tempTracks.push(track);
    });
  });

  return tempTracks;
};
