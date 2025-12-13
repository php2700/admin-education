// // @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function CogatTestPrepAdmin() {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("educationToken");

//   // --- Initial State ---
//   const initialState = {
//     heroTitle: "",
//     heroDescription: "",
//     aboutHeading: "",
//     aboutDescription: "",
//     structureHeading: "",
//     structureDescription: "",
//     structureTable: [{ verbal: "", quantitative: "", nonVerbal: "" }],
//     levelsHeading: "",
//     levelsDescription: "",
//     levelsTable: [{ grade: "", level: "", questions: "", testTime: "" }],
//     scoringHeading: "",
//     scoringDescription: "",
//     locationHeading: "",
//     locationDescription: ""
//   };

//   const [form, setForm] = useState(initialState);

//   // --- Fetch Data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/cogat-test`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.data) {
//         setForm({ ...initialState, ...res.data.data });
//       }
//     } catch (err) {
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // --- Handlers ---
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Handler for Structure Table (3 Columns)
//   const handleStructureChange = (index, field, value) => {
//     const updated = [...form.structureTable];
//     updated[index][field] = value;
//     setForm({ ...form, structureTable: updated });
//   };
//   const addStructureRow = () => setForm({ 
//     ...form, 
//     structureTable: [...form.structureTable, { verbal: "", quantitative: "", nonVerbal: "" }] 
//   });
//   const removeStructureRow = (index) => {
//     const updated = form.structureTable.filter((_, i) => i !== index);
//     setForm({ ...form, structureTable: updated });
//   };

//   // Handler for Levels Table (4 Columns)
//   const handleLevelChange = (index, field, value) => {
//     const updated = [...form.levelsTable];
//     updated[index][field] = value;
//     setForm({ ...form, levelsTable: updated });
//   };
//   const addLevelRow = () => setForm({ 
//     ...form, 
//     levelsTable: [...form.levelsTable, { grade: "", level: "", questions: "", testTime: "" }] 
//   });
//   const removeLevelRow = (index) => {
//     const updated = form.levelsTable.filter((_, i) => i !== index);
//     setForm({ ...form, levelsTable: updated });
//   };

//   // --- Actions ---
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/cogat-test`, form, {
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       toast.success("CogAT Page Saved");
//     } catch (err) {
//       toast.error("Save Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete ALL CogAT data?")) return;
//     try {
//       setLoading(true);
//       await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/cogat-test`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Deleted Successfully");
//       setForm(initialState);
//     } catch (err) {
//       toast.error("Delete Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-6 flex flex-col items-center min-h-screen">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl border-t-4 border-blue-600 p-8">
//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">CogAT Page Admin</h2>

//         {/* --- 1. HERO --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
//           <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. COGAT TEST PREP)" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 2. ABOUT --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">About CogAT</h3>
//           <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="About Description..." rows={4} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 3. TEST STRUCTURE TABLE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure Table</h3>
//           <input name="structureHeading" value={form.structureHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
//           <textarea name="structureDescription" value={form.structureDescription} onChange={handleChange} placeholder="Description..." rows={2} className="w-full mb-4 p-2 border rounded" />

//           <div className="bg-gray-50 p-4 rounded border">
//              {/* Header Label Row */}
//              <div className="flex gap-2 mb-2 font-bold text-sm text-gray-600">
//                <span className="flex-1">Verbal Battery</span>
//                <span className="flex-1">Quantitative Battery</span>
//                <span className="flex-1">Non-Verbal Battery</span>
//                <span className="w-8"></span>
//              </div>
//              {form.structureTable.map((row, i) => (
//                 <div key={i} className="flex gap-2 mb-2">
//                   <input value={row.verbal} onChange={(e)=>handleStructureChange(i, 'verbal', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Picture Analogies" />
//                   <input value={row.quantitative} onChange={(e)=>handleStructureChange(i, 'quantitative', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Number Analogies" />
//                   <input value={row.nonVerbal} onChange={(e)=>handleStructureChange(i, 'nonVerbal', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Figure Matrices" />
//                   <button onClick={()=>removeStructureRow(i)} className="text-red-500 w-8">✕</button>
//                 </div>
//              ))}
//              <button onClick={addStructureRow} className="text-blue-600 text-sm font-semibold">+ Add Structure Row</button>
//           </div>
//         </div>

