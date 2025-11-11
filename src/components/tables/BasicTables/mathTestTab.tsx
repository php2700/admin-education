// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MathTestPrep() {
  const [form, setForm] = useState({ title: "", description: [""] });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Fetch existing data (only one entry expected)
  const fetchMathTestData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/math-test`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;
      if (data) {
        setForm({
          title: data.title,
          description: Array.isArray(data.description)
            ? data.description
            : [data.description],
        });
      }
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMathTestData();
  }, []);

  // Handle title change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle description change (array)
  const handleDescriptionChange = (index, value) => {
    const updated = [...form.description];
    updated[index] = value;
    setForm({ ...form, description: updated });
  };

  // Add new description field
  const addDescription = () => {
    setForm({ ...form, description: [...form.description, ""] });
  };

  // Remove a description field
  const removeDescription = (index) => {
    const updated = form.description.filter((_, i) => i !== index);
    setForm({ ...form, description: updated });
  };

  // Save or update data
  const handleSave = async () => {
    if (!form.title || form.description.some((d) => !d.trim()))
      return toast.error("All fields are required");

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/math-test`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Saved successfully");
      fetchMathTestData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
          Math Test Prep
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
        />

        {/* Descriptions */}
        <div className="space-y-3">
          {form.description.map((desc, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder={`Description ${index + 1}`}
                className="w-full p-3 border border-gray-300 rounded-xl"
                rows={3}
              />
              {form.description.length > 1 && (
                <button
                  onClick={() => removeDescription(index)}
                  className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add More Button */}
        <button
          onClick={addDescription}
          className="mt-3 w-full py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
        >
          + Add Description
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
