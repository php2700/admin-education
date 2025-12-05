// // @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function ISEETestPrepAdmin() {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("educationToken");

//   // --- Initial State ---
//   const initialState = {
//     heroTitle: "",
//     heroDescription: "",
//     aboutHeading: "",
//     aboutDescription: "",
//     aboutPoints: [""],
//     aboutFooter: "",
//     purposeHeading: "",
//     purposePoints: [""],
//     structureHeading: "",
//     structureLevelIntro: "",
//     structureLevels: [""],
//     structureSectionIntro: "",
//     structureSections: [""],
//     measureHeading: "",
//     measurePoints: [""],
//     registrationHeading: "",
//     registrationDescription: ""
//   };

//   const [form, setForm] = useState(initialState);

//   // --- Fetch Data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/isee-test`,
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

//   // Generic List Handler (For all bullet point sections)
//   const handleListChange = (index, value, listName) => {
//     const updatedList = [...form[listName]];
//     updatedList[index] = value;
//     setForm({ ...form, [listName]: updatedList });
//   };
//   const addListItem = (listName) => setForm({ ...form, [listName]: [...form[listName], ""] });
//   const removeListItem = (index, listName) => {
//     const updatedList = form[listName].filter((_, i) => i !== index);
//     setForm({ ...form, [listName]: updatedList });
//   };

