// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SbacTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",
    aboutHeading: "",
    aboutDescription: "",
    assessmentHeading: "",
    assessmentDescription: "",
    assessmentPoints: [
      { title: "", description: "" }
    ]
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/sbac-test`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.data) {
        setForm({ ...initialState, ...res.data.data });
      }
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Simple input handler ---
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // --- Assessment Points Handlers ---
  const handlePointChange = (i, key, value) => {
    const updated = [...form.assessmentPoints];
    updated[i][key] = value;
    setForm({ ...form, assessmentPoints: updated });
  };

  const addPoint = () =>
    setForm({
      ...form,
      assessmentPoints: [...form.assessmentPoints, { title: "", description: "" }],
    });

  const removePoint = (i) =>
    setForm({
      ...form,
      assessmentPoints: form.assessmentPoints.filter((_, idx) => idx !== i),
    });

  // --- Validation ---
  const validateForm = () => {
    const required = [
      { key: "heroTitle", label: "Hero Title" },
      { key: "heroDescription", label: "Hero Description" },
      { key: "aboutHeading", label: "About Heading" },
      { key: "aboutDescription", label: "About Description" },
      { key: "assessmentHeading", label: "Assessment Heading" },
      { key: "assessmentDescription", label: "Assessment Description" }
    ];

    for (const f of required) {
      if (!form[f.key]?.trim()) {
        toast.error(`${f.label} is required`);
        return false;
      }
    }

    // Validate array points
    for (const p of form.assessmentPoints) {
      if (!p.title.trim() || !p.description.trim()) {
        toast.error("All Assessment Points require both Title and Description");
        return false;
      }
    }

    return true;
  };

  // --- Save ---
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/sbac-test`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Saved Successfully");
    } catch {
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Delete all ---
  const handleDelete = async () => {
    if (!window.confirm("Delete ALL SBAC Data?")) return;

    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/sbac-test`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm(initialState);
      toast.success("Deleted");
    } catch {
      toast.error("Delete Failed");
    } finally {
      setLoading(false);
    }
  };

  const ReqStar = () => <span className="text-red-500">*</span>;

  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl border-t-4 border-blue-600 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          SBAC Page Admin
        </h2>

        {/* HERO */}
        <div className="mb-8 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>

          <label className="font-semibold text-sm">Title <ReqStar /></label>
          <input
            name="heroTitle"
            value={form.heroTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="font-semibold text-sm">
            Description <ReqStar />
          </label>
          <textarea
            name="heroDescription"
            rows={3}
            value={form.heroDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ABOUT */}
        <div className="mb-8 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">About SBAC</h3>

          <label className="font-semibold text-sm">Heading <ReqStar /></label>
          <input
            name="aboutHeading"
            value={form.aboutHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="font-semibold text-sm">
            Description <ReqStar />
          </label>
          <textarea
            name="aboutDescription"
            rows={5}
            value={form.aboutDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ASSESSMENT */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 text-gray-700">
            Assessment Details
          </h3>

          <label className="font-semibold text-sm">Heading <ReqStar /></label>
          <input
            name="assessmentHeading"
            value={form.assessmentHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="font-semibold text-sm">
            Description <ReqStar />
          </label>
          <textarea
            name="assessmentDescription"
            rows={4}
            value={form.assessmentDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-6"
          />

          <h4 className="font-semibold text-md mb-2">
            Assessment Points (Title + Description)
          </h4>

          {form.assessmentPoints.map((pt, i) => (
            <div key={i} className="border p-4 rounded mb-4 bg-gray-50">
              <label className="font-semibold text-sm">Point Title</label>
              <input
                value={pt.title}
                onChange={(e) =>
                  handlePointChange(i, "title", e.target.value)
                }
                className="w-full p-2 border rounded mb-3"
              />

              <label className="font-semibold text-sm">Description</label>
              <textarea
                rows={3}
                value={pt.description}
                onChange={(e) =>
                  handlePointChange(i, "description", e.target.value)
                }
                className="w-full p-2 border rounded"
              />

              {i > 0 && (
                <button
                  onClick={() => removePoint(i)}
                  className="text-red-500 mt-2 font-bold"
                >
                  ✕ Remove
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addPoint}
            className="text-blue-600 font-semibold text-sm"
          >
            + Add More Assessment Point
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-6 pt-6 border-t">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Saving..." : "Save All Changes"}
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 border border-red-300 text-red-600 font-bold rounded-xl hover:bg-red-50 disabled:bg-gray-200"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}
