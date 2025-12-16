// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye, FaPlus, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function TermsServiceTab() {
  // State structure updated for points objects
  const [form, setForm] = useState({
    title: "",
    description: "",
    points: [{ subtitle: "", desc: "" }], // Array of objects
  });

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState(null);

  const token = localStorage.getItem("educationToken"); // Adjust token key as needed

  // Handle Main Fields (Title/Description)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Specific Point Change (Subtitle or Desc)
  const handlePointChange = (index, field, value) => {
    const updatedPoints = [...form.points];
    updatedPoints[index][field] = value;
    setForm({ ...form, points: updatedPoints });
  };

  // Add a new empty point
  const addPoint = () => {
    setForm({ ...form, points: [...form.points, { subtitle: "", desc: "" }] });
  };

  // Remove a specific point
  const removePoint = (index) => {
    const updatedPoints = [...form.points];
    updatedPoints.splice(index, 1);
    setForm({ ...form, points: updatedPoints });
  };

  // Fetch List from API
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/terms`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setList(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch Terms");
    } finally {
      setLoading(false);
    }
  };

  // Submit Form (Add or Update)
  const handleSubmit = async () => {
    const { title, description, points } = form;

    if (!title) {
      toast.error("Title is required");
      return;
    }

    // Filter out points that have no description to keep DB clean
    const cleanedPoints = points.filter((p) => p.desc.trim() !== "");

    const finalData = {
      ...form,
      points: cleanedPoints,
    };

    try {
      setLoading(true);
      if (editId) {
        // Update
        await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/terms`,
          { ...finalData, _id: editId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Updated successfully");
      } else {
        // Create
        await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/terms`,
          finalData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Added successfully");
      }
      // Reset Form
      setForm({ title: "", description: "", points: [{ subtitle: "", desc: "" }] });
      setEditId(null);
      setShowModal(false);
      fetchList();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setForm({ title: "", description: "", points: [{ subtitle: "", desc: "" }] });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    // If points exist, load them. If empty, provide one empty slot.
    const editPoints = item.points && item.points.length > 0 
      ? item.points 
      : [{ subtitle: "", desc: "" }];

    setForm({
      title: item.title,
      description: item.description,
      points: editPoints,
    });
    setEditId(item._id);
    setShowModal(true);
  };

  const openView = (item) => {
    setViewData(item);
    setViewModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/terms/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Deleted");
      fetchList();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setConfirmModal(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Terms & Service Management</h2>
        <button onClick={openAdd} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
          <FaPlus /> Add New Section
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><span className="text-gray-500 text-lg">Loading data...</span></div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Intro Preview</th>
                <th className="px-6 py-4">Sub-Points</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500">No terms added yet.</td>
                </tr>
              )}
              {list.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-800">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.description ? item.description.substring(0, 60) + "..." : <span className="italic text-gray-400">No intro</span>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-bold">
                        {item.points?.length || 0} Points
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <button onClick={() => openView(item)} className="text-green-600 hover:text-green-800" title="View"><FaEye size={18} /></button>
                    <button onClick={() => openEdit(item)} className="text-blue-600 hover:text-blue-800" title="Edit"><FaEdit size={18} /></button>
                    <button onClick={() => handleDeleteClick(item._id)} className="text-red-500 hover:text-red-700" title="Delete"><FaTrashAlt size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn">
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{editId ? "Edit Term Section" : "Add Term Section"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-500 text-2xl"><FaTimes /></button>
            </div>

            <div className="p-6 overflow-y-auto">
              {/* Main Title */}
              <div className="mb-5">
                <label className="block text-sm font-bold text-gray-700 mb-2">Section Title <span className="text-red-500">*</span></label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. FEES AND PAYMENTS"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Main Description */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Main Description (Intro)</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="The introductory paragraph for this section..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Dynamic Points Section */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-gray-700">Detailed Points / Sub-sections</label>
                    <button 
                        onClick={addPoint} 
                        className="text-xs flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition"
                    >
                      <FaPlus /> Add Point
                    </button>
                </div>
                
                {form.points.map((p, idx) => (
                  <div key={idx} className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative group">
                    {/* Delete Button for Point */}
                    {form.points.length > 0 && (
                      <button 
                        onClick={() => removePoint(idx)} 
                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition"
                        title="Remove Point"
                      >
                        <FaTimes size={16} />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Subtitle Input */}
                        <div className="md:col-span-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Highlight/Subtitle (Optional)</label>
                            <input
                                type="text"
                                value={p.subtitle}
                                onChange={(e) => handlePointChange(idx, "subtitle", e.target.value)}
                                placeholder="e.g. 100% Guarantee"
                                className="w-full p-2 border border-gray-300 rounded text-sm font-medium focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Description Input */}
                        <div className="md:col-span-2">
                             <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Point Description</label>
                            {/* <textarea
                                value={p.desc}
                                onChange={(e) => handlePointChange(idx, "desc", e.target.value)}
                                placeholder="The details of this specific point..."
                                rows={2}
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:border-blue-500 outline-none"
                            /> */}
                            <ReactQuill
  value={p.desc}
  onChange={(value) =>
    handlePointChange(idx, "desc", value)
  }
  modules={{
  toolbar: [
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
}}
  placeholder="The details of this specific point..."
  className="bg-white rounded"
/>
                        </div>
                    </div>
                  </div>
                ))}
                
                {form.points.length === 0 && (
                    <div className="text-center py-4 text-gray-400 text-sm">No sub-points added. Click 'Add Point' if needed.</div>
                )}
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">Cancel</button>
              <button onClick={handleSubmit} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {viewModal && viewData && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl p-0 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b px-8 py-4 flex justify-between items-center z-10">
                <h2 className="text-lg font-bold text-gray-500 uppercase tracking-wide">Preview</h2>
                <button onClick={() => setViewModal(false)} className="text-gray-400 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            
            <div className="p-8">
                {/* Simulated Web View */}
                <h2 className="text-2xl font-bold text-blue-600 uppercase mb-4">{viewData.title}</h2>
                
                {/* Main Desc */}
                {viewData.description && (
                    <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">{viewData.description}</p>
                )}

                {/* Sub Points Loop */}
                <div className="space-y-4">
                    {viewData.points?.map((p, i) => (
                        <div key={i} className="text-gray-700 leading-relaxed">
                            {/* Logic: If subtitle exists, bold it and add space. */}
                            {p.subtitle && (
                                <span className="font-bold text-gray-900">{p.subtitle} </span>
                            )}
                            <span>{p.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirm Delete Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
                <div className="text-red-500 text-4xl mb-3 flex justify-center"><FaTrashAlt /></div>
                <h3 className="text-lg font-bold mb-2">Delete Section?</h3>
                <p className="text-gray-500 mb-6 text-sm">Are you sure you want to remove this section? This action cannot be undone.</p>
                <div className="flex justify-center gap-3">
                    <button onClick={() => setConfirmModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                    <button onClick={handleConfirmDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Yes, Delete</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}