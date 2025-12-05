// // @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AccuplacerTestPrepAdmin() {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("educationToken");

//   // --- Initial State ---
//   const initialState = {
//     heroTitle: "",
//     heroDescription: "",
//     aboutHeading: "",
//     aboutDescription: "",
//     testSectionHeading: "",
//     testList: [{ title: "", description: "" }]
//   };

//   const [form, setForm] = useState(initialState);

//   // --- Fetch Data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/accuplacer-test`,
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

//   // Generic Object Array Handler (For Test List)
//   const handleTestListChange = (index, field, value) => {
//     const updated = [...form.testList];
//     updated[index][field] = value;
//     setForm({ ...form, testList: updated });
//   };
//   const addTestItem = () => setForm({ 
//     ...form, 
//     testList: [...form.testList, { title: "", description: "" }] 
//   });
//   const removeTestItem = (index) => {
//     const updated = form.testList.filter((_, i) => i !== index);
//     setForm({ ...form, testList: updated });
//   };

//   // --- Actions ---
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/accuplacer-test`, form, {
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       toast.success("Accuplacer Page Saved");
//     } catch (err) {
//       toast.error("Save Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete ALL Accuplacer data?")) return;
//     try {
//       setLoading(true);
//       await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/accuplacer-test`, {
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
//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Accuplacer Page Admin</h2>

//         {/* --- 1. HERO --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
//           <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. ACCUPLACER TEST PREP)" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 2. ABOUT ACCUPLACER --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">About Accuplacer</h3>
//           <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading (e.g. About Accuplacer)" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="Description paragraphs..." rows={5} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 3. WHAT'S ON THE TESTS (LIST) --- */}
//         <div className="mb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">What's on the Tests</h3>
//           <input name="testSectionHeading" value={form.testSectionHeading} onChange={handleChange} placeholder="Heading (e.g. What's on the Tests)" className="w-full mb-4 p-2 border rounded font-bold" />
          
//           <div className="space-y-4">
//             {form.testList.map((test, i) => (
//               <div key={i} className="border p-4 rounded bg-gray-50 relative">
//                  <button onClick={()=>removeTestItem(i)} className="absolute top-2 right-2 text-red-500 font-bold">✕</button>
                 
//                  <label className="text-xs font-semibold text-gray-500">Test Title</label>
//                  <input value={test.title} onChange={(e)=>handleTestListChange(i, 'title', e.target.value)} placeholder="e.g. Reading Test" className="w-full mb-2 p-2 border rounded font-bold" />
                 
//                  <label className="text-xs font-semibold text-gray-500">Description</label>
//                  <textarea value={test.description} onChange={(e)=>handleTestListChange(i, 'description', e.target.value)} placeholder="Test details..." rows={3} className="w-full p-2 border rounded text-sm" />
//               </div>
//             ))}
//           </div>
//           <button onClick={addTestItem} className="mt-4 text-blue-600 text-sm font-semibold">+ Add Test Section</button>
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

export default function AccuplacerTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    testSectionHeading: "",
    testList: [{ title: "", description: "" }]
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/accuplacer-test`,
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

  // Generic Object Array Handler (For Test List)
  const handleTestListChange = (index, field, value) => {
    const updated = [...form.testList];
    updated[index][field] = value;
    setForm({ ...form, testList: updated });
  };
  const addTestItem = () => setForm({ 
    ...form, 
    testList: [...form.testList, { title: "", description: "" }] 
  });
  const removeTestItem = (index) => {
    const updated = form.testList.filter((_, i) => i !== index);
    setForm({ ...form, testList: updated });
  };

  // --- Validation Logic ---
  const validateForm = () => {
    // 1. Check Simple Text Fields
    const requiredFields = [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroDescription", label: "Hero Description" },
      { key: "aboutHeading", label: "About Heading" },
      { key: "aboutDescription", label: "About Description" },
      { key: "testSectionHeading", label: "Test Section Heading" },
    ];

    for (const field of requiredFields) {
      if (!form[field.key] || !form[field.key].trim()) {
        toast.error(`${field.label} is required!`);
        return false;
      }
    }

    // 2. Check Test List
    if (form.testList.length === 0) {
      toast.error("At least one Test Section item is required.");
      return false;
    }

    for (let i = 0; i < form.testList.length; i++) {
      const item = form.testList[i];
      if (!item.title.trim() || !item.description.trim()) {
        toast.error(`Test Item #${i + 1} is incomplete. Title and Description required.`);
        return false;
      }
    }

    return true;
  };

  // --- Actions ---
  const handleSave = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/accuplacer-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("Accuplacer Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL Accuplacer data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/accuplacer-test`, {
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
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Accuplacer Page Admin</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          
          <label className="block text-sm font-semibold mb-1">Title <ReqStar /></label>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. ACCUPLACER TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- 2. ABOUT ACCUPLACER --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">About Accuplacer</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading (e.g. About Accuplacer)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="Description paragraphs..." rows={5} className="w-full p-2 border rounded" />
        </div>

        {/* --- 3. WHAT'S ON THE TESTS (LIST) --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">What's on the Tests</h3>
          
          <label className="block text-sm font-semibold mb-1">Section Heading <ReqStar /></label>
          <input name="testSectionHeading" value={form.testSectionHeading} onChange={handleChange} placeholder="Heading (e.g. What's on the Tests)" className="w-full mb-4 p-2 border rounded font-bold" />
          
          <label className="block text-sm font-semibold mb-2">Test Items (All fields required) <ReqStar /></label>
          <div className="space-y-4">
            {form.testList.map((test, i) => (
              <div key={i} className="border p-4 rounded bg-gray-50 relative border-gray-200 shadow-sm">
                 <button onClick={()=>removeTestItem(i)} className="absolute top-2 right-2 text-red-500 font-bold">✕</button>
                 
                 <label className="text-xs font-semibold text-gray-500">Test Title <ReqStar /></label>
                 <input value={test.title} onChange={(e)=>handleTestListChange(i, 'title', e.target.value)} placeholder="e.g. Reading Test" className="w-full mb-2 p-2 border rounded font-bold" />
                 
                 <label className="text-xs font-semibold text-gray-500">Description <ReqStar /></label>
                 <textarea value={test.description} onChange={(e)=>handleTestListChange(i, 'description', e.target.value)} placeholder="Test details..." rows={3} className="w-full p-2 border rounded text-sm" />
              </div>
            ))}
          </div>
          <button onClick={addTestItem} className="mt-4 text-blue-600 text-sm font-semibold">+ Add Test Section</button>
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