import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col justify-between w-64 h-full p-6 bg-black">
      <div>
        <div className="mt-4 mb-8">
          <Image
            src="/images/spotify/logos/Spotify_Logo_RGB_White.png"
            width={130}
            height={130}
            alt="Spotify Logo"
          />
        </div>

        <nav>
          <ul className="flex flex-col gap-4">
            <li>
              <Link
                className="flex items-center gap-4 transition-colors hover:text-gray-100"
                href="/"
              >
                <HomeIcon className="w-7 h-7" />
                <span>Home</span>
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center gap-4 transition-colors hover:text-gray-100"
                href="/search"
              >
                <MagnifyingGlassIcon className="w-7 h-7" />
                <span>Search</span>
              </Link>
            </li>

            <li className="mb-8">
              <Link
                className="flex items-center gap-4 transition-colors hover:text-gray-100"
                href="#your-library"
              >
                <BuildingLibraryIcon className="w-7 h-7" />
                <span>Your Library</span>
              </Link>
            </li>

            <li>
              <Link
                href="#create-playlist"
                className="flex items-center gap-4 transition-colors hover:text-gray-100"
              >
                <PlusCircleIcon className="w-7 h-7" />
                <span>Create Playlist</span>
              </Link>
            </li>
            <li>
              <Link
                href="#liked-songs"
                className="flex items-center gap-4 transition-colors hover:text-gray-100"
              >
                <HeartIcon className="w-7 h-7" />
                <span>Liked Songs</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