//         {/* --- 4. LEVELS TABLE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Levels & Timing Table</h3>
//           <input name="levelsHeading" value={form.levelsHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
//           <textarea name="levelsDescription" value={form.levelsDescription} onChange={handleChange} placeholder="Description..." rows={2} className="w-full mb-4 p-2 border rounded" />

//           <div className="bg-gray-50 p-4 rounded border">
//              {/* Header Label Row */}
//              <div className="flex gap-2 mb-2 font-bold text-sm text-gray-600">
//                <span className="w-1/4">Grade</span>
//                <span className="w-1/4">CogAT Level</span>
//                <span className="w-1/4">Questions</span>
//                <span className="w-1/4">Test Time</span>
//                <span className="w-8"></span>
//              </div>
//              {form.levelsTable.map((row, i) => (
//                 <div key={i} className="flex gap-2 mb-2">
//                   <input value={row.grade} onChange={(e)=>handleLevelChange(i, 'grade', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 2nd Grade" />
//                   <input value={row.level} onChange={(e)=>handleLevelChange(i, 'level', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. Level 8" />
//                   <input value={row.questions} onChange={(e)=>handleLevelChange(i, 'questions', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 154" />
//                   <input value={row.testTime} onChange={(e)=>handleLevelChange(i, 'testTime', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 122 min" />
//                   <button onClick={()=>removeLevelRow(i)} className="text-red-500 w-8">✕</button>
//                 </div>
//              ))}
//              <button onClick={addLevelRow} className="text-blue-600 text-sm font-semibold">+ Add Level Row</button>
//           </div>
//         </div>

