import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDriverStore } from "../store/useDriverStore";

const emptyForm = { fullName: "", mobile: "", carName: "", carType: "", carNumber: "" };

export default function Drivers() {
  const { drivers, getDriver, addDriver, updateDriver, deleteDriver } = useDriverStore();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { getDriver(); }, [getDriver]);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (Object.values(form).some(v => !v)) return;
    const payload = { ...form, ...(editId && { id: editId }) };
    try {
      editId ? await updateDriver(payload) : await addDriver(payload);
      await getDriver();
      setForm(emptyForm);
      setEditId(null);
    } catch (err) { console.error("Submission failed:", err); }
  };

  const handleEdit = d => { setForm({ ...d }); setEditId(d.id); };
  const cancelEdit = () => { setForm(emptyForm); setEditId(null); };
  const toggleStatus = (id, status) => useDriverStore.getState().toggleDriverStatus(id, status === 1 ? 0 : 1);
  const handleDelete = async id => { await deleteDriver(id); await getDriver(); };

  const fields = [
    { label: "Full Name", name: "fullName", placeholder: "Enter driver's full name" },
    { label: "Mobile Number", name: "mobile", placeholder: "e.g. 9876543210" },
    { label: "Car Name", name: "carName", placeholder: "e.g. Swift Dzire" },
    { label: "Car Type", name: "carType", placeholder: "e.g. 4-Seater, SUV" },
    { label: "Car Number", name: "carNumber", placeholder: "e.g. DL01AB1234" },
  ];

  return (
    <div className="p-4 md:p-6 font-[Poppins]">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Drivers</h1>

      {/* Form */}
      <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-500 mb-4">
          {editId ? "Edit Driver" : "Add Driver"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map(f => (
            <div key={f.name} className="form-control">
              <label className="label"><span className="label-text font-medium">{f.label}</span></label>
              <input
                type="text"
                name={f.name}
                placeholder={f.placeholder}
                value={form[f.name]}
                onChange={handleChange}
                className={`input input-bordered w-full ${f.name === "carNumber" ? "uppercase" : ""}`}
              />
            </div>
          ))}
          <div className="form-control md:col-span-1 col-span-full flex flex-col md:flex-row items-center gap-4">
            <button type="submit" className="btn btn-success w-full md:w-auto">
              {editId ? "Update Driver" : "Add Driver"}
            </button>
            {editId && <button type="button" onClick={cancelEdit} className="btn btn-outline w-full md:w-auto">Cancel</button>}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto rounded-xl shadow border border-base-300 bg-base-100">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200 text-base-content/70">
            <tr>
              <th>#</th><th>ID</th><th>Name</th><th>Mobile</th><th>Car Name</th>
              <th>Car Type</th><th>Car Number</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{d.id}</td>
                <td>{d.fullName}</td>
                <td>{d.mobile}</td>
                <td>{d.carName}</td>
                <td>{d.carType}</td>
                <td>{d.carNumber}</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={d.isActive === 1}
                    onChange={() => toggleStatus(d.id, d.isActive)}
                  />
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:scale-110 transition" onClick={() => handleEdit(d)}>
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:scale-110 transition" disabled onClick={() => handleDelete(d.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr>
                <td colSpan={9} className="py-6 text-center text-base-content/60">No drivers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
