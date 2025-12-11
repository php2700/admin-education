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
    whatsHeading: "",
    whatsDescription: "",
    testSectionHeading: "",
    testList: [{ title: "", description: "" }],
    writePlacerDescription: "",
    writePlacerList: [{ title: "", description: "" }],
    accuplacerDescription: "",
    accuplacerList: [{ title: "", description: "" }]
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_APP_URL}api/admin/accuplacer-test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.data) {
        setForm({ ...initialState, ...res.data.data });
      }
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- Handlers ---
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleListChange = (listName, index, field, value) => {
    const updated = [...form[listName]];
    updated[index][field] = value;
    setForm({ ...form, [listName]: updated });
  };
  const addListItem = (listName) => setForm({ ...form, [listName]: [...form[listName], { title: "", description: "" }] });
  const removeListItem = (listName, index) => {
    const updated = form[listName].filter((_, i) => i !== index);
    setForm({ ...form, [listName]: updated });
  };

  const validateList = (listName, label) => {
    if (!form[listName].length) {
      toast.error(`At least one ${label} item is required.`);
      return false;
    }
    for (let i = 0; i < form[listName].length; i++) {
      const item = form[listName][i];
      if (!item.title.trim() || !item.description.trim()) {
        toast.error(`${label} item #${i + 1} is incomplete.`);
        return false;
      }
    }
    return true;
  };

  const validateForm = () => {
    const requiredFields = [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroDescription", label: "Hero Description" },
      { key: "aboutHeading", label: "About Heading" },
      { key: "aboutDescription", label: "About Description" },
      { key: "whatsHeading", label: "What's Heading" },
      { key: "whatsDescription", label: "What's Description" },
      { key: "testSectionHeading", label: "Test Section Heading" },
    ];
    for (const f of requiredFields) {
      if (!form[f.key]?.trim()) {
        toast.error(`${f.label} is required!`);
        return false;
      }
    }
    if (!validateList("testList", "Test List")) return false;
    if (!validateList("writePlacerList", "Write Placer List")) return false;
    if (!validateList("accuplacerList", "Accuplacer List")) return false;
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/accuplacer-test`, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      toast.success("Accuplacer Page Saved");
    } catch (err) {
      toast.error("Save Failed");
    } finally { setLoading(false); }
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
    } finally { setLoading(false); }
  };

  const ReqStar = () => <span className="text-red-500 ml-1">*</span>;

  const renderListSection = (title, listName) => (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-3 text-gray-700">{title}</h3>
      {form[listName].map((item, i) => (
        <div key={i} className="border p-4 rounded bg-gray-50 relative mb-2">
          <button onClick={() => removeListItem(listName, i)} className="absolute top-2 right-2 text-red-500 font-bold">✕</button>
          <input value={item.title} onChange={(e) => handleListChange(listName, i, "title", e.target.value)} placeholder="Title" className="w-full mb-2 p-2 border rounded font-bold" />
          <textarea value={item.description} onChange={(e) => handleListChange(listName, i, "description", e.target.value)} placeholder="Description..." rows={2} className="w-full p-2 border rounded text-sm" />
        </div>
      ))}
      <button onClick={() => addListItem(listName)} className="text-blue-600 text-sm mt-2">+ Add Item</button>
    </div>
  );

  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl border-t-4 border-blue-600 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Accuplacer Page Admin</h2>

        {/* HERO */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>
          <label className="block mb-1">Title <ReqStar /></label>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label className="block mb-1">Description <ReqStar /></label>
          <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* ABOUT */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">About Accuplacer</h3>
          <input name="aboutHeading" value={form.aboutHeading} onChange={handleChange} placeholder="Heading" className="w-full p-2 border rounded mb-2" />
          <textarea name="aboutDescription" value={form.aboutDescription} onChange={handleChange} rows={3} className="w-full p-2 border rounded mb-2" />
          <input name="whatsHeading" value={form.whatsHeading} onChange={handleChange} placeholder="What's Heading" className="w-full p-2 border rounded mb-2" />
          <textarea name="whatsDescription" value={form.whatsDescription} onChange={handleChange} rows={3} className="w-full p-2 border rounded" />
        </div>

        {/* TEST LIST */}
        {renderListSection("What's on the Tests", "testList")}

        {/* WRITE PLACER */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Write Placer Section</h3>
          <textarea value={form.writePlacerDescription} onChange={(e) => handleChange(e)} name="writePlacerDescription" placeholder="Description..." rows={3} className="w-full p-2 border rounded mb-2" />
          {renderListSection("Write Placer List", "writePlacerList")}
        </div>

        {/* ACCUPLACER SECTION */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Accuplacer Section</h3>
          <textarea value={form.accuplacerDescription} onChange={(e) => handleChange(e)} name="accuplacerDescription" placeholder="Description..." rows={3} className="w-full p-2 border rounded mb-2" />
          {renderListSection("Accuplacer List", "accuplacerList")}
        </div>

        {/* ACTIONS */}
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
