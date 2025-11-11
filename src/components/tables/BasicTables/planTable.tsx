// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";

export default function planTable() {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    duration: "month",
    feature: [""],
  });
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("educationToken");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle feature input
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...form.feature];
    updatedFeatures[index] = value;
    setForm({ ...form, feature: updatedFeatures });
  };

  // Add new feature input
  const addFeatureField = () => {
    setForm({ ...form, feature: [...form.feature, ""] });
  };

  // Remove feature input
  const removeFeatureField = (index) => {
    const updatedFeatures = form.feature.filter((_, i) => i !== index);
    setForm({ ...form, feature: updatedFeatures });
  };

  // Fetch plan list
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/plan`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch plan data");
    } finally {
      setLoading(false);
    }
  };

  // Add / Edit plan
  const handleSubmit = async () => {
    const { name, amount, duration, feature } = form;
    if (!name || !amount || !duration || feature.some((f) => !f.trim()))
      return toast.error("All fields are required");

    try {
      setLoading(true);
      const payload = { name, amount, duration, feature };
      let res;
      if (editId) {
        payload._id = editId;
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/plan/`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/plan`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      toast.success(res.data.message || "Success!");
      resetForm();
      fetchList();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/plan/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Deleted successfully");
      fetchList();
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setConfirmModal(false);
      setDeleteId(null);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      amount: "",
      duration: "month",
      feature: [""],
    });
    setEditId(null);
    setShowModal(false);
  };

  const openEdit = (item) => {
    setForm({
      name: item.name,
      amount: item.amount,
      duration: item.duration,
      feature: item.feature || [""],
    });
    setEditId(item._id);
    setShowModal(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">plan Plans</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Plan
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No plans found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Amount</th>
                <th className="px-4 py-3 border-b">Duration</th>
                <th className="px-4 py-3 border-b">Features</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{item.name}</td>
                  <td className="px-4 py-3 border-b">₹{item.amount}</td>
                  <td className="px-4 py-3 border-b capitalize">
                    {item.duration}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <ul className="list-disc list-inside text-gray-700">
                      {item.feature?.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
              onClick={resetForm}
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit Plan" : "Add New Plan"}
            </h3>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter plan name"
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />

            <input
              type="text"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />

            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            >
              <option value="month">Month</option>
              <option value="quarter">Quarter</option>
              <option value="half year">Half Year</option>
              <option value="year">Year</option>
            </select>

            <div className="mb-3">
              <label className="block mb-2 font-medium">Features</label>
              {form.feature.map((f, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                  />
                  {form.feature.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeatureField}
                className="text-blue-600 text-sm mt-1 flex items-center gap-1"
              >
                <FaPlus /> Add Feature
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this plan?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
