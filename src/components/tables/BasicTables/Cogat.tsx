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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CogatTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    structureHeading: "",
    structureDescription: "",
    structureTable: [{ verbal: "", quantitative: "", nonVerbal: "" }],
    levelsHeading: "",
    levelsDescription: "",
    levelsTable: [{ grade: "", level: "", questions: "", testTime: "" }],
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

  // Handler for Structure Table (3 Columns)
  const handleStructureChange = (index, field, value) => {
    const updated = [...form.structureTable];
    updated[index][field] = value;
    setForm({ ...form, structureTable: updated });
  };
  const addStructureRow = () => setForm({ 
    ...form, 
    structureTable: [...form.structureTable, { verbal: "", quantitative: "", nonVerbal: "" }] 
  });
  const removeStructureRow = (index) => {
    const updated = form.structureTable.filter((_, i) => i !== index);
    setForm({ ...form, structureTable: updated });
  };

  // Handler for Levels Table (4 Columns)
  const handleLevelChange = (index, field, value) => {
    const updated = [...form.levelsTable];
    updated[index][field] = value;
    setForm({ ...form, levelsTable: updated });
  };
  const addLevelRow = () => setForm({ 
    ...form, 
    levelsTable: [...form.levelsTable, { grade: "", level: "", questions: "", testTime: "" }] 
  });
  const removeLevelRow = (index) => {
    const updated = form.levelsTable.filter((_, i) => i !== index);
    setForm({ ...form, levelsTable: updated });
  };

  // --- Validation Logic ---
  const validateForm = () => {
    // 1. Check Simple Text Fields
    const requiredFields = [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroDescription", label: "Hero Description" },
      { key: "aboutHeading", label: "About Heading" },
      { key: "aboutDescription", label: "About Description" },
      { key: "structureHeading", label: "Structure Heading" },
      { key: "structureDescription", label: "Structure Description" },
      { key: "levelsHeading", label: "Levels Heading" },
      { key: "levelsDescription", label: "Levels Description" },
      { key: "scoringHeading", label: "Scoring Heading" },
      { key: "scoringDescription", label: "Scoring Description" },
      { key: "locationHeading", label: "Location Heading" },
      { key: "locationDescription", label: "Location Description" },
    ];

    for (const field of requiredFields) {
      if (!form[field.key] || !form[field.key].trim()) {
        toast.error(`${field.label} is required!`);
        return false;
      }
    }

    // 2. Check Structure Table
    if (form.structureTable.length === 0) {
      toast.error("Structure Table must have at least one row.");
      return false;
    }
    for (let i = 0; i < form.structureTable.length; i++) {
      const row = form.structureTable[i];
      if (!row.verbal.trim() || !row.quantitative.trim() || !row.nonVerbal.trim()) {
        toast.error(`Structure Table Row ${i + 1} is incomplete. All columns required.`);
        return false;
      }
    }

    // 3. Check Levels Table
    if (form.levelsTable.length === 0) {
      toast.error("Levels Table must have at least one row.");
      return false;
    }
    for (let i = 0; i < form.levelsTable.length; i++) {
      const row = form.levelsTable[i];
      if (!row.grade.trim() || !row.level.trim() || !row.questions.trim() || !row.testTime.trim()) {
        toast.error(`Levels Table Row ${i + 1} is incomplete. All columns required.`);
        return false;
      }
    }

    return true;
  };

  // --- Actions ---
  const handleSave = async () => {
    if (!validateForm()) return; // Validation Check

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/cogat-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("CogAT Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL CogAT data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/cogat-test`, {
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

  // Helper for Required Star
  const ReqStar = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl border-t-4 border-blue-600 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">CogAT Page Admin</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          
          <label className="block text-sm font-semibold mb-1">Title <ReqStar /></label>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. COGAT TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- 2. ABOUT --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">About CogAT</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="About Description..." rows={4} className="w-full p-2 border rounded" />
        </div>

        {/* --- 3. TEST STRUCTURE TABLE --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure Table</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="structureHeading" value={form.structureHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="structureDescription" value={form.structureDescription} onChange={handleChange} placeholder="Description..." rows={2} className="w-full mb-4 p-2 border rounded" />

          <label className="block text-sm font-semibold mb-2">Structure Rows (All fields required) <ReqStar /></label>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
             {/* Header Label Row */}
             <div className="flex gap-2 mb-2 font-bold text-sm text-gray-600">
               <span className="flex-1">Verbal Battery <ReqStar /></span>
               <span className="flex-1">Quantitative Battery <ReqStar /></span>
               <span className="flex-1">Non-Verbal Battery <ReqStar /></span>
               <span className="w-8"></span>
             </div>
             {form.structureTable.map((row, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={row.verbal} onChange={(e)=>handleStructureChange(i, 'verbal', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Picture Analogies" />
                  <input value={row.quantitative} onChange={(e)=>handleStructureChange(i, 'quantitative', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Number Analogies" />
                  <input value={row.nonVerbal} onChange={(e)=>handleStructureChange(i, 'nonVerbal', e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Figure Matrices" />
                  <button onClick={()=>removeStructureRow(i)} className="text-red-500 font-bold w-8">✕</button>
                </div>
             ))}
             <button onClick={addStructureRow} className="text-blue-600 text-sm font-semibold">+ Add Structure Row</button>
          </div>
        </div>

        {/* --- 4. LEVELS TABLE --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Levels & Timing Table</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="levelsHeading" value={form.levelsHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-2 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="levelsDescription" value={form.levelsDescription} onChange={handleChange} placeholder="Description..." rows={2} className="w-full mb-4 p-2 border rounded" />

          <label className="block text-sm font-semibold mb-2">Level Rows (All fields required) <ReqStar /></label>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
             {/* Header Label Row */}
             <div className="flex gap-2 mb-2 font-bold text-sm text-gray-600">
               <span className="w-1/4">Grade <ReqStar /></span>
               <span className="w-1/4">CogAT Level <ReqStar /></span>
               <span className="w-1/4">Questions <ReqStar /></span>
               <span className="w-1/4">Test Time <ReqStar /></span>
               <span className="w-8"></span>
             </div>
             {form.levelsTable.map((row, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={row.grade} onChange={(e)=>handleLevelChange(i, 'grade', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 2nd Grade" />
                  <input value={row.level} onChange={(e)=>handleLevelChange(i, 'level', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. Level 8" />
                  <input value={row.questions} onChange={(e)=>handleLevelChange(i, 'questions', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 154" />
                  <input value={row.testTime} onChange={(e)=>handleLevelChange(i, 'testTime', e.target.value)} className="w-1/4 p-2 border rounded" placeholder="e.g. 122 min" />
                  <button onClick={()=>removeLevelRow(i)} className="text-red-500 font-bold w-8">✕</button>
                </div>
             ))}
             <button onClick={addLevelRow} className="text-blue-600 text-sm font-semibold">+ Add Level Row</button>
          </div>
        </div>

        {/* --- 5. SCORING --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Scoring</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="scoringDescription" value={form.scoringDescription} onChange={handleChange} placeholder="Scoring details..." rows={4} className="w-full p-2 border rounded" />
        </div>

        {/* --- 6. LOCATION --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Location</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="locationHeading" value={form.locationHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="locationDescription" value={form.locationDescription} onChange={handleChange} placeholder="Location details..." rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex gap-4 mt-6 pt-6 border-t">
          <button onClick={handleSave} disabled={loading} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow disabled:bg-blue-400">
            {loading ? "Saving..." : "Save All Changes"}
          </button>
          <button onClick={handleDelete} disabled={loading} className="px-6 py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 disabled:bg-gray-100">
            Delete All
          </button>
        </div>

      </div>
    </div>
  );
}