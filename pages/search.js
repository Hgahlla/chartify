import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import useDebounce from "../hooks/useDebounce";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const debouncedValue = useDebounce(query, 1000);

  const { data, error, isLoading } = useSWR(
    debouncedValue ? `/api/spotify/search/${debouncedValue}` : null,
    fetcher
  );

  return (
    <div className="flex justify-center space-x-3">
      <h1 className="text-xl">Search</h1>
      <input
        className="h-8 border border-black"
        type="text"
        placeholder="Search Artist"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {error && <div>{`${error.status} ${error.message}`}</div>}

      {isLoading && <div>loading...</div>}

      {data && (
        <ol className="ml-20 w-96">
          {data.body.artists.items.map((artist) => (
            <Link href={`artist/${artist.id}`} key={artist.id}>
              <li className="flex  space-x-3 bg-gray-500 p-2  hover:bg-green-500">
                <Image
                  className="h-10 w-10"
                  src={artist.images[0]?.url}
                  alt="Artist Profile"
                  width={artist.images[0]?.width}
                  height={artist.images[0]?.height}
                />
                <span>{artist.name}</span>
              </li>
            </Link>
          ))}
        </ol>
      )}
    </div>
  );
};

export default SearchPage;
