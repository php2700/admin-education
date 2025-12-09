// @ts-nocheck

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PSATDetail() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Empty State
  const initialState = {
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    features: [""], 
    aboutHeading: "",
    aboutDescription: "",
    tableData: [{ section: "", time: "", modules: "" }], 
    examPeriod: [{ section: "", time: "", modules: "" }],
    tableFooter: ""
  };

  const [form, setForm] = useState(initialState);

  // --- 1. FETCH DATA (Read) ---
  const fetchSatData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/psat-test`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.data;
      if (data) {
        setForm({
          heroTitle: data.heroTitle || "",
          heroSubtitle: data.heroSubtitle || "",
          heroDescription: data.heroDescription || "",
          features: data.features?.length ? data.features : [""],
          aboutHeading: data.aboutHeading || "",
          aboutDescription: data.aboutDescription || "",
          examPeriod: data.examPeriod?.length ? data.examPeriod : [{ section: "", time: "", modules: "" }],
          tableData: data.tableData?.length ? data.tableData : [{ section: "", time: "", modules: "" }],
          tableFooter: data.tableFooter || ""
        });
      }
    } catch (err) {
      toast.error("Failed to load PSAT data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSatData();
  }, []);

  // --- 2. HANDLERS (Edit) ---

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Features List Handlers
  const handleFeatureChange = (index, value) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm({ ...form, features: updated });
  };
  const addFeature = () => setForm({ ...form, features: [...form.features, ""] });
  const removeFeature = (index) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  // Table Data Handlers
  const handleTableChange = (index, field, value) => {
    const updatedTable = [...form.tableData];
    updatedTable[index][field] = value;
    setForm({ ...form, tableData: updatedTable });
  };
  const addTableRow = () => {
    setForm({ ...form, tableData: [...form.tableData, { section: "", time: "", modules: "" }] });
  };
  const removeTableRow = (index) => {
    const updatedTable = form.tableData.filter((_, i) => i !== index);
    setForm({ ...form, tableData: updatedTable });
  };

  const handleExamPeriodChange = (index, field, value) => {
  const updated = [...form.examPeriod];
  updated[index][field] = value;
  setForm({ ...form, examPeriod: updated });
};

const addExamPeriodRow = () => {
  setForm({
    ...form,
    examPeriod: [...form.examPeriod, { section: "", time: "", modules: "" }]
  });
};

const removeExamPeriodRow = (index) => {
  const updated = form.examPeriod.filter((_, i) => i !== index);
  setForm({ ...form, examPeriod: updated });
};

  // --- 3. SAVE DATA (Validation Added) ---
  const handleSave = async () => {
    // --- VALIDATION START ---
    
    // 1. Text Fields Validation
    if (!form.heroTitle.trim()) return toast.error("Hero Title is required!");
    if (!form.heroSubtitle.trim()) return toast.error("Hero Subtitle is required!");
    if (!form.heroDescription.trim()) return toast.error("Hero Description is required!");
    if (!form.aboutHeading.trim()) return toast.error("About Heading is required!");
    if (!form.aboutDescription.trim()) return toast.error("About Description is required!");
    if (!form.tableFooter.trim()) return toast.error("Table Footer Note is required!");

    // 2. Features List Validation
    const cleanFeatures = form.features.filter(f => f.trim() !== "");
    if (cleanFeatures.length === 0) {
      return toast.error("At least one Feature is required!");
    }

    // 3. Table Data Validation
    // Remove rows that have any empty cell
    const cleanTableData = form.tableData.filter(
      row => row.section.trim() !== "" && row.time.trim() !== "" && row.modules.trim() !== ""
    );

    if (cleanTableData.length === 0) {
      return toast.error("At least one complete Table Row is required!");
    }

    // Exam Period Validation
const cleanExamPeriod = form.examPeriod.filter(
  row =>
    row.section.trim() !== "" &&
    row.time.trim() !== "" &&
    row.modules.trim() !== ""
);

if (cleanExamPeriod.length === 0) {
  return toast.error("At least one Exam Period row is required!");
}


    // Prepare clean payload
    const dataToSend = {
      ...form,
      features: cleanFeatures,
      tableData: cleanTableData,
      examPeriod: cleanExamPeriod
    };
    // --- VALIDATION END ---

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/psat-test`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Saved successfully");
      
      // Update form with clean data
      setForm(dataToSend);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- 4. DELETE DATA (Delete) ---
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/psat-test`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success("All Data Deleted Successfully");
      setForm(initialState); 
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 flex flex-col items-center min-h-screen">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-4xl border-t-4 border-blue-600">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">PSAT PreTest Section</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Edit Mode</span>
        </div>

        {/* --- SECTION 1: HERO / TOP --- */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Hero Section</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Main Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
              className={`w-full p-3 border rounded-xl outline-none transition ${!form.heroTitle ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
              placeholder="PSAT TEST PREP"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Subtitle (Small Text) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="heroSubtitle"
              value={form.heroSubtitle}
              onChange={handleChange}
              className={`w-full p-3 border rounded-xl outline-none transition ${!form.heroSubtitle ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
              placeholder="At GGES, we have..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="heroDescription"
              value={form.heroDescription}
              onChange={handleChange}
              rows={4}
              className={`w-full p-3 border rounded-xl outline-none transition ${!form.heroDescription ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
              placeholder="With past experience..."
            />
          </div>
        </div>

        {/* --- SECTION 2: FEATURES --- */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Why Choose GGES (Features) <span className="text-red-500">*</span>
          </h3>
          <div className="space-y-3">
            {form.features.map((feature, index) => (
              <div key={index} className="flex gap-2 items-center">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">✅</div>
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="e.g. 15+ Years Experience"
                  className={`w-full p-3 border rounded-xl outline-none ${!feature ? 'border-red-300' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                />
                <button
                  onClick={() => removeFeature(index)}
                  className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-100 border border-red-200 transition"
                  title="Remove Feature"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addFeature}
            className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            + Add Feature Point
          </button>
        </div>

        {/* --- SECTION 3: ABOUT & TABLE --- */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">All About PSAT & Table</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Heading <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="aboutHeading"
              value={form.aboutHeading}
              onChange={handleChange}
              className={`w-full p-3 border rounded-xl outline-none ${!form.aboutHeading ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
              placeholder="ALL ABOUT PSAT"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              About Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="aboutDescription"
              value={form.aboutDescription}
              onChange={handleChange}
              rows={3}
              className={`w-full p-3 border rounded-xl outline-none ${!form.aboutDescription ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
              placeholder="The PSAT is composed of..."
            />
          </div>

          {/* Table Editor */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-700 mb-3">
              Table Data <span className="text-red-500">*</span>
            </h4>
            {form.tableData.map((row, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 items-start">
                <input
                  placeholder="Section Name"
                  value={row.section}
                  onChange={(e) => handleTableChange(index, "section", e.target.value)}
                  className={`flex-1 p-3 border rounded-xl ${!row.section ? 'border-red-300' : 'border-gray-300 focus:ring-1 focus:ring-blue-500'}`}
                />
                <input
                  placeholder="Time (e.g. 64 Mins)"
                  value={row.time}
                  onChange={(e) => handleTableChange(index, "time", e.target.value)}
                  className={`flex-1 p-3 border rounded-xl ${!row.time ? 'border-red-300' : 'border-gray-300 focus:ring-1 focus:ring-blue-500'}`}
                />
                <input
                  placeholder="Modules (e.g. 2)"
                  value={row.modules}
                  onChange={(e) => handleTableChange(index, "modules", e.target.value)}
                  className={`flex-1 p-3 border rounded-xl ${!row.modules ? 'border-red-300' : 'border-gray-300 focus:ring-1 focus:ring-blue-500'}`}
                />
                <button
                  onClick={() => removeTableRow(index)}
                  className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition h-[50px] w-[50px] flex items-center justify-center shadow-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addTableRow}
              className="mt-2 w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 font-medium rounded-xl hover:bg-white hover:border-blue-400 hover:text-blue-500 transition"
            >
              + Add Table Row
            </button>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Table Footer Note <span className="text-red-500">*</span>
            </label>
            <input
               type="text"
               name="tableFooter"
               value={form.tableFooter}
               onChange={handleChange}
               className={`w-full p-3 border rounded-xl outline-none ${!form.tableFooter ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
               placeholder="The second module difficulty..."
            />
          </div>
        </div>
        {/* --- SECTION: EXAM PERIOD --- */}
<div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mt-8">
  <h4 className="font-bold text-gray-700 mb-3">
    Exam Period <span className="text-red-500">*</span>
  </h4>

  {form.examPeriod.map((row, index) => (
    <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 items-start">
      <input
        placeholder="Section Name"
        value={row.section}
        onChange={(e) => handleExamPeriodChange(index, "section", e.target.value)}
        className={`flex-1 p-3 border rounded-xl ${
          !row.section ? "border-red-300" : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
      />

      <input
        placeholder="Time (e.g. 64 Mins)"
        value={row.time}
        onChange={(e) => handleExamPeriodChange(index, "time", e.target.value)}
        className={`flex-1 p-3 border rounded-xl ${
          !row.time ? "border-red-300" : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
      />

      <input
        placeholder="Modules (e.g. 2)"
        value={row.modules}
        onChange={(e) => handleExamPeriodChange(index, "modules", e.target.value)}
        className={`flex-1 p-3 border rounded-xl ${
          !row.modules ? "border-red-300" : "border-gray-300 focus:ring-1 focus:ring-blue-500"
        }`}
      />

      <button
        onClick={() => removeExamPeriodRow(index)}
        className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition h-[50px] w-[50px] flex items-center justify-center shadow-sm"
      >
        ✕
      </button>
    </div>
  ))}

  <button
    onClick={addExamPeriodRow}
    className="mt-2 w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 font-medium rounded-xl hover:bg-white hover:border-blue-400 hover:text-blue-500 transition"
  >
    + Add Exam Period Row
  </button>
</div>


        {/* --- ACTION BUTTONS (UPDATE & DELETE) --- */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          
          {/* Update / Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex justify-center items-center"
          >
            {loading ? (
               <span className="flex items-center gap-2">Processing...</span>
            ) : (
               "Save All Changes"
            )}
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 bg-white text-red-600 font-bold rounded-xl border-2 border-red-100 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all shadow-sm"
          >
            Delete All
          </button>
        </div>

      </div>
    </div>
  );
}