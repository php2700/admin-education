// // @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function MathKangarooTestPrepAdmin() {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("educationToken");

//   // --- Initial State ---
//   const initialState = {
//     heroTitle: "",
//     heroDescription: "",
//     structureHeading: "",
//     structureDescription: "",
//     featuresHeading: "",
//     featuresList: [""],
//     rulesHeading: "",
//     rulesList: [""],
//     scoringHeading: "",
//     scoringDescription: ""
//   };

//   const [form, setForm] = useState(initialState);

//   // --- Fetch Data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/math-kangaroo-test`,
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

//   // Generic List Handler (For Features & Rules)
//   const handleListChange = (index, value, listName) => {
//     const updated = [...form[listName]];
//     updated[index] = value;
//     setForm({ ...form, [listName]: updated });
//   };
//   const addListItem = (listName) => setForm({ ...form, [listName]: [...form[listName], ""] });
//   const removeListItem = (index, listName) => {
//     const updated = form[listName].filter((_, i) => i !== index);
//     setForm({ ...form, [listName]: updated });
//   };

//   // --- Actions ---
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/math-kangaroo-test`, form, {
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       toast.success("Math Kangaroo Page Saved");
//     } catch (err) {
//       toast.error("Save Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete ALL Math Kangaroo data?")) return;
//     try {
//       setLoading(true);
//       await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/math-kangaroo-test`, {
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
//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Math Kangaroo PreTest Section</h2>

//         {/* --- 1. HERO --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
//           <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. MATH KANGAROO TEST PREP)" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 2. TEST STRUCTURE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure</h3>
//           <input name="structureHeading" value={form.structureHeading} onChange={handleChange} placeholder="Heading (e.g. Test Structure)" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="structureDescription" value={form.structureDescription} onChange={handleChange} placeholder="Description..." rows={4} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 3. FEATURES (LIST) --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Features</h3>
//           <input name="featuresHeading" value={form.featuresHeading} onChange={handleChange} placeholder="Heading (e.g. Features)" className="w-full mb-3 p-2 border rounded" />
          
//           <label className="text-sm font-semibold">Bullet Points:</label>
//           {form.featuresList.map((pt, i) => (
//             <div key={i} className="flex gap-2 mb-2 mt-1">
//               <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'featuresList')} className="w-full p-2 border rounded" placeholder="Feature point..." />
//               <button onClick={()=>removeListItem(i, 'featuresList')} className="text-red-500">✕</button>
//             </div>
//           ))}
//           <button onClick={()=>addListItem('featuresList')} className="text-blue-600 text-sm mt-1">+ Add Feature</button>
//         </div>

//         {/* --- 4. GENERAL RULES (LIST) --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">General Rules</h3>
//           <input name="rulesHeading" value={form.rulesHeading} onChange={handleChange} placeholder="Heading (e.g. General Rules)" className="w-full mb-3 p-2 border rounded" />
          
//           <label className="text-sm font-semibold">Bullet Points:</label>
//           {form.rulesList.map((pt, i) => (
//             <div key={i} className="flex gap-2 mb-2 mt-1">
//               <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'rulesList')} className="w-full p-2 border rounded" placeholder="Rule point..." />
//               <button onClick={()=>removeListItem(i, 'rulesList')} className="text-red-500">✕</button>
//             </div>
//           ))}
//           <button onClick={()=>addListItem('rulesList')} className="text-blue-600 text-sm mt-1">+ Add Rule</button>
//         </div>

//         {/* --- 5. SCORING --- */}
//         <div className="mb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Scoring</h3>
//           <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} placeholder="Heading (e.g. Scoring)" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="scoringDescription" value={form.scoringDescription} onChange={handleChange} placeholder="Scoring Description..." rows={4} className="w-full p-2 border rounded" />
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

export default function MathKangarooTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    structureHeading: "",
    structureDescription: "",
    featuresHeading: "",
    featuresList: [""],
    rulesHeading: "",
    rulesList: [""],
    scoringHeading: "",
    scoringDescription: ""
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/math-kangaroo-test`,
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

  // Generic List Handler (For Features & Rules)
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

  // --- Validation Logic ---
  const validateForm = () => {
    // 1. Check Simple Text Fields
    const requiredFields = [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroDescription", label: "Hero Description" },
      { key: "structureHeading", label: "Structure Heading" },
      { key: "structureDescription", label: "Structure Description" },
      { key: "featuresHeading", label: "Features Heading" },
      { key: "rulesHeading", label: "Rules Heading" },
      { key: "scoringHeading", label: "Scoring Heading" },
      { key: "scoringDescription", label: "Scoring Description" },
    ];

    for (const field of requiredFields) {
      if (!form[field.key] || !form[field.key].trim()) {
        toast.error(`${field.label} is required!`);
        return false;
      }
    }

    // 2. Check Lists (must not be empty & items must not be empty)
    if (form.featuresList.length === 0 || form.featuresList.some(item => !item.trim())) {
      toast.error("All Features list items must be filled (at least one required).");
      return false;
    }

    if (form.rulesList.length === 0 || form.rulesList.some(item => !item.trim())) {
      toast.error("All Rules list items must be filled (at least one required).");
      return false;
    }

    return true;
  };

  // --- Actions ---
  const handleSave = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/math-kangaroo-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("Math Kangaroo Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL Math Kangaroo data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/math-kangaroo-test`, {
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
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Math Kangaroo PreTest Section</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          
          <label className="block text-sm font-semibold mb-1">Title <ReqStar /></label>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. MATH KANGAROO TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- 2. TEST STRUCTURE --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="structureHeading" value={form.structureHeading} onChange={handleChange} placeholder="Heading (e.g. Test Structure)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="structureDescription" value={form.structureDescription} onChange={handleChange} placeholder="Description..." rows={4} className="w-full p-2 border rounded" />
        </div>

        {/* --- 3. FEATURES (LIST) --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Features</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="featuresHeading" value={form.featuresHeading} onChange={handleChange} placeholder="Heading (e.g. Features)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold block mb-1">Bullet Points <ReqStar />:</label>
          {form.featuresList.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2 mt-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'featuresList')} className="w-full p-2 border rounded" placeholder="Feature point..." />
              <button onClick={()=>removeListItem(i, 'featuresList')} className="text-red-500 font-bold">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('featuresList')} className="text-blue-600 text-sm mt-1">+ Add Feature</button>
        </div>

        {/* --- 4. GENERAL RULES (LIST) --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">General Rules</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="rulesHeading" value={form.rulesHeading} onChange={handleChange} placeholder="Heading (e.g. General Rules)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold block mb-1">Bullet Points <ReqStar />:</label>
          {form.rulesList.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2 mt-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'rulesList')} className="w-full p-2 border rounded" placeholder="Rule point..." />
              <button onClick={()=>removeListItem(i, 'rulesList')} className="text-red-500 font-bold">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('rulesList')} className="text-blue-600 text-sm mt-1">+ Add Rule</button>
        </div>

        {/* --- 5. SCORING --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Scoring</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} placeholder="Heading (e.g. Scoring)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="scoringDescription" value={form.scoringDescription} onChange={handleChange} placeholder="Scoring Description..." rows={4} className="w-full p-2 border rounded" />
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