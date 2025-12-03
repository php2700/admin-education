// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SSATtestpage() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial Empty State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    levels: [{ title: "", description: "" }], // Elementary, Middle, Upper Boxes
    comparisonHeading: "",
    comparisonPoints: [""], 
    scoringHeading: "",
    scoringCards: [{ title: "", content: "" }], 
    scoringFooter: "",
    structureHeading: "",
    middleTable: [{ section: "", time: "", questions: "" }],
    upperTable: [{ section: "", time: "", questions: "" }],
  };

  const [form, setForm] = useState(initialState);

  // --- 1. FETCH DATA (Edit Mode Start) ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/ssat-test`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Agar backend se data aaya, to form mein bhar do (Edit Mode On)
      if (res.data.data) {
        setForm({ ...initialState, ...res.data.data }); 
      }
    } catch (err) {
      toast.error("Failed to load existing data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 2. HANDLERS (Editing Logic) ---

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Array Handlers (Generic for Levels, Scoring, Tables)
  const handleArrayChange = (index, field, value, arrayName) => {
    const updated = [...form[arrayName]];
    updated[index][field] = value;
    setForm({ ...form, [arrayName]: updated });
  };
  
  const addItem = (arrayName, itemTemplate) => {
    setForm({ ...form, [arrayName]: [...form[arrayName], itemTemplate] });
  };

  const removeItem = (index, arrayName) => {
    const updated = form[arrayName].filter((_, i) => i !== index);
    setForm({ ...form, [arrayName]: updated });
  };

  // Simple List Handler (Comparison Points)
  const handlePointChange = (index, value) => {
    const updated = [...form.comparisonPoints];
    updated[index] = value;
    setForm({ ...form, comparisonPoints: updated });
  };
  const addPoint = () => setForm({ ...form, comparisonPoints: [...form.comparisonPoints, ""] });
  const removePoint = (index) => setForm({ ...form, comparisonPoints: form.comparisonPoints.filter((_, i) => i !== index) });


  // --- 3. UPDATE ACTION (Save Changes) ---
  const handleUpdate = async () => {
    try {
      setLoading(true);
      // POST Request data ko Update kar degi
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/ssat-test`, 
        form, 
        {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message || "Data Updated Successfully!");
    } catch (err) {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- 4. DELETE ACTION ---
  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This will delete ALL SSAT page data.")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/ssat-test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("All Data Deleted Successfully");
      setForm(initialState); // Form reset
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl border-t-4 border-blue-600 p-8">
        
        <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-3xl font-bold text-blue-800">SSAT Page Manager</h2>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {loading ? "Syncing..." : "Edit Mode Active"}
            </span>
        </div>

        {/* --- 1. HERO & ABOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-6 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-700">Hero Section</h3>
            <label className="text-xs text-gray-500">Main Title</label>
            <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="SSAT TEST PREP" className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-200 outline-none" />
            <label className="text-xs text-gray-500">Description</label>
            <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="At GGES..." rows={3} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 outline-none" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-700">About Section</h3>
            <label className="text-xs text-gray-500">Heading</label>
            <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="ABOUT SSAT" className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-200 outline-none" />
            <label className="text-xs text-gray-500">Description</label>
            <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="Developed to..." rows={3} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-200 outline-none" />
          </div>
        </div>

        {/* --- 2. LEVELS (3 Boxes) --- */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-700">Levels (Elementary, Middle, Upper)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {form.levels.map((level, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-lg relative border border-blue-100 shadow-sm">
                <button onClick={() => removeItem(i, 'levels')} className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold">✕</button>
                <input 
                  value={level.title} 
                  onChange={(e) => handleArrayChange(i, 'title', e.target.value, 'levels')} 
                  placeholder="Title (e.g. Middle Level)" 
                  className="w-full mb-2 p-2 border rounded font-semibold text-sm"
                />
                <textarea 
                  value={level.description} 
                  onChange={(e) => handleArrayChange(i, 'description', e.target.value, 'levels')} 
                  placeholder="Description..." 
                  rows={4} 
                  className="w-full p-2 border rounded text-xs"
                />
              </div>
            ))}
          </div>
          <button onClick={() => addItem('levels', { title: "", description: "" })} className="mt-3 text-blue-600 font-medium text-sm hover:underline">+ Add Level Box</button>
        </div>

        {/* --- 3. COMPARISON & SCORING --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pb-6 border-b border-gray-100">
          
          {/* Comparison */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-700">SSAT vs ISEE Points</h3>
            <input name="comparisonHeading" value={form.comparisonHeading} onChange={handleChange} className="w-full mb-3 p-2 border rounded font-semibold text-sm" />
            <ul className="space-y-2 bg-gray-50 p-3 rounded">
              {form.comparisonPoints.map((pt, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 text-xs">●</span>
                  <input value={pt} onChange={(e) => handlePointChange(i, e.target.value)} className="w-full p-2 border rounded text-sm" />
                  <button onClick={() => removePoint(i)} className="text-red-400">✕</button>
                </li>
              ))}
            </ul>
            <button onClick={addPoint} className="mt-2 text-blue-600 text-sm hover:underline">+ Add Comparison Point</button>
          </div>

          {/* Scoring */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-700">Scoring Info</h3>
            <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} className="w-full mb-3 p-2 border rounded font-semibold text-sm" />
            <div className="space-y-3">
              {form.scoringCards.map((card, i) => (
                <div key={i} className="flex gap-2 items-start border p-2 rounded bg-gray-50">
                  <div className="flex-1">
                    <input value={card.title} onChange={(e) => handleArrayChange(i, 'title', e.target.value, 'scoringCards')} placeholder="e.g. Quantitative" className="w-full mb-1 p-1 border rounded text-sm font-bold" />
                    <textarea value={card.content} onChange={(e) => handleArrayChange(i, 'content', e.target.value, 'scoringCards')} placeholder="Scores..." rows={2} className="w-full p-1 border rounded text-xs" />
                  </div>
                  <button onClick={() => removeItem(i, 'scoringCards')} className="text-red-400 mt-2">✕</button>
                </div>
              ))}
            </div>
            <button onClick={() => addItem('scoringCards', { title: "", content: "" })} className="mt-2 text-blue-600 text-sm hover:underline">+ Add Card</button>
            <input name="scoringFooter" value={form.scoringFooter} onChange={handleChange} placeholder="Footer Note" className="w-full mt-3 p-2 border rounded text-xs italic text-gray-500" />
          </div>
        </div>

        {/* --- 4. TABLES (Middle & Upper) --- */}
        <div>
           <h3 className="font-bold text-xl mb-4 text-gray-700">Test Structure Tables</h3>
           <input name="structureHeading" value={form.structureHeading} onChange={handleChange} className="w-full mb-4 p-2 border rounded font-bold text-lg bg-gray-50" />

           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
             {/* Middle Table */}
             <div className="border p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-blue-600 mb-2">Middle Level (5th - 7th)</h4>
                {form.middleTable.map((row, i) => (
                  <div key={i} className="flex gap-2 mb-2 items-center">
                    <input value={row.section} onChange={(e)=>handleArrayChange(i,'section',e.target.value,'middleTable')} placeholder="Section" className="flex-1 p-2 border rounded text-sm" />
                    <input value={row.time} onChange={(e)=>handleArrayChange(i,'time',e.target.value,'middleTable')} placeholder="Time" className="w-20 p-2 border rounded text-sm" />
                    <input value={row.questions} onChange={(e)=>handleArrayChange(i,'questions',e.target.value,'middleTable')} placeholder="Ques" className="w-20 p-2 border rounded text-sm" />
                    <button onClick={()=>removeItem(i, 'middleTable')} className="text-red-400 font-bold px-1">✕</button>
                  </div>
                ))}
                <button onClick={()=>addItem('middleTable', { section: "", time: "", questions: "" })} className="text-blue-600 text-sm font-semibold">+ Add Row</button>
             </div>

             {/* Upper Table */}
             <div className="border p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-green-600 mb-2">Upper Level (8th - 11th)</h4>
                {form.upperTable.map((row, i) => (
                  <div key={i} className="flex gap-2 mb-2 items-center">
                    <input value={row.section} onChange={(e)=>handleArrayChange(i,'section',e.target.value,'upperTable')} placeholder="Section" className="flex-1 p-2 border rounded text-sm" />
                    <input value={row.time} onChange={(e)=>handleArrayChange(i,'time',e.target.value,'upperTable')} placeholder="Time" className="w-20 p-2 border rounded text-sm" />
                    <input value={row.questions} onChange={(e)=>handleArrayChange(i,'questions',e.target.value,'upperTable')} placeholder="Ques" className="w-20 p-2 border rounded text-sm" />
                    <button onClick={()=>removeItem(i, 'upperTable')} className="text-red-400 font-bold px-1">✕</button>
                  </div>
                ))}
                <button onClick={()=>addItem('upperTable', { section: "", time: "", questions: "" })} className="text-blue-600 text-sm font-semibold">+ Add Row</button>
             </div>
           </div>
        </div>

        {/* --- ACTION BUTTONS (Update & Delete) --- */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 sticky bottom-0 bg-white p-4 z-10">
          
          {/* UPDATE BUTTON */}
          <button 
            onClick={handleUpdate} 
            disabled={loading} 
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition flex justify-center items-center gap-2"
          >
            {loading ? "Processing..." : "💾 Update / Save Changes"}
          </button>

          {/* DELETE BUTTON */}
          <button 
            onClick={handleDelete} 
            disabled={loading} 
            className="px-6 py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition"
          >
            🗑️ Delete All
          </button>
        </div>

      </div>
    </div>
  );
}