import React, { useState } from "react";
import user from "../img/User.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BookOpen,
  ChevronDown,
  ChevronRight,
  XCircle,
  CreditCard,
  Route,
  LogOut,
  X,
  Settings,
  IdCard,
  IndianRupee,
  CircleQuestionMark,
  Car,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useSidebarStore } from "../store/useSidebarStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore();
  const { isOpen, close } = useSidebarStore();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      close();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-screen bg-base-200 text-base-content z-40 pt-5 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Mobile close button */}
      <div className="flex justify-end px-4 md:hidden">
        <button onClick={close}>
          <X size={24} className="text-base-content" />
        </button>
      </div>

      {/* User info */}
      <div className="text-center mt-2 border-b border-base-300 pb-4">
        <img src={user} alt="user" className="h-20 w-20 rounded-full mx-auto" />
        <div className="mt-2 font-semibold">{authUser.fullName}</div>
      </div>

      {/* Scrollable links */}
      <div className="mt-6 space-y-3 px-2 flex-1 overflow-y-auto no-scrollbar">
        <Link to="/home" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link to="/home/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <User size={18} />
          <span>My Profile</span>
        </Link>

        {/* My Booking Dropdown */}
        <button
          onClick={() => setIsBookingOpen(!isBookingOpen)}
          className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-base-300 w-full"
        >
          <div className="flex items-center gap-3">
            <BookOpen size={18} />
            <span>My Booking</span>
          </div>
          {isBookingOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        {isBookingOpen && (
          <div className="ml-10 mt-1 space-y-2">
            <Link to="/home/bookings/allorder" className="block px-2 py-1 rounded hover:bg-base-300">All Order</Link>
            <Link to="/home/bookings/oneway" className="block px-2 py-1 rounded hover:bg-base-300">One-Way</Link>
            <Link to="/home/bookings/roundtrip" className="block px-2 py-1 rounded hover:bg-base-300">Round-Trip</Link>
            <Link to="/home/bookings/airport" className="block px-2 py-1 rounded hover:bg-base-300">Airport Transfers</Link>
            <Link to="/home/bookings/hourly" className="block px-2 py-1 rounded hover:bg-base-300">Hourly Rentals</Link>
          </div>
        )}

        <Link to="/home/drivers" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <IdCard size={18} />
          <span>Drivers</span>
        </Link>

        <Link to="/home/addprice" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <IndianRupee size={18} />
          <span>Add Price</span>
        </Link>

        <Link to="/home/addcar" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <Car size={18} />
          <span>Add Car</span>
        </Link>

        <Link to="/home/cancel" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <XCircle size={18} />
          <span>Cancel Booking</span>
        </Link>

        <Link to="/home/payments" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <CreditCard size={18} />
          <span>Payment History</span>
        </Link>

        <Link to="/home/routes" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <Route size={18} />
          <span>City / Routes</span>
        </Link>

        <Link to="/home/faq" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <CircleQuestionMark size={18} />
          <span>FAQ</span>
        </Link>

        <Link to="/home/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full">
          <Settings size={18} />
          <span>Setting</span>
        </Link>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 w-full text-error"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
