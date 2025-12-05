// // @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function AmcTestPrepAdmin() {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("educationToken");

//   // --- Initial State ---
//   const initialState = {
//     heroTitle: "",
//     heroDescription: "",
//     aboutHeading: "",
//     aboutDescription: "",
//     participationHeading: "",
//     participationPoints: [""],
//     competitionsHeading: "",
//     competitionCards: [
//       { title: "", description: "", whenText: "", whoText: "" }
//     ],
//     whyHeading: "",
//     whyDescription: ""
//   };

//   const [form, setForm] = useState(initialState);

//   // --- Fetch Data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/amc-test`,
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

//   // List Handler (For Participation Points)
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

//   // Card Object Handler (For Competitions)
//   const handleCardChange = (index, field, value) => {
//     const updated = [...form.competitionCards];
//     updated[index][field] = value;
//     setForm({ ...form, competitionCards: updated });
//   };
//   const addCard = () => setForm({ 
//     ...form, 
//     competitionCards: [...form.competitionCards, { title: "", description: "", whenText: "", whoText: "" }] 
//   });
//   const removeCard = (index) => {
//     const updated = form.competitionCards.filter((_, i) => i !== index);
//     setForm({ ...form, competitionCards: updated });
//   };

//   // --- Actions ---
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/amc-test`, form, {
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       toast.success("AMC Page Saved");
//     } catch (err) {
//       toast.error("Save Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete ALL AMC data?")) return;
//     try {
//       setLoading(true);
//       await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/amc-test`, {
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
//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">AMC PreTest Section</h2>

//         {/* --- 1. HERO --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
//           <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. AMC TEST PREP)" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description (At GGES...)" rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 2. ABOUT AMC --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">About AMC Test</h3>
//           <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="About Heading" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="About Description..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 3. WHO CAN PARTICIPATE --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Who Can Participate?</h3>
//           <input name="participationHeading" value={form.participationHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
//           <label className="text-sm font-semibold">Bullet Points:</label>
//           {form.participationPoints.map((pt, i) => (
//             <div key={i} className="flex gap-2 mb-2 mt-1">
//               <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'participationPoints')} className="w-full p-2 border rounded" placeholder="e.g. Students: Middle and high school..." />
//               <button onClick={()=>removeListItem(i, 'participationPoints')} className="text-red-500">✕</button>
//             </div>
//           ))}
//           <button onClick={()=>addListItem('participationPoints')} className="text-blue-600 text-sm mt-1">+ Add Point</button>
//         </div>

//         {/* --- 4. COMPETITIONS (CARDS) --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Different AMC Competitions</h3>
//           <input name="competitionsHeading" value={form.competitionsHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-4 p-2 border rounded font-bold" />

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//              {form.competitionCards.map((card, i) => (
//                <div key={i} className="border p-4 rounded bg-gray-50 relative">
//                  <button onClick={()=>removeCard(i)} className="absolute top-2 right-2 text-red-500 font-bold">✕</button>
                 
//                  <input value={card.title} onChange={(e)=>handleCardChange(i, 'title', e.target.value)} placeholder="Title (e.g. AMC 8)" className="w-full mb-2 p-1 border rounded font-bold" />
                 
//                  <textarea value={card.description} onChange={(e)=>handleCardChange(i, 'description', e.target.value)} placeholder="Description (25 questions...)" rows={3} className="w-full mb-2 p-1 border rounded text-sm" />
                 
//                  <input value={card.whenText} onChange={(e)=>handleCardChange(i, 'whenText', e.target.value)} placeholder="When: January annually" className="w-full mb-2 p-1 border rounded text-sm bg-white" />
                 
//                  <input value={card.whoText} onChange={(e)=>handleCardChange(i, 'whoText', e.target.value)} placeholder="Who: Students under 15..." className="w-full p-1 border rounded text-sm bg-white" />
//                </div>
//              ))}
//           </div>
//           <button onClick={addCard} className="mt-3 text-blue-600 text-sm font-semibold">+ Add Competition Card</button>
//         </div>

//         {/* --- 5. WHY TAKE AMC --- */}
//         <div className="mb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Why Take AMC?</h3>
//           <input name="whyHeading" value={form.whyHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="whyDescription" value={form.whyDescription} onChange={handleChange} placeholder="Description (AMC 10/12 aims to...)" rows={4} className="w-full p-2 border rounded" />
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

export default function AmcTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    participationHeading: "",
    participationPoints: [""],
    competitionsHeading: "",
    competitionCards: [
      { title: "", description: "", whenText: "", whoText: "" }
    ],
    whyHeading: "",
    whyDescription: ""
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/amc-test`,
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

  // List Handler
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

  // Card Object Handler
  const handleCardChange = (index, field, value) => {
    const updated = [...form.competitionCards];
    updated[index][field] = value;
    setForm({ ...form, competitionCards: updated });
  };
  const addCard = () => setForm({ 
    ...form, 
    competitionCards: [...form.competitionCards, { title: "", description: "", whenText: "", whoText: "" }] 
  });
  const removeCard = (index) => {
    const updated = form.competitionCards.filter((_, i) => i !== index);
    setForm({ ...form, competitionCards: updated });
  };

  // --- Validation Logic ---
  const validateForm = () => {
    // 1. Check Simple Fields
    const requiredFields = [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroDescription", label: "Hero Description" },
      { key: "aboutHeading", label: "About Heading" },
      { key: "aboutDescription", label: "About Description" },
      { key: "participationHeading", label: "Participation Heading" },
      { key: "competitionsHeading", label: "Competitions Heading" },
      { key: "whyHeading", label: "Why Heading" },
      { key: "whyDescription", label: "Why Description" },
    ];

    for (const field of requiredFields) {
      if (!form[field.key] || !form[field.key].trim()) {
        toast.error(`${field.label} is required!`);
        return false;
      }
    }

    // 2. Check Participation Points List
    if (form.participationPoints.length === 0 || form.participationPoints.some(pt => !pt.trim())) {
      toast.error("All Participation Points must be filled (at least one required).");
      return false;
    }

    // 3. Check Competition Cards
    if (form.competitionCards.length === 0) {
      toast.error("At least one Competition Card is required.");
      return false;
    }
    for (const [index, card] of form.competitionCards.entries()) {
      if (!card.title.trim() || !card.description.trim() || !card.whenText.trim() || !card.whoText.trim()) {
        toast.error(`All fields in Competition Card #${index + 1} are required.`);
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
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/amc-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("AMC Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL AMC data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/amc-test`, {
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
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">AMC PreTest Section</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          
          <label className="block text-sm font-semibold mb-1">Hero Title <ReqStar /></label>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title (e.g. AMC TEST PREP)" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Hero Description <ReqStar /></label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description (At GGES...)" rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- 2. ABOUT AMC --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">About AMC Test</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="About Heading" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} placeholder="About Description..." rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* --- 3. WHO CAN PARTICIPATE --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Who Can Participate?</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="participationHeading" value={form.participationHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
          <label className="text-sm font-semibold block mb-1">Bullet Points <ReqStar />:</label>
          {form.participationPoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2 mt-1">
              <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'participationPoints')} className="w-full p-2 border rounded" placeholder="e.g. Students: Middle and high school..." />
              <button onClick={()=>removeListItem(i, 'participationPoints')} className="text-red-500 font-bold">✕</button>
            </div>
          ))}
          <button onClick={()=>addListItem('participationPoints')} className="text-blue-600 text-sm mt-1">+ Add Point</button>
        </div>

        {/* --- 4. COMPETITIONS (CARDS) --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Different AMC Competitions</h3>
          
          <label className="block text-sm font-semibold mb-1">Section Heading <ReqStar /></label>
          <input name="competitionsHeading" value={form.competitionsHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-4 p-2 border rounded font-bold" />

          <label className="block text-sm font-semibold mb-2">Competition Cards (All fields required) <ReqStar /></label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {form.competitionCards.map((card, i) => (
               <div key={i} className="border p-4 rounded bg-gray-50 relative border-gray-200 shadow-sm">
                 <button onClick={()=>removeCard(i)} className="absolute top-2 right-2 text-red-500 font-bold">✕</button>
                 
                 <label className="text-xs font-bold text-gray-500">Title</label>
                 <input value={card.title} onChange={(e)=>handleCardChange(i, 'title', e.target.value)} placeholder="e.g. AMC 8" className="w-full mb-2 p-1 border rounded font-bold" />
                 
                 <label className="text-xs font-bold text-gray-500">Description</label>
                 <textarea value={card.description} onChange={(e)=>handleCardChange(i, 'description', e.target.value)} placeholder="25 questions..." rows={3} className="w-full mb-2 p-1 border rounded text-sm" />
                 
                 <label className="text-xs font-bold text-gray-500">When</label>
                 <input value={card.whenText} onChange={(e)=>handleCardChange(i, 'whenText', e.target.value)} placeholder="e.g. January annually" className="w-full mb-2 p-1 border rounded text-sm bg-white" />
                 
                 <label className="text-xs font-bold text-gray-500">Who</label>
                 <input value={card.whoText} onChange={(e)=>handleCardChange(i, 'whoText', e.target.value)} placeholder="e.g. Students under 15" className="w-full p-1 border rounded text-sm bg-white" />
               </div>
             ))}
          </div>
          <button onClick={addCard} className="mt-3 text-blue-600 text-sm font-semibold">+ Add Competition Card</button>
        </div>

        {/* --- 5. WHY TAKE AMC --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Why Take AMC?</h3>
          
          <label className="block text-sm font-semibold mb-1">Heading <ReqStar /></label>
          <input name="whyHeading" value={form.whyHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-3 p-2 border rounded" />
          
          <label className="block text-sm font-semibold mb-1">Description <ReqStar /></label>
          <textarea name="whyDescription" value={form.whyDescription} onChange={handleChange} placeholder="Description (AMC 10/12 aims to...)" rows={4} className="w-full p-2 border rounded" />
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