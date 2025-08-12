import { Menu, LogOut } from "lucide-react";
import { useSidebarStore } from "../store/useSidebarStore"; 
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-base-100 shadow px-6 flex items-center justify-between z-30 md:ml-64">
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu size={24} className="text-base-content" />
      </button>

      <h1 className="text-lg font-semibold text-base-content">Cab Admin Panel</h1>

      <div className="flex items-center gap-4">
        <button onClick={handleLogout} className="p-2 rounded-full hover:bg-base-200 transition">
          <LogOut className="text-error" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
