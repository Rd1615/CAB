import React, { useState } from "react";

const AddPrice = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [prices, setPrices] = useState([]);
  const [formData, setFormData] = useState(initialFormData());

  function initialFormData() {
    return {
      from: "",
      to: "",
      airport: "",
      city: "",
      hours: "",
      carType: "",
      price: "",
      priceType: "Fixed",
    };
  }

  const handleFormChange = (type) => {
    setSelectedForm(type);
    setFormData(initialFormData());
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPrices([...prices, { ...formData, type: selectedForm }]);
    setFormData(initialFormData());
  };

  const handleDelete = (index) => {
    const newPrices = prices.filter((_, i) => i !== index);
    setPrices(newPrices);
  };

  const renderPriceTypeSelector = () => (
    <div className="md:col-span-2">
      <label className="label font-semibold">Price Type</label>
      <select
        className="select select-bordered w-full"
        name="priceType"
        value={formData.priceType}
        onChange={handleInputChange}
      >
        <option value="Fixed">Fixed</option>
        <option value="Negotiable">Negotiable</option>
      </select>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Button Controls */}
      <div className="flex gap-4 flex-wrap">
        {["one_way", "round_trip", "airport", "hour"].map((type) => (
          <button
            key={type}
            className={`btn ${selectedForm === type ? "btn-primary" : ""}`}
            onClick={() => handleFormChange(type)}
          >
            {type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Forms */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        {selectedForm === "one_way" && (
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold text-primary">One Way Form</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-semibold">From City</label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  placeholder="Enter From City"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label font-semibold">To City</label>
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="Enter To City"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter Price"
                  className="input input-bordered w-full"
                />
              </div>
              {renderPriceTypeSelector()}
            </div>
            <div className="text-right">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        )}

        {selectedForm === "round_trip" && (
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold text-primary">Round Trip Form</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-semibold">From City</label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label font-semibold">To City</label>
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label font-semibold">Return Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              {renderPriceTypeSelector()}
            </div>
            <div className="text-right">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        )}

        {selectedForm === "airport" && (
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold text-primary">Airport Form</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-semibold">From City</label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label font-semibold">Airport Name</label>
                <input
                  type="text"
                  name="airport"
                  value={formData.airport}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label font-semibold">Transfer Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              {renderPriceTypeSelector()}
            </div>
            <div className="text-right">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        )}

        {selectedForm === "hour" && (
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-bold text-primary">Hourly Price Form</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label font-semibold">Hours</label>
                <input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label font-semibold">Car Type</label>
                <div className="flex gap-4 mt-1">
                  {["Petrol", "Diesel", "CNG"].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="carType"
                        value={type}
                        checked={formData.carType === type}
                        onChange={handleInputChange}
                        className="radio radio-sm"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              {renderPriceTypeSelector()}
            </div>
            <div className="text-right pt-4">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        )}
      </div>

      {/* Table Display */}
      <div className="overflow-x-auto bg-base-200 p-4 rounded-xl">
        <h1 className="text-2xl font-bold text-primary pb-2">City Route Price</h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>From</th>
              <th>To / Airport</th>
              <th>Hours</th>
              <th>Car</th>
              <th>Price</th>
              <th>Price Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prices.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center text-base-content/60 py-4">
                  No data yet.
                </td>
              </tr>
            ) : (
              prices.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.type}</td>
                  <td>{p.from || p.city}</td>
                  <td>{p.to || p.airport || "-"}</td>
                  <td>{p.hours || "-"}</td>
                  <td>{p.carType || "-"}</td>
                  <td>{p.price}</td>
                  <td>{p.priceType}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPrice;
