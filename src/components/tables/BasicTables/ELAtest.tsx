// // @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function ElaTestPrepAdmin() {
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("educationToken");

//   // --- Initial State ---
//   const initialState = {
//     heroTitle: "",
//     heroDescription: "",
//     introHeading: "",
//     introDescription: "",
//     quickFactsHeading: "",
//     quickFactsList: [""],
//     scoringHeading: "",
//     scoringDescription: "",
//     testSectionHeading: "",
//     componentsHeading: "",
//     componentsPoints: [""],
//     administrationHeading: "",
//     administrationPoints: [""],
//     preparationHeading: "",
//     preparationCards: [{ title: "", description: "" }],
//     moreDetailsHeading: "",
//     moreDetailsDescription: "",
//     faqHeading: "",
//     faqList: [{ question: "", answer: "" }]
//   };

//   const [form, setForm] = useState(initialState);

//   // --- Fetch Data ---
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/ela-test`,
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

//   // Generic List Handler (For Quick Facts, Points)
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

//   // Generic Object Array Handler (For Cards, FAQs)
//   const handleObjectArrayChange = (index, field, value, arrayName) => {
//     const updated = [...form[arrayName]];
//     updated[index][field] = value;
//     setForm({ ...form, [arrayName]: updated });
//   };
//   const addObjectItem = (arrayName, template) => setForm({ ...form, [arrayName]: [...form[arrayName], template] });
//   const removeObjectItem = (index, arrayName) => {
//     const updated = form[arrayName].filter((_, i) => i !== index);
//     setForm({ ...form, [arrayName]: updated });
//   };

//   // --- Actions ---
//   const handleSave = async () => {
//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/ela-test`, form, {
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       toast.success("ELA Page Saved");
//     } catch (err) {
//       toast.error("Save Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete ALL ELA data?")) return;
//     try {
//       setLoading(true);
//       await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/ela-test`, {
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
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl border-t-4 border-blue-600 p-8">
//         <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">ELA PreTest Section</h2>

//         {/* --- 1. HERO --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
//           <input name="heroTitle" value={form.heroTitle} onChange={handleChange} placeholder="Main Title" className="w-full mb-3 p-2 border rounded" />
//           <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} placeholder="Hero Description..." rows={3} className="w-full p-2 border rounded" />
//         </div>

//         {/* --- 2. INTRO & SIDEBAR (Split View) --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 border-b pb-6">
          
//           {/* Left: Intro */}
//           <div className="lg:col-span-2">
//             <h3 className="font-bold text-lg mb-3 text-gray-700">Intro (Left Content)</h3>
//             <input name="introHeading" value={form.introHeading} onChange={handleChange} placeholder="Intro Heading" className="w-full mb-3 p-2 border rounded" />
//             <textarea name="introDescription" value={form.introDescription} onChange={handleChange} placeholder="Intro Text..." rows={10} className="w-full p-2 border rounded" />
//           </div>

//           {/* Right: Sidebar */}
//           <div className="bg-blue-50 p-4 rounded-xl">
//             <h3 className="font-bold text-lg mb-3 text-blue-800">Sidebar (Right)</h3>
            
//             {/* Quick Facts */}
//             <div className="mb-4 bg-white p-3 rounded shadow-sm">
//                <input name="quickFactsHeading" value={form.quickFactsHeading} onChange={handleChange} placeholder="Quick Facts Heading" className="w-full mb-2 p-2 border rounded font-bold" />
//                {form.quickFactsList.map((pt, i) => (
//                   <div key={i} className="flex gap-1 mb-1">
//                     <input value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'quickFactsList')} className="w-full p-1 border rounded text-sm" placeholder="e.g. Grades: 3-10" />
//                     <button onClick={()=>removeListItem(i, 'quickFactsList')} className="text-red-500 text-sm font-bold px-1">✕</button>
//                   </div>
//                ))}
//                <button onClick={()=>addListItem('quickFactsList')} className="text-blue-600 text-xs mt-1">+ Add Fact</button>
//             </div>

//             {/* Scoring */}
//             <div className="bg-white p-3 rounded shadow-sm">
//                <input name="scoringHeading" value={form.scoringHeading} onChange={handleChange} placeholder="Scoring Heading" className="w-full mb-2 p-2 border rounded font-bold" />
//                <textarea name="scoringDescription" value={form.scoringDescription} onChange={handleChange} placeholder="Scoring info..." rows={4} className="w-full p-2 border rounded text-sm" />
//             </div>
//           </div>
//         </div>

//         {/* --- 3. WHAT IS ON THE TEST --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">"What is on the test?" Section</h3>
//           <input name="testSectionHeading" value={form.testSectionHeading} onChange={handleChange} placeholder="Main Heading" className="w-full mb-4 p-2 border rounded font-bold" />
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//              {/* Core Components */}
//              <div className="bg-gray-50 p-4 rounded">
//                 <input name="componentsHeading" value={form.componentsHeading} onChange={handleChange} placeholder="Sub-heading 1" className="w-full mb-2 p-2 border rounded font-semibold" />
//                 {form.componentsPoints.map((pt, i) => (
//                   <div key={i} className="flex gap-2 mb-2">
//                     <textarea value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'componentsPoints')} className="w-full p-2 border rounded" rows={2} placeholder="Point..." />
//                     <button onClick={()=>removeListItem(i, 'componentsPoints')} className="text-red-500">✕</button>
//                   </div>
//                 ))}
//                 <button onClick={()=>addListItem('componentsPoints')} className="text-blue-600 text-sm">+ Add Point</button>
//              </div>

//              {/* Administration */}
//              <div className="bg-gray-50 p-4 rounded">
//                 <input name="administrationHeading" value={form.administrationHeading} onChange={handleChange} placeholder="Sub-heading 2" className="w-full mb-2 p-2 border rounded font-semibold" />
//                 {form.administrationPoints.map((pt, i) => (
//                   <div key={i} className="flex gap-2 mb-2">
//                     <textarea value={pt} onChange={(e)=>handleListChange(i, e.target.value, 'administrationPoints')} className="w-full p-2 border rounded" rows={2} placeholder="Point..." />
//                     <button onClick={()=>removeListItem(i, 'administrationPoints')} className="text-red-500">✕</button>
//                   </div>
//                 ))}
//                 <button onClick={()=>addListItem('administrationPoints')} className="text-blue-600 text-sm">+ Add Point</button>
//              </div>
//           </div>
//         </div>

//         {/* --- 4. PREPARATION (3 Cards) --- */}
//         <div className="mb-6 border-b pb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">Preparation Cards</h3>
//           <input name="preparationHeading" value={form.preparationHeading} onChange={handleChange} placeholder="Heading" className="w-full mb-4 p-2 border rounded" />
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//              {form.preparationCards.map((card, i) => (
//                <div key={i} className="border p-3 rounded relative bg-yellow-50">
//                  <button onClick={()=>removeObjectItem(i, 'preparationCards')} className="absolute top-1 right-1 text-red-500 text-xs">✕</button>
//                  <input value={card.title} onChange={(e)=>handleObjectArrayChange(i, 'title', e.target.value, 'preparationCards')} placeholder="Title" className="w-full mb-2 p-1 border rounded font-bold" />
//                  <textarea value={card.description} onChange={(e)=>handleObjectArrayChange(i, 'description', e.target.value, 'preparationCards')} placeholder="Desc..." rows={3} className="w-full p-1 border rounded text-sm" />
//                </div>
//              ))}
//           </div>
//           <button onClick={()=>addObjectItem('preparationCards', { title: "", description: "" })} className="mt-3 text-blue-600 text-sm font-semibold">+ Add Prep Card</button>
//         </div>

//         {/* --- 5. MORE DETAILS & FAQ --- */}
//         <div className="mb-6">
//           <h3 className="font-bold text-lg mb-3 text-gray-700">More Details & FAQs</h3>
//           <input name="moreDetailsHeading" value={form.moreDetailsHeading} onChange={handleChange} placeholder="More Details Heading" className="w-full mb-2 p-2 border rounded" />
//           <textarea name="moreDetailsDescription" value={form.moreDetailsDescription} onChange={handleChange} placeholder="More Details Text..." rows={3} className="w-full mb-4 p-2 border rounded" />

//           <input name="faqHeading" value={form.faqHeading} onChange={handleChange} placeholder="FAQ Heading" className="w-full mb-3 p-2 border rounded font-bold" />
          
//           <div className="space-y-3">
//             {form.faqList.map((faq, i) => (
//               <div key={i} className="border p-4 rounded bg-gray-50">
//                  <div className="flex justify-between mb-2">
//                     <span className="text-xs font-bold text-gray-500">FAQ Item {i+1}</span>
//                     <button onClick={()=>removeObjectItem(i, 'faqList')} className="text-red-500 text-sm">Remove</button>
//                  </div>
//                  <input value={faq.question} onChange={(e)=>handleObjectArrayChange(i, 'question', e.target.value, 'faqList')} placeholder="Question" className="w-full mb-2 p-2 border rounded font-semibold" />
//                  <textarea value={faq.answer} onChange={(e)=>handleObjectArrayChange(i, 'answer', e.target.value, 'faqList')} placeholder="Answer" rows={2} className="w-full p-2 border rounded" />
//               </div>
//             ))}
//           </div>
//           <button onClick={()=>addObjectItem('faqList', { question: "", answer: "" })} className="mt-3 text-blue-600 text-sm font-semibold">+ Add FAQ</button>
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

export default function ElaTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    introHeading: "",
    introDescription: "",
    quickFactsHeading: "",
    quickFactsList: [""],
    scoringHeading: "",
    scoringDescription: "",
    testSectionHeading: "",
    componentsHeading: "",
    componentsPoints: [""],
    administrationHeading: "",
    administrationPoints: [""],
    preparationHeading: "",
    preparationCards: [{ title: "", description: "" }],
    moreDetailsHeading: "",
    moreDetailsDescription: "",
    faqHeading: "",
    faqList: [{ question: "", answer: "" }]
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/ela-test`,
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

  // Generic List Handler
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

  // Generic Object Array Handler
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

  // --- Actions (Save with Validation) ---
  const handleSave = async () => {
    // --- VALIDATION START ---

    // 1. Hero & Intro
    if (!form.heroTitle.trim()) return toast.error("Hero Title is required!");
    if (!form.heroDescription.trim()) return toast.error("Hero Description is required!");
    if (!form.introHeading.trim()) return toast.error("Intro Heading is required!");
    if (!form.introDescription.trim()) return toast.error("Intro Description is required!");

    // 2. Sidebar (Quick Facts & Scoring)
    if (!form.quickFactsHeading.trim()) return toast.error("Quick Facts Heading is required!");
    const validFacts = form.quickFactsList.filter(f => f.trim() !== "");
    if (validFacts.length === 0) return toast.error("At least one Quick Fact is required!");

    if (!form.scoringHeading.trim()) return toast.error("Scoring Heading is required!");
    if (!form.scoringDescription.trim()) return toast.error("Scoring Description is required!");

    // 3. Test Sections
    if (!form.testSectionHeading.trim()) return toast.error("Test Section Main Heading is required!");
    
    if (!form.componentsHeading.trim()) return toast.error("Components Heading is required!");
    const validComponents = form.componentsPoints.filter(p => p.trim() !== "");
    if (validComponents.length === 0) return toast.error("At least one Component Point is required!");

    if (!form.administrationHeading.trim()) return toast.error("Administration Heading is required!");
    const validAdministration = form.administrationPoints.filter(p => p.trim() !== "");
    if (validAdministration.length === 0) return toast.error("At least one Administration Point is required!");

    // 4. Preparation Cards
    if (!form.preparationHeading.trim()) return toast.error("Preparation Heading is required!");
    const validPrepCards = form.preparationCards.filter(c => c.title.trim() !== "" && c.description.trim() !== "");
    if (validPrepCards.length === 0) return toast.error("At least one valid Preparation Card is required!");

    // 5. More Details & FAQs
    if (!form.moreDetailsHeading.trim()) return toast.error("More Details Heading is required!");
    if (!form.moreDetailsDescription.trim()) return toast.error("More Details Text is required!");
    
    if (!form.faqHeading.trim()) return toast.error("FAQ Heading is required!");
    const validFaqs = form.faqList.filter(f => f.question.trim() !== "" && f.answer.trim() !== "");
    if (validFaqs.length === 0) return toast.error("At least one valid FAQ is required!");

    // Prepare Clean Data
    const dataToSend = {
      ...form,
      quickFactsList: validFacts,
      componentsPoints: validComponents,
      administrationPoints: validAdministration,
      preparationCards: validPrepCards,
      faqList: validFaqs
    };
    // --- VALIDATION END ---

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/ela-test`, dataToSend, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("ELA Page Saved Successfully");
      
      // Update form with clean data
      setForm(dataToSend);

    } catch (err) {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete ALL ELA data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/ela-test`, {
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
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl border-t-4 border-blue-600 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">ELA PreTest Section</h2>

        {/* --- 1. HERO --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section <span className="text-red-500">*</span></h3>
          <input 
            name="heroTitle" 
            value={form.heroTitle} 
            onChange={handleChange} 
            placeholder="Main Title" 
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

        {/* --- 2. INTRO & SIDEBAR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6 border-b pb-6">
          
          {/* Left: Intro */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-3 text-gray-700">Intro (Left Content) <span className="text-red-500">*</span></h3>
            <input 
              name="introHeading" 
              value={form.introHeading} 
              onChange={handleChange} 
              placeholder="Intro Heading" 
              className={`w-full mb-3 p-2 border rounded ${!form.introHeading ? 'border-red-300' : 'border-gray-300'}`} 
            />
            <textarea 
              name="introDescription" 
              value={form.introDescription} 
              onChange={handleChange} 
              placeholder="Intro Text..." 
              rows={10} 
              className={`w-full p-2 border rounded ${!form.introDescription ? 'border-red-300' : 'border-gray-300'}`} 
            />
          </div>

          {/* Right: Sidebar */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-bold text-lg mb-3 text-blue-800">Sidebar (Right)</h3>
            
            {/* Quick Facts */}
            <div className="mb-4 bg-white p-3 rounded shadow-sm">
               <label className="text-xs font-bold text-gray-600">Quick Facts Heading <span className="text-red-500">*</span></label>
               <input 
                 name="quickFactsHeading" 
                 value={form.quickFactsHeading} 
                 onChange={handleChange} 
                 placeholder="Quick Facts Heading" 
                 className={`w-full mb-2 p-2 border rounded font-bold ${!form.quickFactsHeading ? 'border-red-300' : 'border-gray-300'}`} 
               />
               
               <label className="text-xs font-bold text-gray-600">Fact Points <span className="text-red-500">*</span></label>
               {form.quickFactsList.map((pt, i) => (
                  <div key={i} className="flex gap-1 mb-1">
                    <input 
                      value={pt} 
                      onChange={(e)=>handleListChange(i, e.target.value, 'quickFactsList')} 
                      className={`w-full p-1 border rounded text-sm ${!pt ? 'border-red-300' : 'border-gray-300'}`} 
                      placeholder="e.g. Grades: 3-10" 
                    />
                    <button onClick={()=>removeListItem(i, 'quickFactsList')} className="text-red-500 text-sm font-bold px-1">✕</button>
                  </div>
               ))}
               <button onClick={()=>addListItem('quickFactsList')} className="text-blue-600 text-xs mt-1">+ Add Fact</button>
            </div>

            {/* Scoring */}
            <div className="bg-white p-3 rounded shadow-sm">
               <label className="text-xs font-bold text-gray-600">Scoring Heading <span className="text-red-500">*</span></label>
               <input 
                 name="scoringHeading" 
                 value={form.scoringHeading} 
                 onChange={handleChange} 
                 placeholder="Scoring Heading" 
                 className={`w-full mb-2 p-2 border rounded font-bold ${!form.scoringHeading ? 'border-red-300' : 'border-gray-300'}`} 
               />
               <textarea 
                 name="scoringDescription" 
                 value={form.scoringDescription} 
                 onChange={handleChange} 
                 placeholder="Scoring info..." 
                 rows={4} 
                 className={`w-full p-2 border rounded text-sm ${!form.scoringDescription ? 'border-red-300' : 'border-gray-300'}`} 
               />
            </div>
          </div>
        </div>

        {/* --- 3. WHAT IS ON THE TEST --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">"What is on the test?" Section <span className="text-red-500">*</span></h3>
          <input 
            name="testSectionHeading" 
            value={form.testSectionHeading} 
            onChange={handleChange} 
            placeholder="Main Heading" 
            className={`w-full mb-4 p-2 border rounded font-bold ${!form.testSectionHeading ? 'border-red-300' : 'border-gray-300'}`} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Core Components */}
             <div className="bg-gray-50 p-4 rounded">
                <input 
                  name="componentsHeading" 
                  value={form.componentsHeading} 
                  onChange={handleChange} 
                  placeholder="Sub-heading 1" 
                  className={`w-full mb-2 p-2 border rounded font-semibold ${!form.componentsHeading ? 'border-red-300' : 'border-gray-300'}`} 
                />
                {form.componentsPoints.map((pt, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <textarea 
                      value={pt} 
                      onChange={(e)=>handleListChange(i, e.target.value, 'componentsPoints')} 
                      className={`w-full p-2 border rounded ${!pt ? 'border-red-300' : 'border-gray-300'}`} 
                      rows={2} 
                      placeholder="Point..." 
                    />
                    <button onClick={()=>removeListItem(i, 'componentsPoints')} className="text-red-500">✕</button>
                  </div>
                ))}
                <button onClick={()=>addListItem('componentsPoints')} className="text-blue-600 text-sm">+ Add Point</button>
             </div>

             {/* Administration */}
             <div className="bg-gray-50 p-4 rounded">
                <input 
                  name="administrationHeading" 
                  value={form.administrationHeading} 
                  onChange={handleChange} 
                  placeholder="Sub-heading 2" 
                  className={`w-full mb-2 p-2 border rounded font-semibold ${!form.administrationHeading ? 'border-red-300' : 'border-gray-300'}`} 
                />
                {form.administrationPoints.map((pt, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <textarea 
                      value={pt} 
                      onChange={(e)=>handleListChange(i, e.target.value, 'administrationPoints')} 
                      className={`w-full p-2 border rounded ${!pt ? 'border-red-300' : 'border-gray-300'}`} 
                      rows={2} 
                      placeholder="Point..." 
                    />
                    <button onClick={()=>removeListItem(i, 'administrationPoints')} className="text-red-500">✕</button>
                  </div>
                ))}
                <button onClick={()=>addListItem('administrationPoints')} className="text-blue-600 text-sm">+ Add Point</button>
             </div>
          </div>
        </div>

        {/* --- 4. PREPARATION (3 Cards) --- */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Preparation Cards <span className="text-red-500">*</span></h3>
          <input 
            name="preparationHeading" 
            value={form.preparationHeading} 
            onChange={handleChange} 
            placeholder="Heading" 
            className={`w-full mb-4 p-2 border rounded ${!form.preparationHeading ? 'border-red-300' : 'border-gray-300'}`} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {form.preparationCards.map((card, i) => (
               <div key={i} className="border p-3 rounded relative bg-yellow-50">
                 <button onClick={()=>removeObjectItem(i, 'preparationCards')} className="absolute top-1 right-1 text-red-500 text-xs">✕</button>
                 <input 
                   value={card.title} 
                   onChange={(e)=>handleObjectArrayChange(i, 'title', e.target.value, 'preparationCards')} 
                   placeholder="Title" 
                   className={`w-full mb-2 p-1 border rounded font-bold ${!card.title ? 'border-red-300' : 'border-gray-300'}`} 
                 />
                 <textarea 
                   value={card.description} 
                   onChange={(e)=>handleObjectArrayChange(i, 'description', e.target.value, 'preparationCards')} 
                   placeholder="Desc..." 
                   rows={3} 
                   className={`w-full p-1 border rounded text-sm ${!card.description ? 'border-red-300' : 'border-gray-300'}`} 
                 />
               </div>
             ))}
          </div>
          <button onClick={()=>addObjectItem('preparationCards', { title: "", description: "" })} className="mt-3 text-blue-600 text-sm font-semibold">+ Add Prep Card</button>
        </div>

        {/* --- 5. MORE DETAILS & FAQ --- */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">More Details & FAQs <span className="text-red-500">*</span></h3>
          <input 
            name="moreDetailsHeading" 
            value={form.moreDetailsHeading} 
            onChange={handleChange} 
            placeholder="More Details Heading" 
            className={`w-full mb-2 p-2 border rounded ${!form.moreDetailsHeading ? 'border-red-300' : 'border-gray-300'}`} 
          />
          <textarea 
            name="moreDetailsDescription" 
            value={form.moreDetailsDescription} 
            onChange={handleChange} 
            placeholder="More Details Text..." 
            rows={3} 
            className={`w-full mb-4 p-2 border rounded ${!form.moreDetailsDescription ? 'border-red-300' : 'border-gray-300'}`} 
          />

          <input 
            name="faqHeading" 
            value={form.faqHeading} 
            onChange={handleChange} 
            placeholder="FAQ Heading" 
            className={`w-full mb-3 p-2 border rounded font-bold ${!form.faqHeading ? 'border-red-300' : 'border-gray-300'}`} 
          />
          
          <div className="space-y-3">
            {form.faqList.map((faq, i) => (
              <div key={i} className="border p-4 rounded bg-gray-50">
                 <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500">FAQ Item {i+1}</span>
                    <button onClick={()=>removeObjectItem(i, 'faqList')} className="text-red-500 text-sm">Remove</button>
                 </div>
                 <input 
                   value={faq.question} 
                   onChange={(e)=>handleObjectArrayChange(i, 'question', e.target.value, 'faqList')} 
                   placeholder="Question" 
                   className={`w-full mb-2 p-2 border rounded font-semibold ${!faq.question ? 'border-red-300' : 'border-gray-300'}`} 
                 />
                 <textarea 
                   value={faq.answer} 
                   onChange={(e)=>handleObjectArrayChange(i, 'answer', e.target.value, 'faqList')} 
                   placeholder="Answer" 
                   rows={2} 
                   className={`w-full p-2 border rounded ${!faq.answer ? 'border-red-300' : 'border-gray-300'}`} 
                 />
              </div>
            ))}
          </div>
          <button onClick={()=>addObjectItem('faqList', { question: "", answer: "" })} className="mt-3 text-blue-600 text-sm font-semibold">+ Add FAQ</button>
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