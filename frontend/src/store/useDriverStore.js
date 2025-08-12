import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useDriverStore = create((set,get) => ({
  drivers: [],
  currentDriver: null,

 // Fetch all drivers
  getDriver: async () => {
    try {
      const res = await axiosInstance.get("driver/");
      set({ drivers: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch drivers");
    }
  },

//   Add New Driver
  addDriver: async (driver,) => {
    try {
        const res = await axiosInstance.post("driver/newdriver",driver);
        set((state) =>({
            drivers : [...state.drivers,res.data]
        }));
        toast.success("Driver added successfully");
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch drivers");
        console.log("error in AddDriver ",error);
    }
  },

//   Update Driver
  updateDriver: async (driver) => {
    try {
      const res = await axiosInstance.put("driver/update", driver);
      toast.success("Driver updated successfully");
      get().getDriver(); // Refresh list after update
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update driver");
    }
  },
  
// ✅ store/useDriverStore.js
deleteDriver: async (id) => {
  try {
    await axiosInstance.post("driver/delete", {id} );
    toast.success("Driver deleted successfully");
  } catch (error) {
    console.error("Delete error:", error);
    toast.error(error?.response?.data?.message || "Failed to delete driver");
  }
},

toggleDriverStatus: async (id, isActive) => {
  try {
    await axiosInstance.put("/driver/update-status", {
      id,
      isActive
    });
    toast.success("Driver status updated");
    await useDriverStore.getState().getDriver();
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to toggle status");
  }
}

}));
