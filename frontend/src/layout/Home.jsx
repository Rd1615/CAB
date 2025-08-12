import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar />
        <div className="p-4 pt-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
