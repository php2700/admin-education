// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function TestImonial() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
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

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Fetch list
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/testImonial`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch list");
    } finally {
      setLoading(false);
    }
  };

  // Add or Update
  const handleSubmit = async () => {
    const { title, description, address } = form;
    if (!title || !description || !address) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("address", address);
      if (image) formData.append("image", image);

      let res;
      if (editId) {
        formData.append("_id", editId);
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/testImonial`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Updated successfully");
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/testImonial`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Added successfully");
      }

      setForm({ title: "", description: "", address: "" });
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
    setForm({ title: "", description: "", address: "" });
    setImage(null);
    setPreview("");
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      address: item.address,
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
        `${import.meta.env.VITE_APP_URL}api/admin/testImonial/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Deleted successfully");
      fetchList();
    } catch {
      toast.error("Failed to delete");
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add About
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Image</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Description</th>
                <th className="px-4 py-3 border-b">Address</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">
                    <img
                      src={`${import.meta.env.VITE_APP_URL}${item.image}`}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{item.title}</td>
                  <td className="px-4 py-3 border-b">{item.description}</td>
                  <td className="px-4 py-3 border-b">{item.address}</td>
                  <td className="px-4 py-3 border-b">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-blue-600 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="text-red-600"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit About" : "Add About"}
            </h3>

            {/* Upload */}
            <div className="border-2 border-dashed border-blue-400 rounded-xl text-center mb-3 bg-blue-50">
              <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
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
  <div className="flex justify-center">
    <img
      src={preview}
      className="w-12 h-12 mb-4 rounded-xl border object-cover"
    />
  </div>
)}


            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-blue-600 text-white rounded-xl"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
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
