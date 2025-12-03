// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ScatTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    versionsHeading: "",
    versionsList: [""],
    formatHeading: "",
    formatDescription: "",
    formatSections: [{ title: "", description: "" }],
    scoringHeading: "",
    scoringLevels: [{ title: "", details: "" }],
    scoringFooter: "",
    tipsHeading: "",
    tipsList: [""],
    registerHeading: "",
    registerSubHeading: "",
    registerContactList: [""],
    registerAuthNote: "",
    registerGetFromList: [""]
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/scat-test`,
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

  // Generic List Handler (For Tips, Versions, Register lists)
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

  // Generic Object Array Handler (For Cards: Format, Scoring)
  const handleObjectArrayChange = (index, field, value, arrayName) => {
    const updated = [...form[arrayName]];
    updated[index][field] = value;
    setForm({ ...form, [arrayName]: updated });
  };
  const addObjectItem = (arrayName, template) => setForm({ ...form, [arrayName]: [...form[arrayName], template] });
  const removeObjectItem = (index, arrayName) => {
    const updated = form[arrayName].filter((_, i) => i !== index);
    setForm({ ...form, [arrayName]: updated });
  };

  // --- Actions ---
  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/scat-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("SCAT Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL SCAT data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/scat-test`, {
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
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">SCAT PreTest Section</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. SCAT TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- 2. ALL ABOUT SCAT --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">All You Need To Know</h3>
          <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
          <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="Description..." rows={3} className="w-full mb-4 p-2 border rounded" />
          
          <label className="font-semibold text-sm">Versions List:</label>
          <input name="versionsHeading" value={form.versionsHeading} onChange={handleChange} placeholder="Versions Heading" className="w-full mt-2 mb-2 p-2 border rounded bg-gray-50" />
          {form.versionsList.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'versionsList')} className="w-full p-2 border rounded" placeholder="e.g. Grades 2-3..." />
              <button onClick={()=>removeListItem(i, 'versionsList')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('versionsList')} className="text-blue-600 text-sm mt-1">+ Add Version</button>
        </div>

        {/* --- 3. TEST FORMAT --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Test Format</h3>
          <input name="formatHeading" value={form.formatHeading} onChange={handleChange} placeholder="Format Heading" className="w-full mb-2 p-2 border rounded" />
          <textarea name="formatDescription" value={form.formatDescription} onChange={handleChange} placeholder="Format Description..." rows={2} className="w-full mb-4 p-2 border rounded" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {form.formatSections.map((sec, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded relative">
                   <button onClick={()=>removeObjectItem(i, 'formatSections')} className="absolute top-1 right-1 text-red-500">✕</button>
                   <input value={sec.title} onChange={(e)=>handleObjectArrayChange(i, 'title', e.target.value, 'formatSections')} placeholder="Section Title" className="w-full mb-2 p-1 border rounded font-bold" />
                   <textarea value={sec.description} onChange={(e)=>handleObjectArrayChange(i, 'description', e.target.value, 'formatSections')} placeholder="Desc..." rows={3} className="w-full p-1 border rounded" />
                </div>
             ))}
          </div>
          <button onClick={()=>addObjectItem('formatSections', { title: "", description: "" })} className="mt-2 text-blue-600 text-sm">+ Add Format Section</button>
        </div>

        {/* --- 4. SCORING & LEVELS --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Scoring & Levels</h3>
          <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} placeholder="Scoring Heading" className="w-full mb-4 p-2 border rounded" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {form.scoringLevels.map((lvl, i) => (
                <div key={i} className="border p-3 rounded relative">
                   <button onClick={()=>removeObjectItem(i, 'scoringLevels')} className="absolute top-1 right-1 text-red-500">✕</button>
                   <input value={lvl.title} onChange={(e)=>handleObjectArrayChange(i, 'title', e.target.value, 'scoringLevels')} placeholder="Level Name" className="w-full mb-2 p-1 border rounded font-bold" />
                   <textarea value={lvl.details} onChange={(e)=>handleObjectArrayChange(i, 'details', e.target.value, 'scoringLevels')} placeholder="Scores (Verbal/Quant)..." rows={3} className="w-full p-1 border rounded" />
                </div>
             ))}
          </div>
          <button onClick={()=>addObjectItem('scoringLevels', { title: "", details: "" })} className="mt-2 text-blue-600 text-sm">+ Add Level Card</button>
          
          <input name="scoringFooter" value={form.scoringFooter} onChange={handleChange} placeholder="Footer Note" className="w-full mt-3 p-2 border rounded text-sm italic" />
        </div>

        {/* --- 5. TIPS --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">SCAT Test Tips</h3>
          <input name="tipsHeading" value={form.tipsHeading} onChange={handleChange} placeholder="Tips Heading" className="w-full mb-3 p-2 border rounded" />
          {form.tipsList.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'tipsList')} className="w-full p-2 border rounded" placeholder="Tip..." />
              <button onClick={()=>removeListItem(i, 'tipsList')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('tipsList')} className="text-blue-600 text-sm">+ Add Tip</button>
        </div>

        {/* --- 6. REGISTRATION --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">How To Register</h3>
          <input name="registerHeading" value={form.registerHeading} onChange={handleChange} placeholder="Main Heading" className="w-full mb-2 p-2 border rounded font-bold" />
          <input name="registerSubHeading" value={form.registerSubHeading} onChange={handleChange} placeholder="Sub Heading (Schedule...)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold">Contact Methods:</label>
          {form.registerContactList.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'registerContactList')} className="w-full p-2 border rounded" placeholder="e.g. Phone: 800..." />
              <button onClick={()=>removeListItem(i, 'registerContactList')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('registerContactList')} className="text-blue-600 text-sm mb-4">+ Add Contact Method</button>

          <input name="registerAuthNote" value={form.registerAuthNote} onChange={handleChange} placeholder="Auth Number Note" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold">Get it from:</label>
          {form.registerGetFromList.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'registerGetFromList')} className="w-full p-2 border rounded" placeholder="e.g. Mail packet..." />
              <button onClick={()=>removeListItem(i, 'registerGetFromList')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('registerGetFromList')} className="text-blue-600 text-sm">+ Add Source</button>
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