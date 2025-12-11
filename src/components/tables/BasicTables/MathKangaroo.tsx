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
    rulesList: [{ text: "", subpoints: [""] }],
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
        const d = res.data.data;

        // Convert database format to UI format
        const correctedRules = d.rulesList?.map(r => ({
          text: r.type || r.text || "",
          subpoints: r.subpoints || [""]
        })) || [{ text: "", subpoints: [""] }];

        setForm({
          ...initialState,
          ...d,
          rulesList: correctedRules
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
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // FEATURES LIST
  const handleListChange = (index, value) => {
    const updated = [...form.featuresList];
    updated[index] = value;
    setForm({ ...form, featuresList: updated });
  };
  const addFeature = () =>
    setForm({ ...form, featuresList: [...form.featuresList, ""] });
  const removeFeature = (index) =>
    setForm({
      ...form,
      featuresList: form.featuresList.filter((_, i) => i !== index),
    });

  // RULES LIST (MAIN RULE)
  const handleRuleChange = (index, value) => {
    const updated = [...form.rulesList];
    updated[index].text = value;
    setForm({ ...form, rulesList: updated });
  };

  // SUBPOINT HANDLERS
  const handleSubpointChange = (ruleIndex, spIndex, value) => {
    const updated = [...form.rulesList];
    updated[ruleIndex].subpoints[spIndex] = value;
    setForm({ ...form, rulesList: updated });
  };

  const addSubpoint = (ruleIndex) => {
    const updated = [...form.rulesList];
    updated[ruleIndex].subpoints.push("");
    setForm({ ...form, rulesList: updated });
  };

  const removeSubpoint = (ruleIndex, spIndex) => {
    const updated = [...form.rulesList];
    updated[ruleIndex].subpoints = updated[ruleIndex].subpoints.filter(
      (_, i) => i !== spIndex
    );
    setForm({ ...form, rulesList: updated });
  };

  // Add New Rule
  const addRule = () =>
    setForm({
      ...form,
      rulesList: [...form.rulesList, { text: "", subpoints: [""] }],
    });

  const removeRule = (index) =>
    setForm({
      ...form,
      rulesList: form.rulesList.filter((_, i) => i !== index),
    });

  // --- Validation ---
  const validateForm = () => {
    const required = [
      "heroTitle",
      "heroDescription",
      "structureHeading",
      "structureDescription",
      "featuresHeading",
      "rulesHeading",
      "scoringHeading",
      "scoringDescription",
    ];

    for (let key of required) {
      if (!form[key]?.trim()) {
        toast.error(`${key.replace(/([A-Z])/g, " $1")} is required`);
        return false;
      }
    }

    if (form.featuresList.some((f) => !f.trim())) {
      toast.error("All Feature items must be filled");
      return false;
    }

    for (let rule of form.rulesList) {
      if (!rule.text.trim()) {
        toast.error("Each Rule must have a main text");
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

      // Convert to backend format
      const formatted = {
        ...form,
        rulesList: form.rulesList.map(r => ({
          type: r.text,
          subpoints: r.subpoints,
        })),
      };

      await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/math-kangaroo-test`,
        formatted,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Saved Successfully");
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
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/math-kangaroo-test`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Deleted Successfully");
      setForm(initialState);
    } catch (err) {
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
          Math Kangaroo Test Prep Admin
        </h2>

        {/* HERO */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Hero Section</h3>

          <label className="font-semibold mb-1 block">
            Title <ReqStar />
          </label>
          <input
            name="heroTitle"
            value={form.heroTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="font-semibold mb-1 block">
            Description <ReqStar />
          </label>
          <textarea
            name="heroDescription"
            value={form.heroDescription}
            rows={3}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* STRUCTURE */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Test Structure</h3>

          <label className="font-semibold mb-1 block">
            Heading <ReqStar />
          </label>
          <input
            name="structureHeading"
            value={form.structureHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="font-semibold mb-1 block">
            Description <ReqStar />
          </label>
          <textarea
            name="structureDescription"
            value={form.structureDescription}
            rows={4}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* FEATURES */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Features</h3>

          <label className="font-semibold mb-1 block">
            Heading <ReqStar />
          </label>
          <input
            name="featuresHeading"
            value={form.featuresHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="font-semibold block mb-1">
            Feature List <ReqStar />
          </label>
          {form.featuresList.map((f, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={f}
                onChange={(e) => handleListChange(i, e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => removeFeature(i)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          <button onClick={addFeature} className="text-blue-600 text-sm">
            + Add Feature
          </button>
        </div>

        {/* RULES WITH SUBPOINTS */}
        <div className="mb-6 border-b pb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">General Rules</h3>

          <label className="font-semibold mb-1 block">
            Heading <ReqStar />
          </label>
          <input
            name="rulesHeading"
            value={form.rulesHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="font-semibold block mb-1">
            Rules List (with Subpoints) <ReqStar />
          </label>

          {form.rulesList.map((rule, i) => (
            <div key={i} className="mb-4 p-3 border rounded bg-gray-50">
              <div className="flex gap-2 mb-2">
                <input
                  value={rule.text}
                  onChange={(e) => handleRuleChange(i, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Main Rule..."
                />
                <button
                  onClick={() => removeRule(i)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="ml-4">
                <p className="font-semibold text-sm">Subpoints:</p>

                {rule.subpoints.map((sp, spIndex) => (
                  <div key={spIndex} className="flex gap-2 mb-2">
                    <input
                      value={sp}
                      onChange={(e) =>
                        handleSubpointChange(i, spIndex, e.target.value)
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Subpoint..."
                    />
                    <button
                      onClick={() => removeSubpoint(i, spIndex)}
                      className="text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addSubpoint(i)}
                  className="text-blue-600 text-sm"
                >
                  + Add Subpoint
                </button>
              </div>
            </div>
          ))}

          <button onClick={addRule} className="text-blue-600 text-sm">
            + Add Rule
          </button>
        </div>

        {/* SCORING */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-700">Scoring</h3>

          <label className="font-semibold mb-1 block">
            Heading <ReqStar />
          </label>
          <input
            name="scoringHeading"
            value={form.scoringHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <label className="font-semibold mb-1 block">
            Description <ReqStar />
          </label>
          <textarea
            name="scoringDescription"
            value={form.scoringDescription}
            rows={4}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6 pt-6 border-t">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow disabled:bg-blue-400"
          >
            {loading ? "Saving..." : "Save All Changes"}
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}
