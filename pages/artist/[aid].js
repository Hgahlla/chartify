import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

const ArtistPage = () => {
  const router = useRouter();
  const { aid } = router.query;

  const {
    data: tracks,
    error: tracksError,
    isLoading: tracksIsLoading,
  } = useSWR(aid ? `/api/spotify/tracks/${aid}` : null, fetcher);

  const {
    data: artistInsights,
    error: artistInsightsError,
    isLoading: artistInsightsIsLoading,
  } = useSWR(aid ? `/api/spotify/artist/${aid}` : null, fetcher);

  const [sortedTracks, setSortedTracks] = useState([]);
  const [sortOption, setSortOption] = useState("playcount");

  const handleSelect = (e) => {
    setSortOption(e.target.value);
  };

  const sortTracks = (sortBy) => {
    let tempTracks = [...tracks];

    if (sortBy === "playcount") {
      tempTracks = tempTracks.sort((a, b) => b.playcount - a.playcount);
    }

    if (sortBy === "popularity") {
      tempTracks = tempTracks.sort((a, b) => b.popularity - a.popularity);
    }

    setSortedTracks(tempTracks);
  };

  useEffect(() => {
    if (tracks) {
      sortTracks(sortOption);
    }
  }, [tracks, sortOption]);

  if (tracksError) return <div>failed to load</div>;

  if (tracksIsLoading) return <div>loading...</div>;

  return (
    <>
      <Image
        src={artistInsights?.data?.headerImage.uri}
        alt="Artist Portrait"
        height={60}
        width={60}
      />
      <div className="flex space-x-3">
        <Image
          src={artistInsights?.data?.mainImageUrl}
          alt="Artist Portrait"
          height={60}
          width={60}
        />
        <h1 className="text-3xl">{artistInsights?.data?.name}</h1>
        <h2 className="text-xl">
          {`#${artistInsights?.data?.globalChartPosition} in the world`}
        </h2>
        <h3>{`${artistInsights?.data?.monthlyListeners.toLocaleString(
          "en-US"
        )} Monthly Listeners`}</h3>
        <h3>{`${artistInsights?.data?.followerCount.toLocaleString(
          "en-US"
        )} Followers`}</h3>
        <ol>
          {artistInsights?.data?.cities.map((city) => {
            return (
              <li key={city.city}>
                {`${city.listeners.toLocaleString("en-US")} listeners in ${
                  city.city
                }, ${city.country}`}
              </li>
            );
          })}
        </ol>
      </div>
      <form>
        <label htmlFor="sort">Sort By</label>
        <select
          name="sort"
          id="sort"
          value={sortOption}
          onChange={handleSelect}
        >
          <option value="playcount">Play Count</option>
          <option value="popularity">Popularity</option>
        </select>
      </form>
      <ol className="list-decimal px-12">
        {sortedTracks.map((track) => (
          <li key={track.uri}>
            <span>
              {track.playcount.toLocaleString("en-US")} {track.popularity}{" "}
              {track.name} {track.album_name}
              <Image
                src={track.cover.uri}
                alt="Album Art"
                height={60}
                width={60}
              />
            </span>
          </li>
        ))}
      </ol>
    </>
  );
};

export default ArtistPage;
