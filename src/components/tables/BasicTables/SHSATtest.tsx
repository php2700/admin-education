
// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ShsatTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    // aboutMainHeading: "",
    aboutItems: [{ title: "", content: "" }], 
    structureHeading: "",
    structurePoints: [""] 
  };

  const [form, setForm] = useState(initialState);

  // --- 1. Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/shsat-test`,
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

  // --- 2. Handlers ---

  // Simple Text Inputs
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handler for About Section (Array of Objects)
  const handleAboutChange = (index, field, value) => {
    const updatedItems = [...form.aboutItems];
    updatedItems[index][field] = value;
    setForm({ ...form, aboutItems: updatedItems });
  };
  const addAboutItem = () => setForm({ ...form, aboutItems: [...form.aboutItems, { title: "", content: "" }] });
  const removeAboutItem = (index) => {
    const updatedItems = form.aboutItems.filter((_, i) => i !== index);
    setForm({ ...form, aboutItems: updatedItems });
  };

  // Handler for Structure Points (Array of Strings)
  const handlePointChange = (index, value) => {
    const updatedPoints = [...form.structurePoints];
    updatedPoints[index] = value;
    setForm({ ...form, structurePoints: updatedPoints });
  };
  const addPoint = () => setForm({ ...form, structurePoints: [...form.structurePoints, ""] });
  const removePoint = (index) => {
    const updatedPoints = form.structurePoints.filter((_, i) => i !== index);
    setForm({ ...form, structurePoints: updatedPoints });
  };

  // --- 3. Actions (Save with Validation) ---
  const handleSave = async () => {
    // --- VALIDATION START ---
    
    // 1. Check Hero Section
    if (!form.heroTitle.trim()) return toast.error("Page Title is required!");
    if (!form.heroDescription.trim()) return toast.error("Hero Description is required!");

    // 2. Check About Section
    // if (!form.aboutMainHeading.trim()) return toast.error("About Main Heading is required!");
    
    // Filter valid items (both title and content must be present)
    const validAboutItems = form.aboutItems.filter(
      item => item.title.trim() !== "" && item.content.trim() !== ""
    );

    if (validAboutItems.length === 0) {
      return toast.error("At least one complete About Section Item is required!");
    }

    // Optional: Warn if user left a partially filled item
    const hasPartialAbout = form.aboutItems.some(
      item => (item.title && !item.content) || (!item.title && item.content)
    );
    if (hasPartialAbout) {
      return toast.warning("Please complete all fields in About Items or remove empty ones.");
    }

    // 3. Check Structure Section
    if (!form.structureHeading.trim()) return toast.error("Structure Heading is required!");
    
    const validStructurePoints = form.structurePoints.filter(p => p.trim() !== "");
    if (validStructurePoints.length === 0) {
      return toast.error("At least one Bullet Point is required!");
    }

    // Prepare Payload
    const dataToSend = {
      ...form,
      aboutItems: validAboutItems,
      structurePoints: validStructurePoints
    };
    // --- VALIDATION END ---

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/shsat-test`,
        dataToSend,
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      toast.success("SHSAT Page Saved Successfully");
      
      // Update form with cleaned data
      setForm(dataToSend);
      
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete ALL SHSAT data?")) return;
    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/shsat-test`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl border-t-4 border-blue-600 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">SHSAT PreTest Section</h2>

        {/* --- SECTION 1: HERO / TOP --- */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-700">Top Section</h3>
          
          <label className="text-sm font-semibold text-gray-600">
            Page Title <span className="text-red-500">*</span>
          </label>
          <input 
            name="heroTitle" 
            value={form.heroTitle} 
            onChange={handleChange} 
            placeholder="e.g. SHSAT Test Prep" 
            className={`w-full mb-4 p-3 border rounded-lg outline-none ${!form.heroTitle ? 'border-red-300' : 'border-gray-300 focus:ring-2 focus:ring-blue-300'}`} 
          />

          <label className="text-sm font-semibold text-gray-600">
            Description (Top Paragraphs) <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="heroDescription" 
            value={form.heroDescription} 
            onChange={handleChange} 
            placeholder="At GGES, our SHSAT online tutoring programs..." 
            rows={5} 
            className={`w-full p-3 border rounded-lg outline-none ${!form.heroDescription ? 'border-red-300' : 'border-gray-300 focus:ring-2 focus:ring-blue-300'}`} 
          />
        </div>

        {/* --- SECTION 2: ABOUT SHSAT (Dynamic Items) --- */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-700">All About SHSAT</h3>
          
          {/* <label className="text-sm font-semibold text-gray-600">
            Main Heading <span className="text-red-500">*</span>
          </label>
          <input 
            name="aboutMainHeading" 
            value={form.aboutMainHeading} 
            onChange={handleChange} 
            placeholder="e.g. All About SHSAT" 
            className={`w-full mb-6 p-3 border rounded-lg outline-none ${!form.aboutMainHeading ? 'border-red-300' : 'border-gray-300 focus:ring-2 focus:ring-blue-300'}`} 
          /> */}

          <div className="space-y-4">
            {form.aboutItems.map((item, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-xl border border-blue-100 relative">
                <button 
                  onClick={() => removeAboutItem(index)} 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                  title="Remove Item"
                >
                  ✕
                </button>
                
                <label className="text-xs font-semibold text-blue-800">Item Title <span className="text-red-500">*</span></label>
                <input 
                  value={item.title} 
                  onChange={(e) => handleAboutChange(index, "title", e.target.value)} 
                  placeholder="Heading (Blue Text)" 
                  className={`w-full mb-2 p-2 border rounded font-semibold text-blue-700 ${!item.title ? 'border-red-300' : 'border-blue-200'}`} 
                />
                
                <label className="text-xs font-semibold text-gray-600">Item Content <span className="text-red-500">*</span></label>
                <textarea 
                  value={item.content} 
                  onChange={(e) => handleAboutChange(index, "content", e.target.value)} 
                  placeholder="Answer/Description..." 
                  rows={3} 
                  className={`w-full p-2 border rounded ${!item.content ? 'border-red-300' : 'border-gray-300'}`} 
                />
              </div>
            ))}
          </div>
          <button 
            onClick={addAboutItem} 
            className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            + Add About Section Item
          </button>
        </div>

        {/* --- SECTION 3: TEST STRUCTURE (Bullet Points) --- */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-700">Test Structure</h3>
          
          <label className="text-sm font-semibold text-gray-600">
            Heading <span className="text-red-500">*</span>
          </label>
          <input 
            name="structureHeading" 
            value={form.structureHeading} 
            onChange={handleChange} 
            placeholder="e.g. SHSAT Test Structure" 
            className={`w-full mb-4 p-3 border rounded-lg outline-none ${!form.structureHeading ? 'border-red-300' : 'border-gray-300 focus:ring-2 focus:ring-blue-300'}`} 
          />

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 className="font-semibold mb-3 text-gray-600">
              Bullet Points <span className="text-red-500">*</span>
            </h4>
            {form.structurePoints.map((point, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <span className="text-gray-400">•</span>
                <input 
                  value={point} 
                  onChange={(e) => handlePointChange(index, e.target.value)} 
                  placeholder="e.g. 57 questions in each section" 
                  className={`w-full p-2 border rounded ${!point ? 'border-red-300' : 'border-gray-300 focus:ring-1 focus:ring-blue-400'}`} 
                />
                <button 
                  onClick={() => removePoint(index)} 
                  className="text-red-500 p-2 hover:bg-red-50 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
            <button 
              onClick={addPoint} 
              className="mt-2 text-sm text-blue-600 font-semibold"
            >
              + Add Bullet Point
            </button>
          </div>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 sticky bottom-0 bg-white p-2">
          <button 
            onClick={handleSave} 
            disabled={loading} 
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow transition"
          >
            {loading ? "Saving..." : "Save All Changes"}
          </button>
          <button 
            onClick={handleDelete} 
            disabled={loading} 
            className="px-6 py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
          >
            Delete All
          </button>
        </div>

      </div>
    </div>
  );
}