import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  User,
  Mail,
  Phone,
  Shield,
  MapPin,
} from "lucide-react";

const Profile = () => {
  const { authUser } = useAuthStore();
  const formattedDate = new Date(authUser.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="p-5 text-4xl font-bold text-primary">Profile</h1>
      <div className="w-full mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-xl border border-base-200 p-8 mb-12 bg-base-100 transition">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-primary-content text-5xl font-bold shadow-lg">
              R
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-base-content mb-2">
                {authUser.fullName}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-3 py-1 bg-secondary text-secondary-content text-sm font-medium rounded-full">
                  Admin
                </span>
                <span className="text-sm text-base-content font-medium opacity-70 relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:mt-1">
                  Joined {formattedDate}
                </span>
              </div>

              <div className="flex items-center mt-4 gap-3">
                <div className="w-8 h-8 bg-base-200 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-base-content opacity-70" />
                </div>
                <span className="text-base-content opacity-80 text-sm">
                  {authUser.location}, India
                </span>
              </div>
            </div>

            {/* Edit button */}
            <button className="hidden md:block bg-gradient-to-r from-primary to-secondary text-primary-content px-6 py-3 rounded-xl font-medium transition transform hover:-translate-y-1 hover:shadow-lg">
              Edit Profile
            </button>
          </div>

          {/* Detail Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem label="Full Name" value={authUser.fullName} icon={<User />} />
            <ProfileItem label="Email" value={authUser.email} icon={<Mail />} />
            <ProfileItem label="Phone" value={`+91 ${authUser.phone}`} icon={<Phone />} />
            <ProfileItem label="Role" value="Admin" icon={<Shield />} />
          </div>

          {/* Mobile Edit Button */}
          <button className="mt-8 w-full md:hidden bg-gradient-to-r from-primary to-secondary text-primary-content px-6 py-3 rounded-xl font-medium transition transform hover:-translate-y-1 hover:shadow-lg">
            Edit Profile
          </button>
        </div>

        <div className="text-center text-base-content opacity-70 text-sm">
          Last updated: Today at 3:45 PM
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value, icon }) => (
  <div className="p-5 rounded-xl border border-base-200 bg-base-100 hover:bg-base-200 hover:translate-x-1 transition-all duration-300 cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-base-content opacity-70 mb-1">{label}</p>
        <p className="font-medium text-base-content">{value}</p>
      </div>
    </div>
  </div>
);

export default Profile;
