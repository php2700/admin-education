// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ActTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    structureHeading: "",
    structurePoints: [""],
    changesHeading: "",
    changesPoints: [""]
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/act-test`,
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

  // Generic List Handler (For Structure & Changes)
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
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/act-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("ACT Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL ACT data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/act-test`, {
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
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">ACT PreTest Section</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. ACT TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- 2. ABOUT ACT --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">All About ACT</h3>
          <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading (e.g. All About ACT)" className="w-full mb-3 p-2 border rounded" />
          <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="Description paragraphs..." rows={5} className="w-full p-2 border rounded" />
        </div>

        {/* --- 3. TEST STRUCTURE (BULLETS) --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure</h3>
          <input name="structureHeading" value={form.structureHeading} onChange={handleChange} placeholder="Heading (e.g. ACT Test Structure)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold">Bullet Points:</label>
          {form.structurePoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2 mt-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'structurePoints')} className="w-full p-2 border rounded" placeholder="e.g. Core Sections: English..." />
              <button onClick={()=>removeListItem(i, 'structurePoints')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('structurePoints')} className="text-blue-600 text-sm mt-1">+ Add Structure Point</button>
        </div>

        {/* --- 4. NEW CHANGES (NUMBERED LIST) --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">New ACT Changes (2025)</h3>
          <input name="changesHeading" value={form.changesHeading} onChange={handleChange} placeholder="Heading (e.g. New ACT Changes in 2025)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold">Numbered List Points:</label>
          {form.changesPoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2 mt-1">
              <span className="mt-2 text-gray-500 font-bold">{i+1}.</span>
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'changesPoints')} className="w-full p-2 border rounded" placeholder="e.g. Optional Science Section..." />
              <button onClick={()=>removeListItem(i, 'changesPoints')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('changesPoints')} className="text-blue-600 text-sm mt-1">+ Add Change Point</button>
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