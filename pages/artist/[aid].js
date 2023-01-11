import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

const ArtistPage = () => {
  const router = useRouter();
  const { aid } = router.query;

  const {
    data: artistInfo,
    error,
    isLoading,
  } = useSWR(aid ? `/api/spotify/artist/${aid}` : null, fetcher);

  const [tracks, setTracks] = useState([]);
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

  // useEffect(() => {
  //   for (let [releaseType, value] of Object.entries(
  //     artistInfo?.data.releases
  //   )) {
  //     if (releaseType !== "appears_on") {
  //       value.releases?.forEach((release) => {
  //         release.discs.forEach((disc) => {
  //           disc.tracks.forEach((track) => {
  //             track.cover = release.cover;
  //             setTracks((oldTracks) => [...oldTracks, track]);
  //           });
  //         });
  //       });
  //     }
  //   }

  //   sortTracks(sortOption);
  // }, [artistInfo]);

  useEffect(() => {
    if (artistInfo?.data?.tracks) {
      setTracks(artistInfo.data.tracks);
    }
  }, [artistInfo]);

  useEffect(() => {
    sortTracks(sortOption);
  }, [tracks, sortOption]);

  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Image
        src={artistInfo?.data?.header_image.image}
        alt="Artist Portrait"
        height={60}
        width={60}
      />
      <div className="flex space-x-3">
        <Image
          src={artistInfo?.data?.info.portraits[0].uri}
          alt="Artist Portrait"
          height={60}
          width={60}
        />
        <h1 className="text-3xl">{artistInfo?.data?.info.name}</h1>
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
              {track.name}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
};

export default ArtistPage;
