// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChapterTable() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    subjectDescription: "",
    chapterName: [""],
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Fetch existing chapter data (single document)
  const fetchChapterData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/chapter`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = res.data.data;
      if (data) {
        setForm({
          title: data.title || "",
          description: data.description || "",
          subjectDescription: data.subjectDescription || "",
          chapterName: Array.isArray(data.chapterName)
            ? data.chapterName
            : [data.chapterName || ""],
        });
      }
    } catch (err) {
      toast.error("Failed to load chapter data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapterData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle chapter name (array)
  const handleChapterNameChange = (index, value) => {
    const updated = [...form.chapterName];
    updated[index] = value;
    setForm({ ...form, chapterName: updated });
  };

  const addChapterName = () => {
    setForm({ ...form, chapterName: [...form.chapterName, ""] });
  };

  const removeChapterName = (index) => {
    const updated = form.chapterName.filter((_, i) => i !== index);
    setForm({ ...form, chapterName: updated });
  };

  // Save or update data
  const handleSave = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.subjectDescription ||
      form.chapterName.some((n) => !n.trim())
    ) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/chapter`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Saved successfully");
      fetchChapterData();
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
          Chapter Management
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

        {/* Subject Description */}
        <label className="block mb-2 font-medium">Subject Description</label>
        <textarea
          name="subjectDescription"
          value={form.subjectDescription}
          onChange={handleChange}
          placeholder="Enter subject description"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-xl mb-6"
        />

        {/* Chapter Names */}
        <label className="block mb-2 font-medium">Chapter Names</label>
        {form.chapterName.map((name, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={name}
              onChange={(e) => handleChapterNameChange(index, e.target.value)}
              placeholder={`Chapter Name ${index + 1}`}
              className="flex-1 p-3 border border-gray-300 rounded-xl"
            />
            {form.chapterName.length > 1 && (
              <button
                onClick={() => removeChapterName(index)}
                className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addChapterName}
          className="mt-2 text-blue-600 text-sm"
        >
          + Add Chapter Name
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
