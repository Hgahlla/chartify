import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen text-gray-300 bg-spotify-gray ">
      <Sidebar />
      <Navbar />
      <main className="bg-blue-100">{children}</main>
    </div>
  );
};

export default Layout;
