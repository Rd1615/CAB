import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useCarRouteStore = create((set)=> ({
    carRoutes: [],
    currentCarRoute: null,

    getCarRoute: async() => {
        try {
            const res = await axiosInstance.get('city/');
            set({ carRoutes: res.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch drivers");
        }
    },

    addCarRoute : async (city) => {
        try {
            const res = await axiosInstance.post('city/add-city',{city});
            set((state) =>({
                carRoutes : [...state.carRoutes,res.data]
            }));
            toast.success("Car Route added successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to Add Car Route");
        }
    },

    deleteCarRoute : async (id) => {
        try {
            await axiosInstance.put('city/delete-city',{id})
            toast.success("Car Route deleted successfully");
            await useCarRouteStore.getState().getCarRoute();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to Add Car Route");
        }
    },

    updateCityStatus : async (id) => {
        try {
            await axiosInstance.put('city/update-status',{id});
            toast.success("city status updated");
            await useCarRouteStore.getState().getCarRoute();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status Car Route");
        }
    },

}))