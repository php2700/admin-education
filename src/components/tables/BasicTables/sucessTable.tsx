// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

export default function StoryTable() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    designation: "",
    rating: "",
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

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Fetch story list
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/story`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  };

  // Add or Edit story
  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.designation || !form.rating)
      return toast.error("All fields are required");

    if (form.rating < 0 || form.rating > 5)
      return toast.error("Rating must be between 0 and 5");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("designation", form.designation);
      formData.append("rating", form.rating);
      if (image) formData.append("image", image);
      if (editId) formData.append("_id", editId);

      let res;
      if (editId) {
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/story`,
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
          `${import.meta.env.VITE_APP_URL}api/admin/story`,
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
        `${import.meta.env.VITE_APP_URL}api/admin/story/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Story deleted successfully");
      fetchList();
    } catch (err) {
      toast.error("Failed to delete story");
    } finally {
      setConfirmModal(false);
      setDeleteId(null);
    }
  };

  const resetForm = () => {
    setForm({ name: "", description: "", designation: "", rating: "" });
    setImage(null);
    setPreview("");
    setEditId(null);
    setShowModal(false);
  };

  const openEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      designation: item.designation,
      rating: item.rating,
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
      <div>
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
          <p className="text-center text-gray-500">No stories found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 border-b">#</th>
                  <th className="px-4 py-3 border-b">Image</th>
                  <th className="px-4 py-3 border-b">Name</th>
                  <th className="px-4 py-3 border-b">Designation</th>
                  <th className="px-4 py-3 border-b">Description</th>
                  <th className="px-4 py-3 border-b text-center">Rating</th>
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
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3 border-b">{item.name}</td>
                    <td className="px-4 py-3 border-b">{item.designation}</td>
                    <td className="px-4 py-3 border-b">
                      {item.description.length > 70
                        ? item.description.slice(0, 70) + "..."
                        : item.description}
                    </td>
                    <td className="px-4 py-3 border-b text-center text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < item.rating
                              ? "inline text-yellow-500"
                              : "inline text-gray-300"
                          }
                        />
                      ))}
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
              {editId ? "Edit Story" : "Add Story"}
            </h3>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name..."
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="Enter designation..."
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description..."
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
              rows={4}
            ></textarea>

            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="Rating (0-5)"
              min="0"
              max="5"
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />

            <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 text-center mb-3">
              <label htmlFor="fileInput" className="cursor-pointer">
                <FiUploadCloud className="text-3xl text-blue-500 mx-auto mb-2" />
                <span className="text-sm text-gray-600">
                  {image ? "Change Image" : "Click to Upload Image"}
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
                className="w-16 h-16 object-cover rounded-full mx-auto mb-3"
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
              Are you sure you want to delete this story?
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
