import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useCarStore = create((set,get) => ({
    carList: [],
    currentCar: null,

    getAllCar: async () => {
        try {
            const res = await axiosInstance.get('cars/');
            set({carList:res.data});
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch car List");
            console.log("error in getCar Store ",error);
        }
    },

     addNewCar: async (car) => {
        try {
            await axiosInstance.post('cars/add-car',car);
            get().getAllCar();
            toast.success("car added successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add new Car");
            console.log("error in addNewCar Store ",error);
        }
     },

     updateCar: async (car) => {
        try {
            await axiosInstance.put('cars/update-car',car);
            get().getAllCar();
            toast.success("car detail Update successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update Car");
            console.log("error in updateCar Store ",error);
        }
     },

     carStatusChange: async (id) => {
        try {
            await axiosInstance.put('cars/update-car-status',{id});
            get().getAllCar();
            toast.success("car status Update successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to change car status");
            console.log("error in carStatusChange Store ",error);
        }
     },

     deleteCar: async (id) => {
        try {
            console.log(id);
            await axiosInstance.put('cars/delete-car',{id});
            get().getAllCar();
            toast.success("car detail deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to Delete car");
            console.log("error in deleteCar Store ",error);
        }
     },

}))  