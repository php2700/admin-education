// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    ["link"],
    ["clean"],
  ],
};

export default function ISEETestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Correct initial state according to schema
  const initialState = {
    heroTitle: "",
    heroDescription: "",

    aboutHeading: "",
    aboutDescription: "",
    purposeHeading: "",
    purposePoints: [""],

    structureHeading: "",
    structureList: [{ title: "", description: "" }],

    measureHeading: "",
    measureList: [{ title: "", description: "" }],

    registrationHeading: "",
    registrationDescription: "",
  };

  const [form, setForm] = useState(initialState);

  // Fetch Data
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

  // Input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Array list change (simple string list)
  const handleListChange = (index, value, listName) => {
    const updated = [...form[listName]];
    updated[index] = value;
    setForm({ ...form, [listName]: updated });
  };

  const addListItem = (listName) =>
    setForm({ ...form, [listName]: [...form[listName], ""] });

  const removeListItem = (index, listName) =>
    setForm({
      ...form,
      [listName]: form[listName].filter((_, i) => i !== index),
    });

  // Object list change (title + description)
  const handleObjListChange = (index, key, value, listName) => {
    const updated = [...form[listName]];
    updated[index][key] = value;
    setForm({ ...form, [listName]: updated });
  };

  const addObjListItem = (listName) =>
    setForm({
      ...form,
      [listName]: [...form[listName], { title: "", description: "" }],
    });

  const removeObjListItem = (index, listName) =>
    setForm({
      ...form,
      [listName]: form[listName].filter((_, i) => i !== index),
    });

  // Save Data
  const handleSave = async () => {
    if (!form.heroTitle.trim()) return toast.error("Hero Title is required!");

    if (!form.aboutHeading.trim())
      return toast.error("About Heading required!");
    if (!form.purposeHeading.trim())
      return toast.error("Purpose Heading required!");
    if (!form.structureHeading.trim())
      return toast.error("Structure Heading required!");
    if (!form.measureHeading.trim())
      return toast.error("Measure Heading required!");
    if (!form.registrationHeading.trim())
      return toast.error("Registration Heading required!");
    if (!form.registrationDescription.trim())
      return toast.error("Registration description required!");

    const validPurpose = form.purposePoints.filter((p) => p.trim() !== "");
    const validStructure = form.structureList.filter(
      (p) => p.title.trim() || p.description.trim()
    );
    const validMeasure = form.measureList.filter(
      (p) => p.title.trim() || p.description.trim()
    );

    const payload = {
      ...form,
      purposePoints: validPurpose,
      structureList: validStructure,
      measureList: validMeasure,
    };

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/isee-test`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("ISEE Page Saved Successfully");
      setForm(payload);
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
    <div className="bg-gray-50 p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8 border-t-4 border-blue-600">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          ISEE Test Admin Panel
        </h1>

        {/* HERO */}
        <section className="mb-8 pb-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>

          <input
            name="heroTitle"
            value={form.heroTitle}
            onChange={handleChange}
            placeholder="Hero Title"
            className="w-full p-2 border rounded mb-3"
          />

          <textarea
            name="heroDescription"
            value={form.heroDescription}
            onChange={handleChange}
            rows={3}
            placeholder="Hero Description"
            className="w-full p-2 border rounded"
          />
        </section>

        {/* ABOUT */}
        <section className="mb-8 pb-6 border-b">
          <h2 className="text-xl font-semibold mb-4">About Section</h2>

          <input
            name="aboutHeading"
            value={form.aboutHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="About Heading"
          />

          <textarea
            name="aboutDescription"
            value={form.aboutDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            rows={3}
            placeholder="About Description"
          />
        </section>

        {/* PURPOSE */}
        <section className="mb-8 pb-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Purpose</h2>

          <input
            name="purposeHeading"
            value={form.purposeHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="Purpose Heading"
          />

          {form.purposePoints.map((pt, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={pt}
                onChange={(e) =>
                  handleListChange(i, e.target.value, "purposePoints")
                }
                className="w-full p-2 border rounded"
                placeholder="Purpose point"
              />
              <button
                onClick={() => removeListItem(i, "purposePoints")}
                className="px-2 text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => addListItem("purposePoints")}
            className="text-blue-600 text-sm"
          >
            + Add Purpose Point
          </button>
        </section>

        {/* STRUCTURE LIST */}
        <section className="mb-8 pb-6 border-b">
          <h2 className="text-xl font-semibold mb-4">
            Test Structure & Levels
          </h2>

          <input
            name="structureHeading"
            value={form.structureHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="Structure Heading"
          />

          {form.structureList.map((item, i) => (
            <div key={i} className="p-4 border rounded mb-3 bg-blue-50">
              <input
                value={item.title}
                onChange={(e) =>
                  handleObjListChange(
                    i,
                    "title",
                    e.target.value,
                    "structureList"
                  )
                }
                className="w-full p-2 border rounded mb-2"
                placeholder="Level / Section Title"
              />

              <textarea
                value={item.description}
                onChange={(e) =>
                  handleObjListChange(
                    i,
                    "description",
                    e.target.value,
                    "structureList"
                  )
                }
                className="w-full p-2 border rounded"
                rows={2}
                placeholder="Description"
              />

              <button
                onClick={() => removeObjListItem(i, "structureList")}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={() => addObjListItem("structureList")}
            className="text-blue-600 text-sm"
          >
            + Add Structure Item
          </button>
        </section>

        {/* MEASURE LIST */}
        <section className="mb-8 pb-6 border-b">
          <h2 className="text-xl font-semibold mb-4">What Sections Measure</h2>

          <input
            name="measureHeading"
            value={form.measureHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="Measure Heading"
          />

          {form.measureList.map((item, i) => (
            <div key={i} className="p-4 border rounded mb-3 bg-green-50">
              {/* <input
                value={item.title}
                onChange={(e) =>
                  handleObjListChange(
                    i,
                    "title",
                    e.target.value,
                    "measureList"
                  )
                }
                className="w-full p-2 border rounded mb-2"
                placeholder="Measure Title"
              /> */}
              <ReactQuill
                value={item.title}
                onChange={(value) =>
                  handleObjListChange(i, "title", value, "measureList")
                }
                placeholder="Measure Title"
                className="bg-white mb-2"
                     theme="snow"
                  modules={quillModules}
              />

              <textarea
                value={item.description}
                onChange={(e) =>
                  handleObjListChange(
                    i,
                    "description",
                    e.target.value,
                    "measureList"
                  )
                }
                className="w-full p-2 border rounded"
                rows={2}
                placeholder="Description"
              />

              <button
                onClick={() => removeObjListItem(i, "measureList")}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={() => addObjListItem("measureList")}
            className="text-blue-600 text-sm"
          >
            + Add Measure Item
          </button>
        </section>

        {/* REGISTRATION */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Registration</h2>

          <input
            name="registrationHeading"
            value={form.registrationHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="Registration Heading"
          />

          <textarea
            name="registrationDescription"
            value={form.registrationDescription}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded"
            placeholder="Registration Description"
          />
        </section>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6 border-t pt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl"
          >
            {loading ? "Saving..." : "Save All Changes"}
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 border border-red-300 text-red-600 rounded-xl"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}
