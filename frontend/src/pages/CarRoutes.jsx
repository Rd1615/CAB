import React, { useState, useEffect } from "react";
import { MapPin, Trash2 } from "lucide-react";
import { useCarRouteStore } from "../store/useCarRouteStore";

const CityList = () => {
  const [newCity, setNewCity] = useState("");
  const {
    carRoutes,
    getCarRoute,
    addCarRoute,
    deleteCarRoute,
    updateCityStatus,
  } = useCarRouteStore();

  useEffect(() => {
    getCarRoute();
  }, [getCarRoute]);

  const handleAddCity = async (e) => {
    e.preventDefault();
    if (!newCity) return;
    await addCarRoute(newCity);
    setNewCity("");
  };

  const toggleStatus = async (id) => {
    updateCityStatus(id);
  };

  const deleteCity = (id) => {
    deleteCarRoute(id);
  };

  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6">City List</h1>

      {/* One-line Add City Form */}
      <form
        onSubmit={handleAddCity}
        className="flex items-center gap-3 mb-6 max-w-xl"
      >
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-3 py-2 border rounded-lg bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90"
        >
          Add City
        </button>
      </form>

      {/* City Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="w-full text-left border border-base-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-base-200 text-sm text-base-content/70">
              <th className="py-3 px-4 w-12">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4 text-center w-24">Status</th>
              <th className="py-3 px-4 text-center w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            {carRoutes.map((city, index) => (
              <tr
                key={city.id}
                className={`border-t border-base-300 transition-colors hover:bg-base-200/60 ${
                  index % 2 === 0 ? "bg-base-100" : "bg-base-200/40"
                }`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  {city.city}
                </td>
                <td className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={!!city.isActive}
                    onChange={() => toggleStatus(city.id)}
                    className="checkbox checkbox-primary"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => deleteCity(city.id)}
                    className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {carRoutes.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-base-content/60 italic"
                >
                  No cities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CityList;
