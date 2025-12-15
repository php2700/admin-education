// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CompetitionTable() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    condition: [""],
    whyTake: [""],
    competition: [{ title: "", amc: "", description: "", for: "", when: "" }],
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Fetch existing competition data
  const fetchCompetitionData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/competition`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = res.data.data;
      if (data) {
        setForm({
          title: data.title || "",
          description: data.description || "",
          condition: Array.isArray(data.condition)
            ? data.condition
            : [data.condition || ""],
          whyTake: Array.isArray(data.whyTake)
            ? data.whyTake
            : [data.whyTake || ""],
          competition:
            Array.isArray(data.competition) && data.competition.length
              ? data.competition.map((c) => ({
                  title: c.title || "",
                  amc: c.amc || "",
                  description: c.description || "",
                  for: c.for || "",
                  when: c.when || "",
                }))
              : [{ amc: "", description: "", for: "", when: "" }],
        });
      }
    } catch (err) {
      toast.error("Failed to load competition data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitionData();
  }, []);

  // Generic input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Array handlers (condition, whyTake)
  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated });
  };

  // Competition section handlers
  const handleCompetitionChange = (index, key, value) => {
    const updated = [...form.competition];
    updated[index][key] = value;
    setForm({ ...form, competition: updated });
  };

  const addCompetition = () => {
    setForm({
      ...form,
      competition: [
        ...form.competition,
        { title: "", amc: "", description: "", for: "", when: "" },
      ],
    });
  };

  const removeCompetition = (index) => {
    const updated = form.competition.filter((_, i) => i !== index);
    setForm({ ...form, competition: updated });
  };

  // Save or update data (Upsert)
  const handleSave = async () => {
    if (!form.title || !form.description)
      return toast.error("Title and description are required");

    if (form.condition.some((n) => !n.trim()))
      return toast.error("Condition fields cannot be empty");

    if (form.whyTake.some((n) => !n.trim()))
      return toast.error("Why Take fields cannot be empty");

    for (const comp of form.competition) {
      if (
        !comp.amc ||
        !comp.description ||
        !comp.for ||
        !comp.when ||
        !comp.title
      ) {
        return toast.error("All competition fields are required");
      }
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/competition`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Saved successfully");
      fetchCompetitionData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Competition Management
        </h3>

        {/* Title */}
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full p-3 border border-gray-300 rounded-xl mb-4"
        />

        {/* Description */}
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4"
        />

        {/* Condition */}
        <label className="block mb-2 font-medium">Participate</label>
        {form.condition.map((cond, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={cond}
              onChange={(e) =>
                handleArrayChange("condition", index, e.target.value)
              }
              placeholder={`participate ${index + 1}`}
              className="flex-1 p-3 border border-gray-300 rounded-xl"
            />
            {form.condition.length > 1 && (
              <button
                onClick={() => removeArrayField("condition", index)}
                className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayField("condition")}
          className="text-blue-600 text-sm mb-4"
        >
          + Add Condition
        </button>

        {/* Why Take */}
        <label className="block mb-2 font-medium">Why Take</label>
        {form.whyTake.map((why, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={why}
              onChange={(e) =>
                handleArrayChange("whyTake", index, e.target.value)
              }
              placeholder={`Reason ${index + 1}`}
              className="flex-1 p-3 border border-gray-300 rounded-xl"
            />
            {form.whyTake.length > 1 && (
              <button
                onClick={() => removeArrayField("whyTake", index)}
                className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayField("whyTake")}
          className="text-blue-600 text-sm mb-4"
        >
          + Add Why Take
        </button>

        {/* Competition Section */}
        <h4 className="font-medium mb-2">Competitions</h4>
        {form.competition.map((c, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 mb-3 bg-gray-50"
          >
            <input
              type="text"
              value={c.title}
              onChange={(e) =>
                handleCompetitionChange(index, "title", e.target.value)
              }
              placeholder="AMC Title"
              className="w-full p-3 border border-gray-300 rounded-xl mb-2"
            />
            <input
              type="text"
              value={c.amc}
              onChange={(e) =>
                handleCompetitionChange(index, "amc", e.target.value)
              }
              placeholder="AMC"
              className="w-full p-3 border border-gray-300 rounded-xl mb-2"
            />
            <textarea
              value={c.description}
              onChange={(e) =>
                handleCompetitionChange(index, "description", e.target.value)
              }
              placeholder="Description"
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-xl mb-2"
            />
            <input
              type="text"
              value={c.for}
              onChange={(e) =>
                handleCompetitionChange(index, "for", e.target.value)
              }
              placeholder="For"
              className="w-full p-3 border border-gray-300 rounded-xl mb-2"
            />
            <input
              type="text"
              value={c.when}
              onChange={(e) =>
                handleCompetitionChange(index, "when", e.target.value)
              }
              placeholder="When"
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            {form.competition.length > 1 && (
              <button
                onClick={() => removeCompetition(index)}
                className="text-red-600 text-sm mt-2"
              >
                ✕ Remove Competition
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addCompetition}
          className="w-full py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
        >
          + Add Competition
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