//   // --- Actions ---
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/isee-test`, form, {
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       toast.success("ISEE Page Saved");
//     } catch (err) {
//       toast.error("Save Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete ALL ISEE data?")) return;
//     try {
//       setLoading(true);
//       await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/isee-test`, {
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
//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">ISEE PreTest Section</h2>

//         {/* --- 1. HERO --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
//           <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. ISEE Test Prep)" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 2. ABOUT ISEE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">All About ISEE</h3>
//           <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="Description..." rows={3} className="w-full mb-3 p-2 border rounded" />
          
//           <label className="text-sm font-semibold text-gray-600">Bullet Points:</label>
//           {form.aboutPoints.map((pt, i) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'aboutPoints')} className="w-full p-2 border rounded" />
//               <button onClick={()=>removeListItem(i, 'aboutPoints')} className="text-red-500">✕</button>
//             </div>
//           ))}
//           <button onClick={()=>addListItem('aboutPoints')} className="text-blue-600 text-sm mb-3">+ Add Point</button>
          
//           <input name="aboutFooter" value={form.aboutFooter} onChange={handleChange} placeholder="Footer Note (e.g. Different levels...)" className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 3. PURPOSE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Purpose of ISEE</h3>
//           <input name="purposeHeading" value={form.purposeHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
//           {form.purposePoints.map((pt, i) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'purposePoints')} className="w-full p-2 border rounded" />
//               <button onClick={()=>removeListItem(i, 'purposePoints')} className="text-red-500">✕</button>
//             </div>
//           ))}
//           <button onClick={()=>addListItem('purposePoints')} className="text-blue-600 text-sm">+ Add Purpose Point</button>
//         </div>

//         {/* --- 4. STRUCTURE & LEVELS --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure & Levels</h3>
//           <input name="structureHeading" value={form.structureHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
//           {/* Levels List */}
//           <div className="bg-blue-50 p-4 rounded mb-4">
//              <input name="structureLevelIntro" value={form.structureLevelIntro} onChange={handleChange} placeholder="Levels Intro (e.g. ISEE has four levels:)" className="w-full mb-2 p-2 border rounded bg-white" />
//              {form.structureLevels.map((pt, i) => (
//                 <div key={i} className="flex gap-2 mb-2">
//                 <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'structureLevels')} className="w-full p-2 border rounded" placeholder="Level Name" />
//                 <button onClick={()=>removeListItem(i, 'structureLevels')} className="text-red-500">✕</button>
//                 </div>
//             ))}
//             <button onClick={()=>addListItem('structureLevels')} className="text-blue-600 text-sm">+ Add Level</button>
//           </div>

//           {/* Sections List */}
//           <div className="bg-green-50 p-4 rounded">
//              <input name="structureSectionIntro" value={form.structureSectionIntro} onChange={handleChange} placeholder="Sections Intro (e.g. Test includes 5 sections:)" className="w-full mb-2 p-2 border rounded bg-white" />
//              {form.structureSections.map((pt, i) => (
//                 <div key={i} className="flex gap-2 mb-2">
//                 <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'structureSections')} className="w-full p-2 border rounded" placeholder="Section Name" />
//                 <button onClick={()=>removeListItem(i, 'structureSections')} className="text-red-500">✕</button>
//                 </div>
//             ))}
//             <button onClick={()=>addListItem('structureSections')} className="text-blue-600 text-sm">+ Add Section</button>
//           </div>
//         </div>

//         {/* --- 5. WHAT SECTIONS MEASURE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">What Sections Measure</h3>
//           <input name="measureHeading" value={form.measureHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
//           {form.measurePoints.map((pt, i) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'measurePoints')} className="w-full p-2 border rounded" placeholder="e.g. Verbal Reasoning: Vocabulary..." />
//               <button onClick={()=>removeListItem(i, 'measurePoints')} className="text-red-500">✕</button>
//             </div>
//           ))}
//           <button onClick={()=>addListItem('measurePoints')} className="text-blue-600 text-sm">+ Add Point</button>
//         </div>

//         {/* --- 6. REGISTRATION DETAILS --- */}
//         <div className="mb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Registration Details</h3>
//           <input name="registrationHeading" value={form.registrationHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="registrationDescription" value={form.registrationDescription} onChange={handleChange} placeholder="Details paragraphs..." rows={4} className="w-full p-2 border rounded" />
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

export default function ISEETestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    aboutPoints: [""],
    aboutFooter: "",
    purposeHeading: "",
    purposePoints: [""],
    structureHeading: "",
    structureLevelIntro: "",
    structureLevels: [""],
    structureSectionIntro: "",
    structureSections: [""],
    measureHeading: "",
    measurePoints: [""],
    registrationHeading: "",
    registrationDescription: ""
  };

  const [form, setForm] = useState(initialState);

  // --- 1. Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/isee-test`,
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
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Generic List Handler
  const handleListChange = (index, value, listName) => {
    const updatedList = [...form[listName]];
    updatedList[index] = value;
    setForm({ ...form, [listName]: updatedList });
  };
  const addListItem = (listName) => setForm({ ...form, [listName]: [...form[listName], ""] });
  const removeListItem = (index, listName) => {
    const updatedList = form[listName].filter((_, i) => i !== index);
    setForm({ ...form, [listName]: updatedList });
  };

  // --- 3. Actions (Save with Validation) ---
  const handleSave = async () => {
    // --- VALIDATION START ---

    // 1. Check Simple Fields
    if (!form.heroTitle.trim()) return toast.error("Hero Title is required!");
    if (!form.heroDescription.trim()) return toast.error("Hero Description is required!");
    if (!form.aboutHeading.trim()) return toast.error("About Heading is required!");
    if (!form.aboutDescription.trim()) return toast.error("About Description is required!");
    if (!form.purposeHeading.trim()) return toast.error("Purpose Heading is required!");
    if (!form.structureHeading.trim()) return toast.error("Structure Heading is required!");
    if (!form.measureHeading.trim()) return toast.error("Measure Heading is required!");
    if (!form.registrationHeading.trim()) return toast.error("Registration Heading is required!");
    if (!form.registrationDescription.trim()) return toast.error("Registration Description is required!");

    // 2. Validate Lists (Filter empty & check length)
    const validAboutPoints = form.aboutPoints.filter(p => p.trim() !== "");
    const validPurposePoints = form.purposePoints.filter(p => p.trim() !== "");
    const validLevels = form.structureLevels.filter(p => p.trim() !== "");
    const validSections = form.structureSections.filter(p => p.trim() !== "");
    const validMeasurePoints = form.measurePoints.filter(p => p.trim() !== "");

    if (validAboutPoints.length === 0) return toast.error("At least one About Point is required!");
    if (validPurposePoints.length === 0) return toast.error("At least one Purpose Point is required!");
    if (validLevels.length === 0) return toast.error("At least one Structure Level is required!");
    if (validSections.length === 0) return toast.error("At least one Structure Section is required!");
    if (validMeasurePoints.length === 0) return toast.error("At least one Measure Point is required!");

    // Prepare Payload
    const dataToSend = {
      ...form,
      aboutPoints: validAboutPoints,
      purposePoints: validPurposePoints,
      structureLevels: validLevels,
      structureSections: validSections,
      measurePoints: validMeasurePoints
    };
    // --- VALIDATION END ---

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/isee-test`, dataToSend, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("ISEE Page Saved");
      
      // Update form with clean data
      setForm(dataToSend);
      
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL ISEE data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/isee-test`, {
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
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">ISEE PreTest Section</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section <span className="text-red-500">*</span></h3>
          <input 
            name="heroTitle" 
            value={form.heroTitle} 
            onChange={handleChange} 
            placeholder="Main Title (e.g. ISEE Test Prep)" 
            className={`w-full mb-3 p-2 border rounded ${!form.heroTitle ? 'border-red-300' : 'border-gray-300'}`}
          />
          <textarea 
            name="heroDescription" 
            value={form.heroDescription} 
            onChange={handleChange} 
            placeholder="Hero Description..." 
            rows={3} 
            className={`w-full p-2 border rounded ${!form.heroDescription ? 'border-red-300' : 'border-gray-300'}`}
          />
        </div>

        {/* --- 2. ABOUT ISEE --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">All About ISEE <span className="text-red-500">*</span></h3>
          <input 
            name="aboutHeading" 
            value={form.aboutHeading} 
            onChange={handleChange} 
            placeholder="Heading" 
            className={`w-full mb-3 p-2 border rounded ${!form.aboutHeading ? 'border-red-300' : 'border-gray-300'}`}
          />
          <textarea 
            name="aboutDescription" 
            value={form.aboutDescription} 
            onChange={handleChange} 
            placeholder="Description..." 
            rows={3} 
            className={`w-full mb-3 p-2 border rounded ${!form.aboutDescription ? 'border-red-300' : 'border-gray-300'}`}
          />
          
          <label className="text-sm font-semibold text-gray-600">Bullet Points <span className="text-red-500">*</span></label>
          {form.aboutPoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input 
                value={pt} 
                onChange={(e)=>handleListChange(i, e.target.value, 'aboutPoints')} 
                className={`w-full p-2 border rounded ${!pt ? 'border-red-300' : 'border-gray-300'}`}
              />
              <button onClick={()=>removeListItem(i, 'aboutPoints')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('aboutPoints')} className="text-blue-600 text-sm mb-3">+ Add Point</button>
          
          <input name="aboutFooter" value={form.aboutFooter} onChange={handleChange} placeholder="Footer Note (Optional)" className="w-full p-2 border rounded" />
        </div>

        {/* --- 3. PURPOSE --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Purpose of ISEE <span className="text-red-500">*</span></h3>
          <input 
            name="purposeHeading" 
            value={form.purposeHeading} 
            onChange={handleChange} 
            placeholder="Heading" 
            className={`w-full mb-3 p-2 border rounded ${!form.purposeHeading ? 'border-red-300' : 'border-gray-300'}`}
          />
          {form.purposePoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input 
                value={pt} 
                onChange={(e)=>handleListChange(i, e.target.value, 'purposePoints')} 
                className={`w-full p-2 border rounded ${!pt ? 'border-red-300' : 'border-gray-300'}`}
              />
              <button onClick={()=>removeListItem(i, 'purposePoints')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('purposePoints')} className="text-blue-600 text-sm">+ Add Purpose Point</button>
        </div>

        {/* --- 4. STRUCTURE & LEVELS --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure & Levels <span className="text-red-500">*</span></h3>
          <input 
            name="structureHeading" 
            value={form.structureHeading} 
            onChange={handleChange} 
            placeholder="Heading" 
            className={`w-full mb-3 p-2 border rounded ${!form.structureHeading ? 'border-red-300' : 'border-gray-300'}`}
          />
          
          {/* Levels List */}
          <div className="bg-blue-50 p-4 rounded mb-4">
             <input name="structureLevelIntro" value={form.structureLevelIntro} onChange={handleChange} placeholder="Levels Intro" className="w-full mb-2 p-2 border rounded bg-white" />
             {form.structureLevels.map((pt, i) => (
                <div key={i} className="flex gap-2 mb-2">
                <input 
                    value={pt} 
                    onChange={(e)=>handleListChange(i, e.target.value, 'structureLevels')} 
                    className={`w-full p-2 border rounded ${!pt ? 'border-red-300' : 'border-gray-300'}`} 
                    placeholder="Level Name" 
                />
                <button onClick={()=>removeListItem(i, 'structureLevels')} className="text-red-500">✕</button>
                </div>
            ))}
            <button onClick={()=>addListItem('structureLevels')} className="text-blue-600 text-sm">+ Add Level</button>
          </div>

          {/* Sections List */}
          <div className="bg-green-50 p-4 rounded">
             <input name="structureSectionIntro" value={form.structureSectionIntro} onChange={handleChange} placeholder="Sections Intro" className="w-full mb-2 p-2 border rounded bg-white" />
             {form.structureSections.map((pt, i) => (
                <div key={i} className="flex gap-2 mb-2">
                <input 
                    value={pt} 
                    onChange={(e)=>handleListChange(i, e.target.value, 'structureSections')} 
                    className={`w-full p-2 border rounded ${!pt ? 'border-red-300' : 'border-gray-300'}`} 
                    placeholder="Section Name" 
                />
                <button onClick={()=>removeListItem(i, 'structureSections')} className="text-red-500">✕</button>
                </div>
            ))}
            <button onClick={()=>addListItem('structureSections')} className="text-blue-600 text-sm">+ Add Section</button>
          </div>
        </div>

        {/* --- 5. WHAT SECTIONS MEASURE --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">What Sections Measure <span className="text-red-500">*</span></h3>
          <input 
            name="measureHeading" 
            value={form.measureHeading} 
            onChange={handleChange} 
            placeholder="Heading" 
            className={`w-full mb-3 p-2 border rounded ${!form.measureHeading ? 'border-red-300' : 'border-gray-300'}`}
          />
          {form.measurePoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input 
                value={pt} 
                onChange={(e)=>handleListChange(i, e.target.value, 'measurePoints')} 
                className={`w-full p-2 border rounded ${!pt ? 'border-red-300' : 'border-gray-300'}`} 
                placeholder="e.g. Verbal Reasoning..." 
              />
              <button onClick={()=>removeListItem(i, 'measurePoints')} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('measurePoints')} className="text-blue-600 text-sm">+ Add Point</button>
        </div>

        {/* --- 6. REGISTRATION DETAILS --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Registration Details <span className="text-red-500">*</span></h3>
          <input 
            name="registrationHeading" 
            value={form.registrationHeading} 
            onChange={handleChange} 
            placeholder="Heading" 
            className={`w-full mb-3 p-2 border rounded ${!form.registrationHeading ? 'border-red-300' : 'border-gray-300'}`}
          />
          <textarea 
            name="registrationDescription" 
            value={form.registrationDescription} 
            onChange={handleChange} 
            placeholder="Details paragraphs..." 
            rows={4} 
            className={`w-full p-2 border rounded ${!form.registrationDescription ? 'border-red-300' : 'border-gray-300'}`}
          />
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