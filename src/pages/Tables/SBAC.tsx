// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SbacTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    assessmentHeading: "",
    assessmentPoints: [""],
    accessHeading: "",
    accessPoints: [""]
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/sbac-test`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.data) {
        setForm({ ...initialState, ...res.data.data });
      }
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Handlers ---
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Generic List Handler (For Assessment & Access lists)
  const handleListChange = (index, value, listName) => {
    const updated = [...form[listName]];
    updated[index] = value;
    setForm({ ...form, [listName]: updated });
  };
  const addListItem = (listName) => setForm({ ...form, [listName]: [...form[listName], ""] });
  const removeListItem = (index, listName) => {
    const updated = form[listName].filter((_, i) => i !== index);
    setForm({ ...form, [listName]: updated });
  };

  // --- Actions ---
  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/sbac-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("SBAC Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL SBAC data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/sbac-test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted Successfully");
      setForm(initialState);
    } catch (err) {
      toast.error("Delete Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl border-t-4 border-blue-600 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">SBAC Page Admin</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. SBAC TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- 2. ABOUT SBAC --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">About SBAC</h3>
          <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading (e.g. About SBAC)" className="w-full mb-3 p-2 border rounded" />
          <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="Description..." rows={5} className="w-full p-2 border rounded" />
        </div>

        {/* --- 3. ASSESSMENT DETAILS (LIST) --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Assessment Details</h3>
          <input name="assessmentHeading" value={form.assessmentHeading} onChange={handleChange} placeholder="Heading (e.g. SBAC Assessment Details)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold">Bullet Points:</label>
          {form.assessmentPoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2 mt-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'assessmentPoints')} className="w-full p-2 border rounded" placeholder="e.g. Grades Assessed: 3-8..." />
              <button onClick={()=>removeListItem(i, 'assessmentPoints')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('assessmentPoints')} className="text-blue-600 text-sm mt-1">+ Add Detail</button>
        </div>

        {/* --- 4. ACCESSIBILITY RESOURCES (LIST) --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Accessibility Resources</h3>
          <input name="accessHeading" value={form.accessHeading} onChange={handleChange} placeholder="Heading (e.g. Accessibility Resources)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold">Bullet Points:</label>
          {form.accessPoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2 mt-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'accessPoints')} className="w-full p-2 border rounded" placeholder="e.g. Universal tools..." />
              <button onClick={()=>removeListItem(i, 'accessPoints')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('accessPoints')} className="text-blue-600 text-sm mt-1">+ Add Resource</button>
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex gap-4 mt-6 pt-6 border-t">
          <button onClick={handleSave} disabled={loading} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow">
            {loading ? "Saving..." : "Save All Changes"}
          </button>
          <button onClick={handleDelete} disabled={loading} className="px-6 py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50">
            Delete All
          </button>
        </div>

      </div>
    </div>
  );
}