//         {/* --- 5. SCORING --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Scoring</h3>
//           <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="scoringDescription" value={form.scoringDescription} onChange={handleChange} placeholder="Scoring details..." rows={4} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 6. LOCATION --- */}
//         <div className="mb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Location</h3>
//           <input name="locationHeading" value={form.locationHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="locationDescription" value={form.locationDescription} onChange={handleChange} placeholder="Location details..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- ACTIONS --- */}
//         <div className="flex gap-4 mt-6 pt-6 border-t">
//           <button onClick={handleSave} disabled={loading} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow">
//             {loading ? "Saving..." : "Save All Changes"}
//           </button>
//           <button onClick={handleDelete} disabled={loading} className="px-6 py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50">
//             Delete All
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function CogatTestPrepAdmin() {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("educationToken");

//   // --- Initial State ---
//   const initialState = {
//     heroTitle: "",
//     heroDescription: "",
//     aboutHeading: "",
//     aboutDescription: "",
//     structureHeading: "",
//     structureDescription: "",
//     structureTable: [{ verbal: "", quantitative: "", nonVerbal: "" }],
//     levelsHeading: "",
//     levelsDescription: "",
//     levelsTable: [{ grade: "", level: "", questions: "", testTime: "" }],
//     scoringHeading: "",
//     scoringDescription: "",
//     locationHeading: "",
//     locationDescription: ""
//   };

//   const [form, setForm] = useState(initialState);

//   // --- Fetch Data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/cogat-test`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.data) {
//         setForm({ ...initialState, ...res.data.data });
//       }
//     } catch (err) {
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // --- Handlers ---
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Handler for Structure Table (3 Columns)
//   const handleStructureChange = (index, field, value) => {
//     const updated = [...form.structureTable];
//     updated[index][field] = value;
//     setForm({ ...form, structureTable: updated });
//   };
//   const addStructureRow = () => setForm({ 
//     ...form, 
//     structureTable: [...form.structureTable, { verbal: "", quantitative: "", nonVerbal: "" }] 
//   });
//   const removeStructureRow = (index) => {
//     const updated = form.structureTable.filter((_, i) => i !== index);
//     setForm({ ...form, structureTable: updated });
//   };

//   // Handler for Levels Table (4 Columns)
//   const handleLevelChange = (index, field, value) => {
//     const updated = [...form.levelsTable];
//     updated[index][field] = value;
//     setForm({ ...form, levelsTable: updated });
//   };
//   const addLevelRow = () => setForm({ 
//     ...form, 
//     levelsTable: [...form.levelsTable, { grade: "", level: "", questions: "", testTime: "" }] 
//   });
//   const removeLevelRow = (index) => {
//     const updated = form.levelsTable.filter((_, i) => i !== index);
//     setForm({ ...form, levelsTable: updated });
//   };

//   // --- Validation Logic ---
//   const validateForm = () => {
//     // 1. Check Simple Text Fields
//     const requiredFields = [
//       { key: "heroTitle", label: "Hero Title" },
//       { key: "heroDescription", label: "Hero Description" },
//       { key: "aboutHeading", label: "About Heading" },
//       { key: "aboutDescription", label: "About Description" },
//       { key: "structureHeading", label: "Structure Heading" },
//       { key: "structureDescription", label: "Structure Description" },
//       { key: "levelsHeading", label: "Levels Heading" },
//       { key: "levelsDescription", label: "Levels Description" },
//       { key: "scoringHeading", label: "Scoring Heading" },
//       { key: "scoringDescription", label: "Scoring Description" },
//       { key: "locationHeading", label: "Location Heading" },
//       { key: "locationDescription", label: "Location Description" },
//     ];

//     for (const field of requiredFields) {
//       if (!form[field.key] || !form[field.key].trim()) {
//         toast.error(`${field.label} is required!`);
//         return false;
//       }
//     }

//     // 2. Check Structure Table
//     if (form.structureTable.length === 0) {
//       toast.error("Structure Table must have at least one row.");
//       return false;
//     }
//     for (let i = 0; i < form.structureTable.length; i++) {
//       const row = form.structureTable[i];
//       if (!row.verbal.trim() || !row.quantitative.trim() || !row.nonVerbal.trim()) {
//         toast.error(`Structure Table Row ${i + 1} is incomplete. All columns required.`);
//         return false;
//       }
//     }

//     // 3. Check Levels Table
//     if (form.levelsTable.length === 0) {
//       toast.error("Levels Table must have at least one row.");
//       return false;
//     }
//     for (let i = 0; i < form.levelsTable.length; i++) {
//       const row = form.levelsTable[i];
//       if (!row.grade.trim() || !row.level.trim() || !row.questions.trim() || !row.testTime.trim()) {
//         toast.error(`Levels Table Row ${i + 1} is incomplete. All columns required.`);
//         return false;
//       }
//     }

//     return true;
//   };

//   // --- Actions ---
//   const handleSave = async () => {
//     if (!validateForm()) return; // Validation Check

//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/cogat-test`, form, {
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       toast.success("CogAT Page Saved");
//     } catch (err) {
//       toast.error("Save Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete ALL CogAT data?")) return;
//     try {
//       setLoading(true);
//       await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/cogat-test`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Deleted Successfully");
//       setForm(initialState);
//     } catch (err) {
//       toast.error("Delete Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper for Required Star
//   const ReqStar = () => <span className="text-red-500 ml-1">*</span>;

//   return (
//     <div className="bg-gray-50 p-6 flex flex-col items-center min-h-screen">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl border-t-4 border-blue-600 p-8">
//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">CogAT Page Admin</h2>

//         {/* --- 1. HERO --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          
//           <label className="block text-sm font-semibold mb-1">Title <ReqStar /></label>
//           <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. COGAT TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          
//           <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
//           <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 2. ABOUT --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">About CogAT</h3>
          
//           <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
//           <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
//           <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
//           <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="About Description..." rows={4} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 3. TEST STRUCTURE TABLE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure Table</h3>
          
//           <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
//           <input name="structureHeading" value={form.structureHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
          
//           <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
//           <textarea name="structureDescription" value={form.structureDescription} onChange={handleChange} placeholder="Description..." rows={2} className="w-full mb-4 p-2 border rounded" />

//           <label className="block text-sm font-semibold mb-2">Structure Rows (All fields required) <ReqStar /></label>
//           <div className="bg-gray-50 p-4 rounded border border-gray-200">
//              {/* Header Label Row */}
//              <div className="flex gap-2 mb-2 font-bold text-sm text-gray-600">
//                <span className="flex-1">Verbal Battery <ReqStar /></span>
//                <span className="flex-1">Quantitative Battery <ReqStar /></span>
//                <span className="flex-1">Non-Verbal Battery <ReqStar /></span>
//                <span className="w-8"></span>
//              </div>
//              {form.structureTable.map((row, i) => (
//                 <div key={i} className="flex gap-2 mb-2">
//                   <input value={row.verbal} onChange={(e)=>handleStructureChange(i, 'verbal', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Picture Analogies" />
//                   <input value={row.quantitative} onChange={(e)=>handleStructureChange(i, 'quantitative', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Number Analogies" />
//                   <input value={row.nonVerbal} onChange={(e)=>handleStructureChange(i, 'nonVerbal', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Figure Matrices" />
//                   <button onClick={()=>removeStructureRow(i)} className="text-red-500 font-bold w-8">✕</button>
//                 </div>
//              ))}
//              <button onClick={addStructureRow} className="text-blue-600 text-sm font-semibold">+ Add Structure Row</button>
//           </div>
//         </div>

//         {/* --- 4. LEVELS TABLE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Levels & Timing Table</h3>
          
//           <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
//           <input name="levelsHeading" value={form.levelsHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
          
//           <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
//           <textarea name="levelsDescription" value={form.levelsDescription} onChange={handleChange} placeholder="Description..." rows={2} className="w-full mb-4 p-2 border rounded" />

//           <label className="block text-sm font-semibold mb-2">Level Rows (All fields required) <ReqStar /></label>
//           <div className="bg-gray-50 p-4 rounded border border-gray-200">
//              {/* Header Label Row */}
//              <div className="flex gap-2 mb-2 font-bold text-sm text-gray-600">
//                <span className="w-1/4">Grade <ReqStar /></span>
//                <span className="w-1/4">CogAT Level <ReqStar /></span>
//                <span className="w-1/4">Questions <ReqStar /></span>
//                <span className="w-1/4">Test Time <ReqStar /></span>
//                <span className="w-8"></span>
//              </div>
//              {form.levelsTable.map((row, i) => (
//                 <div key={i} className="flex gap-2 mb-2">
//                   <input value={row.grade} onChange={(e)=>handleLevelChange(i, 'grade', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 2nd Grade" />
//                   <input value={row.level} onChange={(e)=>handleLevelChange(i, 'level', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. Level 8" />
//                   <input value={row.questions} onChange={(e)=>handleLevelChange(i, 'questions', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 154" />
//                   <input value={row.testTime} onChange={(e)=>handleLevelChange(i, 'testTime', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 122 min" />
//                   <button onClick={()=>removeLevelRow(i)} className="text-red-500 font-bold w-8">✕</button>
//                 </div>
//              ))}
//              <button onClick={addLevelRow} className="text-blue-600 text-sm font-semibold">+ Add Level Row</button>
//           </div>
//         </div>

//         {/* --- 5. SCORING --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Scoring</h3>
          
//           <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
//           <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
//           <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
//           <textarea name="scoringDescription" value={form.scoringDescription} onChange={handleChange} placeholder="Scoring details..." rows={4} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 6. LOCATION --- */}
//         <div className="mb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Location</h3>
          
//           <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
//           <input name="locationHeading" value={form.locationHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
//           <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
//           <textarea name="locationDescription" value={form.locationDescription} onChange={handleChange} placeholder="Location details..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- ACTIONS --- */}
//         <div className="flex gap-4 mt-6 pt-6 border-t">
//           <button onClick={handleSave} disabled={loading} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow disabled:bg-blue-400">
//             {loading ? "Saving..." : "Save All Changes"}
//           </button>
//           <button onClick={handleDelete} disabled={loading} className="px-6 py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 disabled:bg-gray-100">
//             Delete All
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CogatTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State (Matches Schema) ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
     heroSubDescription: "",
    heroList: [""], // Array of strings

    introHeading: "",
    introDescription: "",

    structureTable: [{ verbal: "", quantitative: "", nonVerbal: "" }],

    measureHeading: "",
    measureDescription: "",

    administerHeading: "",
    administerDescription: "",
    administerList: [""], // Array of strings

    levelsHeading: "",
    levelsDescription: "",
    levelsTable: [{ grade: "", level: "", questions: "", testTime: "" }],

    questionCountHeading: "",
    questionCountDescription: "",

    verbalBatteryHeading: "VERBAL BATTERY",
    verbalBatteryList: [{ title: "", content: "" }],

    nonVerbalBatteryHeading: "NON-VERBAL BATTERY",
    nonVerbalBatteryList: [{ title: "", content: "" }],

    quantBatteryHeading: "QUANTITATIVE BATTERY",
    quantBatteryList: [{ title: "", content: "" }],

    scoringHeading: "",
    scoringDescription: "",

    locationHeading: "",
    locationDescription: ""
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/cogat-test`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.data) {
        // Merge received data with initial state to handle arrays correctly
        const data = res.data.data;
        setForm({
            ...initialState,
            ...data,
            heroList: data.heroList || [""],
            structureTable: data.structureTable || initialState.structureTable,
            administerList: data.administerList || [""],
            levelsTable: data.levelsTable || initialState.levelsTable,
            verbalBatteryList: data.verbalBatteryList || initialState.verbalBatteryList,
            nonVerbalBatteryList: data.nonVerbalBatteryList || initialState.nonVerbalBatteryList,
            quantBatteryList: data.quantBatteryList || initialState.quantBatteryList
        });
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

  // 1. String Array Handler (For Bullet Points: Hero, Administer)
  const handleStringArrayChange = (index, value, arrayName) => {
    const updated = [...form[arrayName]];
    updated[index] = value;
    setForm({ ...form, [arrayName]: updated });
  };
  const addStringItem = (arrayName) => setForm({ ...form, [arrayName]: [...form[arrayName], ""] });
  const removeStringItem = (index, arrayName) => {
    const updated = form[arrayName].filter((_, i) => i !== index);
    setForm({ ...form, [arrayName]: updated });
  };

  // 2. Object Array Handler (For Tables & Battery Lists)
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

  // --- Save Data ---
  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/cogat-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("CogAT Page Saved Successfully!");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 flex flex-col items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl border-t-4 border-blue-600 p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center text-blue-800">CogAT Admin Panel</h2>

        {/* --- 1. HERO --- */}
        {/* <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-bold text-lg mb-2 text-gray-700">1. Hero Section</h3>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Hero Title" className="w-full mb-2 p-2 border rounded" />
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Introduction Paragraph..." rows={3} className="w-full p-2 border rounded mb-2" />
          
          <label className="text-sm font-semibold">Bullet Points (Why Choose GGES?):</label>
          {form.heroList.map((item, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <input value={item} onChange={(e) => handleStringArrayChange(i, e.target.value, 'heroList')} className="flex-1 p-2 border rounded" placeholder="Bullet point..." />
              <button onClick={() => removeStringItem(i, 'heroList')} className="text-red-500 font-bold px-2">✕</button>
            </div>
          ))}
          <button onClick={() => addStringItem('heroList')} className="text-blue-600 text-sm font-semibold mt-1">+ Add Bullet</button>
        </div> */}
        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-bold text-lg mb-2 text-gray-700">1. Hero Section</h3>
          
          {/* Main Title */}
          <label className="text-xs font-bold text-gray-500">Main Title</label>
          <input 
            name="heroTitle" 
            value={form.heroTitle} 
            onChange={handleChange} 
            placeholder="Hero Title" 
            className="w-full mb-3 p-2 border rounded" 
          />

          {/* Main Description (First Paragraph) */}
          <label className="text-xs font-bold text-gray-500">Main Description</label>
          <textarea 
            name="heroDescription" 
            value={form.heroDescription} 
            onChange={handleChange} 
            placeholder="Introduction Paragraph (e.g. At GGES, COGAT Test prep is something...)" 
            rows={3} 
            className="w-full p-2 border rounded mb-3" 
          />

          {/* NEW FIELD: Sub Description (List Intro) */}
          <label className="text-xs font-bold text-gray-500">Sub Description (List Intro)</label>
          <input 
            name="heroSubDescription" 
            value={form.heroSubDescription} 
            onChange={handleChange} 
            placeholder="e.g. GGES makes the best tutoring options for a number of reasons:" 
            className="w-full p-2 border rounded mb-3 border-blue-300 bg-blue-50" 
          />
          
          {/* Bullet Points */}
          <label className="text-sm font-semibold block mb-1">Bullet Points (Why Choose GGES?):</label>
          {form.heroList.map((item, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <input 
                value={item} 
                onChange={(e) => handleStringArrayChange(i, e.target.value, 'heroList')} 
                className="flex-1 p-2 border rounded" 
                placeholder="Bullet point..." 
              />
              <button onClick={() => removeStringItem(i, 'heroList')} className="text-red-500 font-bold px-2">✕</button>
            </div>
          ))}
          <button onClick={() => addStringItem('heroList')} className="text-blue-600 text-sm font-semibold mt-2">+ Add Bullet</button>
        </div>

        {/* --- 2. INTRO & STRUCTURE TABLE --- */}
        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-bold text-lg mb-2 text-gray-700">2. Test Structure</h3>
          <input name="introHeading" value={form.introHeading} onChange={handleChange} placeholder="Heading (What is on the test?)" className="w-full mb-2 p-2 border rounded" />
          <textarea name="introDescription" value={form.introDescription} onChange={handleChange} placeholder="Description..." rows={2} className="w-full p-2 border rounded mb-4" />

          <label className="text-sm font-semibold">Structure Table (3 Columns):</label>
          <div className="overflow-x-auto mt-2">
             <div className="flex gap-2 font-bold text-xs text-gray-500 mb-1">
                 <span className="flex-1">Verbal Battery</span>
                 <span className="flex-1">Quantitative Battery</span>
                 <span className="flex-1">Non-Verbal Battery</span>
                 <span className="w-6"></span>
             </div>
             {form.structureTable.map((row, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={row.verbal} onChange={(e)=>handleObjectArrayChange(i, 'verbal', e.target.value, 'structureTable')} className="flex-1 p-2 border rounded text-sm" placeholder="Verbal item" />
                  <input value={row.quantitative} onChange={(e)=>handleObjectArrayChange(i, 'quantitative', e.target.value, 'structureTable')} className="flex-1 p-2 border rounded text-sm" placeholder="Quant item" />
                  <input value={row.nonVerbal} onChange={(e)=>handleObjectArrayChange(i, 'nonVerbal', e.target.value, 'structureTable')} className="flex-1 p-2 border rounded text-sm" placeholder="Non-Verbal item" />
                  <button onClick={()=>removeObjectItem(i, 'structureTable')} className="text-red-500 font-bold w-6">✕</button>
                </div>
             ))}
             <button onClick={()=>addObjectItem('structureTable', {verbal:"", quantitative:"", nonVerbal:""})} className="text-blue-600 text-sm font-semibold">+ Add Row</button>
          </div>
        </div>

        {/* --- 3. MEASURE & ADMINISTER --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded border">
                <h3 className="font-bold mb-2">3. What Does It Measure?</h3>
                <input name="measureHeading" value={form.measureHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
                <textarea name="measureDescription" value={form.measureDescription} onChange={handleChange} placeholder="Content..." rows={6} className="w-full p-2 border rounded" />
            </div>

            <div className="bg-gray-50 p-4 rounded border">
                <h3 className="font-bold mb-2">4. How Administered?</h3>
                <input name="administerHeading" value={form.administerHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
                <textarea name="administerDescription" value={form.administerDescription} onChange={handleChange} placeholder="Intro text..." rows={3} className="w-full p-2 border rounded mb-2" />
                
                <label className="text-sm font-semibold">Administer Points:</label>
                {form.administerList.map((item, i) => (
                    <div key={i} className="flex gap-1 mt-1">
                    <input value={item} onChange={(e) => handleStringArrayChange(i, e.target.value, 'administerList')} className="flex-1 p-1 border rounded text-sm" />
                    <button onClick={() => removeStringItem(i, 'administerList')} className="text-red-500 px-1">✕</button>
                    </div>
                ))}
                <button onClick={() => addStringItem('administerList')} className="text-blue-600 text-sm font-semibold mt-1">+ Add Point</button>
            </div>
        </div>

        {/* --- 4. LEVELS TABLE --- */}
        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-bold text-lg mb-2 text-gray-700">5. Levels & Timing</h3>
          <input name="levelsHeading" value={form.levelsHeading} onChange={handleChange} placeholder="Heading (Which CogAT Level...)" className="w-full mb-2 p-2 border rounded" />
          <textarea name="levelsDescription" value={form.levelsDescription} onChange={handleChange} placeholder="Description..." rows={2} className="w-full p-2 border rounded mb-4" />

          <div className="bg-white p-2 rounded border">
             <div className="flex gap-2 font-bold text-xs text-gray-500 mb-1">
                 <span className="w-1/4">Grade</span>
                 <span className="w-1/4">Level</span>
                 <span className="w-1/4">Questions</span>
                 <span className="w-1/4">Time</span>
                 <span className="w-6"></span>
             </div>
             {form.levelsTable.map((row, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={row.grade} onChange={(e)=>handleObjectArrayChange(i, 'grade', e.target.value, 'levelsTable')} className="w-1/4 p-2 border rounded text-sm" placeholder="Grade" />
                  <input value={row.level} onChange={(e)=>handleObjectArrayChange(i, 'level', e.target.value, 'levelsTable')} className="w-1/4 p-2 border rounded text-sm" placeholder="Level" />
                  <input value={row.questions} onChange={(e)=>handleObjectArrayChange(i, 'questions', e.target.value, 'levelsTable')} className="w-1/4 p-2 border rounded text-sm" placeholder="Ques" />
                  <input value={row.testTime} onChange={(e)=>handleObjectArrayChange(i, 'testTime', e.target.value, 'levelsTable')} className="w-1/4 p-2 border rounded text-sm" placeholder="Time" />
                  <button onClick={()=>removeObjectItem(i, 'levelsTable')} className="text-red-500 font-bold w-6">✕</button>
                </div>
             ))}
             <button onClick={()=>addObjectItem('levelsTable', {grade:"", level:"", questions:"", testTime:""})} className="text-blue-600 text-sm font-semibold">+ Add Level Row</button>
          </div>
          
          <div className="mt-4">
             <input name="questionCountHeading" value={form.questionCountHeading} onChange={handleChange} placeholder="Question Count Heading" className="w-full mb-2 p-2 border rounded" />
             <textarea name="questionCountDescription" value={form.questionCountDescription} onChange={handleChange} placeholder="Question Count Description..." rows={2} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* --- 5. BATTERY DETAILS (Verbal, Non-Verbal, Quant) --- */}
        <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-bold text-lg mb-4 text-gray-700">6. Battery Details</h3>
            
            {/* Verbal */}
            <div className="mb-4 border-b pb-4">
                <input name="verbalBatteryHeading" value={form.verbalBatteryHeading} onChange={handleChange} className="w-full font-bold p-2 border rounded mb-2 bg-blue-50" placeholder="VERBAL BATTERY Heading" />
                {form.verbalBatteryList.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input value={item.title} onChange={(e)=>handleObjectArrayChange(i, 'title', e.target.value, 'verbalBatteryList')} className="w-1/3 p-2 border rounded" placeholder="Title (e.g. Picture Analogies)" />
                        <textarea value={item.content} onChange={(e)=>handleObjectArrayChange(i, 'content', e.target.value, 'verbalBatteryList')} className="flex-1 p-2 border rounded" placeholder="Description..." rows={2} />
                        <button onClick={()=>removeObjectItem(i, 'verbalBatteryList')} className="text-red-500">✕</button>
                    </div>
                ))}
                <button onClick={()=>addObjectItem('verbalBatteryList', {title:"", content:""})} className="text-blue-600 text-sm">+ Add Verbal Item</button>
            </div>

            {/* Non-Verbal */}
            <div className="mb-4 border-b pb-4">
                <input name="nonVerbalBatteryHeading" value={form.nonVerbalBatteryHeading} onChange={handleChange} className="w-full font-bold p-2 border rounded mb-2 bg-green-50" placeholder="NON-VERBAL BATTERY Heading" />
                {form.nonVerbalBatteryList.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input value={item.title} onChange={(e)=>handleObjectArrayChange(i, 'title', e.target.value, 'nonVerbalBatteryList')} className="w-1/3 p-2 border rounded" placeholder="Title" />
                        <textarea value={item.content} onChange={(e)=>handleObjectArrayChange(i, 'content', e.target.value, 'nonVerbalBatteryList')} className="flex-1 p-2 border rounded" placeholder="Description..." rows={2} />
                        <button onClick={()=>removeObjectItem(i, 'nonVerbalBatteryList')} className="text-red-500">✕</button>
                    </div>
                ))}
                <button onClick={()=>addObjectItem('nonVerbalBatteryList', {title:"", content:""})} className="text-green-600 text-sm">+ Add Non-Verbal Item</button>
            </div>

            {/* Quant */}
            <div>
                <input name="quantBatteryHeading" value={form.quantBatteryHeading} onChange={handleChange} className="w-full font-bold p-2 border rounded mb-2 bg-yellow-50" placeholder="QUANTITATIVE BATTERY Heading" />
                {form.quantBatteryList.map((item, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input value={item.title} onChange={(e)=>handleObjectArrayChange(i, 'title', e.target.value, 'quantBatteryList')} className="w-1/3 p-2 border rounded" placeholder="Title" />
                        <textarea value={item.content} onChange={(e)=>handleObjectArrayChange(i, 'content', e.target.value, 'quantBatteryList')} className="flex-1 p-2 border rounded" placeholder="Description..." rows={2} />
                        <button onClick={()=>removeObjectItem(i, 'quantBatteryList')} className="text-red-500">✕</button>
                    </div>
                ))}
                <button onClick={()=>addObjectItem('quantBatteryList', {title:"", content:""})} className="text-yellow-600 text-sm">+ Add Quant Item</button>
            </div>
        </div>

        {/* --- 6. SCORING & LOCATION --- */}
        <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-bold text-lg mb-2 text-gray-700">7. Scoring & Location</h3>
            
            <div className="mb-4">
                <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} placeholder="Scoring Heading" className="w-full mb-2 p-2 border rounded" />
                <textarea name="scoringDescription" value={form.scoringDescription} onChange={handleChange} placeholder="Scoring Description..." rows={4} className="w-full p-2 border rounded" />
            </div>

            <div>
                <input name="locationHeading" value={form.locationHeading} onChange={handleChange} placeholder="Location Heading" className="w-full mb-2 p-2 border rounded" />
                <textarea name="locationDescription" value={form.locationDescription} onChange={handleChange} placeholder="Location Description..." rows={3} className="w-full p-2 border rounded" />
            </div>
        </div>

        {/* --- SAVE BUTTON --- */}
        <button onClick={handleSave} disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-md">
            {loading ? "Saving..." : "💾 Save All Changes"}
        </button>

      </div>
    </div>
  );
}