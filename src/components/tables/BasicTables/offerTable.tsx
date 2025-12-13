// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function OfferTable() {
  const [form, setForm] = useState({
    type: "",
    title: "",
    description: "",
    expireDate: "",
  });
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const token = localStorage.getItem("educationToken");
  const [modalError, setModalError] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const typeOptions = ["New", "Hot Deal", "Referral"];

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch all offers
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/offers`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch offers");
    } finally {
      setLoading(false);
    }
  };

  // Add or edit offer
  const handleSubmit = async () => {
    if (!form.type || !form.title || !form.description || !form.expireDate) {
      setModalError("All fields are required");
      setTimeout(() => {
        setModalError("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      let res;
      if (editId) {
        form._id = editId;
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/offers/`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/offers`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setModalMessage(editId ? `Added Success! ` : `Edit Successfully`);
      setTimeout(() => {
        setForm({ type: "", title: "", description: "", expireDate: "" });
        setEditId(null);
        setShowModal(false);
        fetchList();
        setModalMessage("");
      }, 1500);
    } catch (err) {
      setModalError(
        err?.response.data?.message || err?.message || "Failed to save benefit."
      );
      setTimeout(() => {
        setModalError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // Delete confirmation
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/offers/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Offer deleted successfully");
      fetchList();
    } catch (err) {
      toast.error("Failed to delete offer");
    } finally {
      setConfirmModal(false);
      setDeleteId(null);
    }
  };

  // Open modals
  const openAdd = () => {
    setForm({ type: "", title: "", description: "", expireDate: "" });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm({
      type: item.type,
      title: item.title,
      description: item.description,
      expireDate: item.expireDate?.slice(0, 10),
    });
    setEditId(item._id);
    setShowModal(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="bg-gray-50 p-8">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="text-center bg-red-100 text-red-700 font-medium p-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        {message && !error && (
          <div className="text-center bg-green-100 text-green-700 font-medium p-3 rounded-xl mb-4">
            {message}
          </div>
        )}

        {/* Table List */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : list.length === 0 ? (
          <p className="text-center text-gray-500">No offers found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 border-b text-gray-700">#</th>
                  <th className="px-4 py-3 border-b text-gray-700">Type</th>
                  <th className="px-4 py-3 border-b text-gray-700">Title</th>
                  <th className="px-4 py-3 border-b text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 border-b text-gray-700">
                    Expire Date
                  </th>
                  <th className="px-4 py-3 border-b text-center text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">{index + 1}</td>
                    <td className="px-4 py-3 border-b capitalize">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 border-b">{item.title}</td>
                    <td className="px-4 py-3 border-b">
                      {item.description.length > 80
                        ? item.description.slice(0, 80) + "..."
                        : item.description}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {new Date(item.expireDate).toLocaleDateString()}
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editId ? "Edit Offer" : "Add New Offer"}
            </h3>
            {modalError && (
              <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-center">
                {modalError}
              </div>
            )}

            {modalMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 text-center">
                {modalMessage}
              </div>
            )}
            {/* Type Dropdown */}
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select Type</option>
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Title Input */}
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title..."
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />

            {/* Description Input */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description..."
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
              rows={4}
            ></textarea>

            {/* Expire Date */}
            <input
              type="date"
              name="expireDate"
              value={form.expireDate}
              onChange={handleChange}
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this offer?
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
