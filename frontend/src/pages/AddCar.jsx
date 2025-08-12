import React, { useState } from "react";
import { Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

const AddCarPage = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "",
    pricePerKm: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.number || !formData.type || !formData.pricePerKm) return;
    setCars((prev) => [
      ...prev,
      { id: prev.length + 1, ...formData },
    ]);
    setFormData({ name: "", number: "", type: "", pricePerKm: "", isActive: true });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cars</h1>

      {/* Form Card */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">Add Car</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Car Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Car Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Swift Dzire"
              className="input input-bordered w-full"
            />
          </div>

          {/* Car Type (Select) */}
          <div>
            <label className="block text-sm font-medium mb-1">Car Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Type</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="MUV">MUV</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>

          {/* Car Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Car Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="e.g. GJ01 AB 1234"
              className="input input-bordered w-full"
            />
          </div>

          {/* Price per KM */}
          <div>
            <label className="block text-sm font-medium mb-1">Price/KM</label>
            <input
              type="number"
              name="pricePerKm"
              value={formData.pricePerKm}
              onChange={handleChange}
              placeholder="e.g. 12"
              className="input input-bordered w-full"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-center md:justify-start">
            <button type="submit" className="btn btn-success w-full">
              Add Car
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Car Name</th>
              <th>Car Type</th>
              <th>Car Number</th>
              <th>Price/KM</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car.id}>
                <td>{index + 1}</td>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.type}</td>
                <td>{car.number}</td>
                <td>{car.pricePerKm}</td>
                <td>
                  {car.isActive ? (
                    <CheckCircle className="text-yellow-500 w-5 h-5" />
                  ) : (
                    <XCircle className="text-gray-400 w-5 h-5" />
                  )}
                </td>
                <td className="flex gap-2">
                  <button className="text-blue-500">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No cars added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCarPage;
