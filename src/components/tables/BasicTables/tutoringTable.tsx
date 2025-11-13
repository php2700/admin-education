// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function TutoringTabPrep() {
  const [form, setForm] = useState({
    heading: "",
    headingDescription: "",
    chapter: [
      {
        title: "",
        description: "",
        chapterName: [""],
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  const fetchTutoringData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/tutoring`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;
      if (data) {
        setForm({
          heading: data.heading || "",
          headingDescription: data.headingDescription || "",
          chapter:
            data.chapter?.length > 0
              ? data.chapter.map((ch) => ({
                  title: ch.title || "",
                  description: ch.description || "",
                  chapterName: ch.chapterName?.length ? ch.chapterName : [""],
                }))
              : [
                  {
                    title: "",
                    description: "",
                    chapterName: [""],
                  },
                ],
        });
      }
    } catch (err) {
      toast.error("Failed to load tutoring data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutoringData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle chapter field changes
  const handleChapterChange = (index, key, value) => {
    const updated = [...form.chapter];
    updated[index][key] = value;
    setForm({ ...form, chapter: updated });
  };

  // Handle chapterName (array) changes
  const handleChapterNameChange = (chapterIndex, nameIndex, value) => {
    const updated = [...form.chapter];
    updated[chapterIndex].chapterName[nameIndex] = value;
    setForm({ ...form, chapter: updated });
  };

  // Add / Remove chapter
  const addChapter = () => {
    setForm({
      ...form,
      chapter: [
        ...form.chapter,
        { title: "", description: "", chapterName: [""] },
      ],
    });
  };

  const removeChapter = (index) => {
    const updated = form.chapter.filter((_, i) => i !== index);
    setForm({ ...form, chapter: updated });
  };

  // Add / Remove chapterName field
  const addChapterName = (chapterIndex) => {
    const updated = [...form.chapter];
    updated[chapterIndex].chapterName.push("");
    setForm({ ...form, chapter: updated });
  };

  const removeChapterName = (chapterIndex, nameIndex) => {
    const updated = [...form.chapter];
    updated[chapterIndex].chapterName.splice(nameIndex, 1);
    setForm({ ...form, chapter: updated });
  };

  // Save (Upsert)
  const handleSave = async () => {
    if (!form.heading || !form.headingDescription)
      return toast.error("Heading and description are required");

    for (const ch of form.chapter) {
      if (!ch.title || !ch.description)
        return toast.error("Each chapter needs a title and description");
      if (ch.chapterName.some((n) => !n.trim()))
        return toast.error("Chapter names cannot be empty");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/tutoring`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Saved successfully");
      fetchTutoringData();
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
          Tutoring Preparation
        </h3>

        {/* Heading */}
        <label className="block mb-2 font-medium">Heading</label>
        <input
          type="text"
          name="heading"
          value={form.heading}
          onChange={handleChange}
          placeholder="Enter heading"
          className="w-full p-3 border border-gray-300 rounded-xl mb-4"
        />

        {/* Heading Description */}
        <label className="block mb-2 font-medium">Heading Description</label>
        <textarea
          name="headingDescription"
          value={form.headingDescription}
          onChange={handleChange}
          placeholder="Enter heading description"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-xl mb-6"
        />

        {/* Chapters */}
        <h4 className="font-medium mb-2">Chapters</h4>
        {form.chapter.map((ch, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
          >
            <input
              type="text"
              value={ch.title}
              onChange={(e) =>
                handleChapterChange(index, "title", e.target.value)
              }
              placeholder="Chapter Title"
              className="w-full p-3 border border-gray-300 rounded-xl mb-3"
            />
            <textarea
              value={ch.description}
              onChange={(e) =>
                handleChapterChange(index, "description", e.target.value)
              }
              placeholder="Chapter Description"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-xl mb-3"
            />

            {/* Chapter Names */}
            <label className="font-medium mb-1 block">Chapter Names</label>
            {ch.chapterName.map((name, nameIndex) => (
              <div key={nameIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    handleChapterNameChange(index, nameIndex, e.target.value)
                  }
                  placeholder={`Chapter Name ${nameIndex + 1}`}
                  className="flex-1 p-3 border border-gray-300 rounded-xl"
                />
                {ch.chapterName.length > 1 && (
                  <button
                    onClick={() => removeChapterName(index, nameIndex)}
                    className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addChapterName(index)}
              className="text-blue-600 text-sm mb-2"
            >
              + Add Chapter Name
            </button>

            {form.chapter.length > 1 && (
              <button
                onClick={() => removeChapter(index)}
                className="text-red-600 text-sm mt-2"
              >
                ✕ Remove Chapter
              </button>
            )}
          </div>
        ))}

        {/* Add Chapter Button */}
        <button
          onClick={addChapter}
          className="w-full py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
        >
          + Add Chapter
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
