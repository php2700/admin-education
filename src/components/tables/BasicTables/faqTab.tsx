// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function FaqTab() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    points: [""],
  });

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("educationToken");

  // Handle text change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle points array
  const handlePointChange = (index, value) => {
    const updated = [...form.points];
    updated[index] = value;
    setForm({ ...form, points: updated });
  };

  const addPoint = () => {
    setForm({ ...form, points: [...form.points, ""] });
  };

  const removePoint = (index) => {
    const updated = [...form.points];
    updated.splice(index, 1);
    setForm({ ...form, points: updated });
  };

  // Fetch FAQ list
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/faq`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch FAQ list");
    } finally {
      setLoading(false);
    }
  };

  // Add / Update FAQ
  const handleSubmit = async () => {
    const { title, description, points } = form;

    if (!title || !description) {
      toast.error("All fields are required");
      return;
    }

    const cleanedPoints = points.filter((p) => p.trim() !== "");

    const finalData = {
      ...form,
      points: cleanedPoints,
    };

    try {
      setLoading(true);

      let res;
      if (editId) {
        const dataToSend = { ...finalData, _id: editId };
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/faq`,
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("FAQ Updated successfully");
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/faq`,
          finalData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("FAQ Added successfully");
      }

      setForm({ title: "", description: "", points: [""] });
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
    setForm({ title: "", description: "", points: [""] });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      points: item.points,
    });
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
        `${import.meta.env.VITE_APP_URL}api/admin/faq/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
          + Add FAQ
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
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Description</th>
                <th className="px-4 py-3 border-b">Points</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{item.title}</td>
                  <td className="px-4 py-3 border-b">{item.description}</td>
                  <td className="px-4 py-3 border-b">
                    {Array.isArray(item?.points) && item.points.length > 0 ? (
                      <ul className="list-disc ml-5">
                        {item.points.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    ) : (
                      "Null"
                    )}
                  </td>

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
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit FAQ" : "Add FAQ"}
            </h3>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full mb-3 p-3 border rounded-xl"
            />

            <label className="font-semibold mb-1 block">Points:</label>
            {form.points.map((p, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={p}
                  onChange={(e) => handlePointChange(idx, e.target.value)}
                  className="flex-1 p-2 border rounded-xl"
                  placeholder={`Point ${idx + 1}`}
                />
                {idx > 0 && (
                  <button
                    className="text-red-600"
                    onClick={() => removePoint(idx)}
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}

            <button onClick={addPoint} className="text-blue-600 text-sm mb-3">
              + Add Point
            </button>

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
