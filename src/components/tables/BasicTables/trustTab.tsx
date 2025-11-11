// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

export default function TrustTable() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [list, setList] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const token = localStorage.getItem("educationToken");

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Fetch trust list
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/trust`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Add / Edit
  const handleSubmit = async () => {
    if (!form.title || !form.description)
      return toast.error("All fields are required");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (image) formData.append("image", image);
      if (editId) formData.append("_id", editId);

      let res;
      if (editId) {
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/trust`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/trust`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
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

  // Delete confirmation
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/trust/${deleteId}`,
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
    setForm({ title: "", description: "" });
    setImage(null);
    setPreview("");
    setEditId(null);
    setShowModal(false);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
    });
    setPreview(`${import.meta.env.VITE_APP_URL}${item.image}`);
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
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No items found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Icon</th>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Description</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${import.meta.env.VITE_APP_URL}${item.image}`}
                      alt="icon"
                      className="w-10 h-10 object-contain"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{item.title}</td>
                  <td className="px-4 py-3 border-b">
                    {item.description.length > 80
                      ? item.description.slice(0, 80) + "..."
                      : item.description}
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
              {editId ? "Edit Trust Item" : "Add Trust Item"}
            </h3>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title..."
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description..."
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
              rows={3}
            ></textarea>

            <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 text-center mb-3">
              <label htmlFor="fileInput" className="cursor-pointer">
                <FiUploadCloud className="text-3xl text-blue-500 mx-auto mb-2" />
                <span className="text-sm text-gray-600">
                  {image ? "Change Icon" : "Click to Upload Icon"}
                </span>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-12 h-12 object-contain rounded mx-auto mb-3"
              />
            )}

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
              Are you sure you want to delete this item?
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
