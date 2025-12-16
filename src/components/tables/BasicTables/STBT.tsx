// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function StbTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
const initialState = {
  heroTitle: "",
  heroDescription: "",
  aboutHeading: "",
  aboutDescription: "",
  subtestHeading: "",
  stbUsedDescription: "",
  stbSubsetPoints: [""],
  stbSubsetDescription: "",
  subtests: [{ title: "", content: "" }],
  infoHeading: "",
  infoDescription: "",
  timeTable: [{ activity: "", time5th6th: "", time7thPlus: "" }]
};


  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/stb-test`,
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

  // Handler for Subtests List (Array of Objects)
  const handleSubtestChange = (index, field, value) => {
    const updated = [...form.subtests];
    updated[index][field] = value;
    setForm({ ...form, subtests: updated });
  };
  const addSubtest = () => setForm({ 
    ...form, 
    subtests: [...form.subtests, { title: "", content: "" }] 
  });
  const removeSubtest = (index) => {
    const updated = form.subtests.filter((_, i) => i !== index);
    setForm({ ...form, subtests: updated });
  };

  // Handler for Time Table (Array of Objects)
  const handleTableChange = (index, field, value) => {
    const updated = [...form.timeTable];
    updated[index][field] = value;
    setForm({ ...form, timeTable: updated });
  };
  const addTableRow = () => setForm({ 
    ...form, 
    timeTable: [...form.timeTable, { activity: "", time5th6th: "", time7thPlus: "" }] 
  });
  const removeTableRow = (index) => {
    const updated = form.timeTable.filter((_, i) => i !== index);
    setForm({ ...form, timeTable: updated });
  };

  // --- Actions ---
  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/stb-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("STB Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL STB data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/stb-test`, {
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
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">STB Page Admin</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. STB TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
          
        </div>

        {/* --- 2. ABOUT STB --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">About the STB</h3>
          <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading (e.g. About the STB)" className="w-full mb-3 p-2 border rounded" />
          {/* <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="About Description..." rows={5} className="w-full p-2 border rounded" /> */}
          <ReactQuill
  value={form.aboutDescription}
    modules={ {
  toolbar: [
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
}}
  onChange={(value) =>
    handleChange({
      target: { name: "aboutDescription", value },
    })
  }
  placeholder="About Description..."
  className="bg-white rounded"
/>
        </div>

        {/* --- NEW STB FIELDS --- */}
<div className="mb-6 border-b pb-6">
  <h3 className="font-bold text-lg mb-3 text-gray-700">STB Usage Details</h3>

  {/* Description before points */}
  <textarea
    name="stbUsedDescription"
    value={form.stbUsedDescription}
    onChange={handleChange}
    placeholder="Description about how STB is used..."
    rows={3}
    className="w-full mb-4 p-2 border rounded"
  />

  {/* STB Subset Points (Dynamic List) */}
  <h4 className="font-semibold mb-2">STB Subset Points</h4>
  {form.stbSubsetPoints?.map((p, i) => (
    <div key={i} className="flex gap-2 mb-2">
      <input
        value={p}
        onChange={(e) => {
          const updated = [...form.stbSubsetPoints];
          updated[i] = e.target.value;
          setForm({ ...form, stbSubsetPoints: updated });
        }}
        placeholder="Enter point..."
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={() => {
          const updated = form.stbSubsetPoints.filter((_, idx) => idx !== i);
          setForm({ ...form, stbSubsetPoints: updated });
        }}
        className="text-red-500"
      >
        ✕
      </button>
    </div>
  ))}

  <button
    onClick={() => setForm({ ...form, stbSubsetPoints: [...form.stbSubsetPoints, ""] })}
    className="text-blue-600 text-sm font-semibold"
  >
    + Add Point
  </button>

  {/* Description after points */}
  <textarea
    name="stbSubsetDescription"
    value={form.stbSubsetDescription}
    onChange={handleChange}
    placeholder="Description after the bullet points..."
    rows={3}
    className="w-full mt-4 p-2 border rounded"
  />
</div>


        {/* --- 3. SUBTESTS --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">STB Subtests</h3>
          <input name="subtestHeading" value={form.subtestHeading} onChange={handleChange} placeholder="Heading (e.g. STB Subtests)" className="w-full mb-4 p-2 border rounded" />
          
          <div className="space-y-4">
            {form.subtests.map((item, i) => (
              <div key={i} className="border p-4 rounded bg-gray-50 relative">
                 <button onClick={()=>removeSubtest(i)} className="absolute top-2 right-2 text-red-500 font-bold">✕</button>
                 
                 <input value={item.title} onChange={(e)=>handleSubtestChange(i, 'title', e.target.value)} placeholder="Subtest Title (e.g. Visual Memory)" className="w-full mb-2 p-2 border rounded font-bold" />
                 
                 <textarea value={item.content} onChange={(e)=>handleSubtestChange(i, 'content', e.target.value)} placeholder="Description..." rows={2} className="w-full p-2 border rounded text-sm" />
              </div>
            ))}
          </div>
          <button onClick={addSubtest} className="mt-4 text-blue-600 text-sm font-semibold">+ Add Subtest</button>
        </div>

        {/* --- 4. IMPORTANT INFO & TABLE --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Important Testing Information</h3>
          <input name="infoHeading" value={form.infoHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          <textarea name="infoDescription" value={form.infoDescription} onChange={handleChange} placeholder="Info Text..." rows={3} className="w-full mb-6 p-2 border rounded" />
          
          {/* TIMING TABLE */}
          <div className="bg-gray-50 p-4 rounded border">
             <h4 className="font-bold text-sm text-gray-600 mb-2">Timing Table Data</h4>
             
             {/* Header Labels */}
             <div className="flex gap-2 mb-2 text-xs font-bold text-gray-500">
                <span className="flex-1">Subtest/Activity</span>
                <span className="flex-1">5th/6th Graders Time</span>
                <span className="flex-1">7th+ Graders Time</span>
                <span className="w-8"></span>
             </div>

             {form.timeTable.map((row, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={row.activity} onChange={(e)=>handleTableChange(i, 'activity', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Questionnaire" />
                  <input value={row.time5th6th} onChange={(e)=>handleTableChange(i, 'time5th6th', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. 4 min" />
                  <input value={row.time7thPlus} onChange={(e)=>handleTableChange(i, 'time7thPlus', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. 4 min" />
                  <button onClick={()=>removeTableRow(i)} className="text-red-500 w-8">✕</button>
                </div>
             ))}
             <button onClick={addTableRow} className="text-blue-600 text-sm font-semibold mt-2">+ Add Table Row</button>
          </div>
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