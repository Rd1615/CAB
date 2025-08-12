import { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

// Pages
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CancelBooking from "./pages/Cancel";
import PaymentHistory from "./pages/Payments";
import AddCarRoute from "./pages/CarRoutes";
import SettingsPage from "./pages/setting";
import Drivers from "./pages/Drivers";
import Faq from "./pages/FAQ";
import AddPrice from "./pages/AddPrice";

import AllOrder from "./pages/Bookings/AllOrder";
import OneWayBooking from "./pages/Bookings/OneWayBooking";
import RoundTripBooking from "./pages/Bookings/RoundTrip";
import AirportBookings from "./pages/Bookings/AirportBookings";
import HourlyBooking from "./pages/Bookings/HourlyBooking";


// Layout
import Home from "./layout/Home";
import AddCar from "./pages/AddCar";

function App() {
  const { authUser, loading, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();
  
   useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Check login session on refresh
  useEffect(() => {
    checkAuth(); 
  }, []);

  if (loading) {
   return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-black">
      <BrowserRouter>
        <Routes>
          {/* Redirect root */}
          <Route
            path="/"
            element={<Navigate to={authUser ? "/home" : "/login"} />}
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/home" />}
          />

          {/* Protected Routes inside layout */}
            {authUser && (
              <Route path="/home" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />

                {/* Parent Booking Route */}
                <Route path="bookings">
                  {/* <Route index element={<Bookings />} />  Default bookings page */}
                  <Route path="allorder" element={<AllOrder />} />

                  <Route path="oneway" element={<OneWayBooking />} />
                  <Route path="roundtrip" element={<RoundTripBooking />} />

                  <Route path="airport" element={<AirportBookings />} />
                  <Route path="hourly" element={<HourlyBooking />} />
                </Route>

                <Route path="cancel" element={<CancelBooking />} />
                <Route path="payments" element={<PaymentHistory />} />
                <Route path="routes" element={<AddCarRoute />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="drivers" element={<Drivers />} />
                <Route path="faq" element={<Faq />} />
                <Route path="addprice" element={<AddPrice />} />
                <Route path="addcar" element={<AddCar/>}/>

                
              </Route>
            )}

        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
