import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const HomePage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="m-20">
        <div className="flex space-x-5">
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        <Link href="/search">Search</Link>
      </div>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("spotify")}>Sign in</button>
    </>
  );
};

export default HomePage;
