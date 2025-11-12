// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function BlogTab() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("educationToken");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Fetch all blog posts
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/blog`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch blog list");
    } finally {
      setLoading(false);
    }
  };

  // Add or Update blog
  const handleSubmit = async () => {
    const { title, description } = form;
    if (!title || !description) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      let res;
      if (editId) {
        formData.append("_id", editId);
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/blog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Blog updated successfully");
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/blog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Blog added successfully");
      }

      setForm({ title: "", description: "" });
      setImage(null);
      setPreview("");
      setEditId(null);
      setShowModal(false);
      fetchList();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setForm({ title: "", description: "" });
    setImage(null);
    setPreview("");
    setEditId(null);
    setShowModal(true);
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

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/blog/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Blog deleted successfully");
      fetchList();
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setConfirmModal(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Blog
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No blog posts found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Image</th>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Description</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${import.meta.env.VITE_APP_URL}${item.image}`}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-gray-800">
                    {item.title}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600 truncate max-w-xs">
                    {item.description}
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

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editId ? "Edit Blog" : "Add Blog"}
            </h3>

            {/* Upload */}
            <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 text-center mb-3 bg-blue-50 hover:bg-blue-100">
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center"
              >
                <FiUploadCloud className="text-3xl text-blue-500 mb-2" />
                <span className="text-sm text-gray-700 font-medium">
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
              <div className="flex justify-center mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full object-cover rounded-xl border"
                />
              </div>
            )}

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter blog description"
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl h-32 resize-none"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this blog?
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
