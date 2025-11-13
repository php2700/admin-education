// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AboutElaTab() {
  const [form, setForm] = useState({
    testPrepDescription: "",
    description: "",
    heading: "",
    whoTake: "",
    questionType: [""],
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Fetch existing data
  const fetchAboutEla = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/about-ela`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.data;
      if (data) {
        setForm({
          testPrepDescription: data.testPrepDescription || "",
          description: data.description || "",
          heading: data.heading || "",
          whoTake: data.whoTake || "",
          questionType: data.questionType?.length ? data.questionType : [""],
        });
      }
    } catch (err) {
      toast.error("Failed to load About ELA data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutEla();
  }, []);

  // Handle normal input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle array change for questionType
  const handleArrayChange = (e, index) => {
    const newArray = [...form.questionType];
    newArray[index] = e.target.value;
    setForm({ ...form, questionType: newArray });
  };

  const addQuestionType = () => {
    setForm({ ...form, questionType: [...form.questionType, ""] });
  };

  const removeQuestionType = (index) => {
    const newArray = [...form.questionType];
    newArray.splice(index, 1);
    setForm({ ...form, questionType: newArray });
  };

  // Save (Upsert)
  const handleSave = async () => {
    if (
      !form.testPrepDescription ||
      !form.description ||
      !form.heading ||
      !form.whoTake ||
      !form.questionType.length
    )
      return toast.error("All fields are required");

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/about-ela`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Saved successfully");
      fetchAboutEla();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 min-h-[80vh] flex flex-col items-center">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full md:w-2/3 lg:w-1/2">
        <h3 className="text-xl font-semibold mb-6 text-center">About ELA</h3>

        {/* Test Prep Description */}
        <label className="block mb-2 font-medium">Test Prep Description</label>
        <textarea
          name="testPrepDescription"
          value={form.testPrepDescription}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          rows={3}
          placeholder="Enter test prep description"
        ></textarea>

        {/* Description */}
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          rows={3}
          placeholder="Enter description"
        ></textarea>

        {/* Heading */}
        <label className="block mb-2 font-medium">Heading</label>
        <input
          type="text"
          name="heading"
          value={form.heading}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          placeholder="Enter heading"
        />

        {/* Who Take */}
        <label className="block mb-2 font-medium">Who Take</label>
        <input
          type="text"
          name="whoTake"
          value={form.whoTake}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          placeholder="Who takes this test?"
        />

        {/* Question Type (Array Field) */}
        <label className="block mb-2 font-medium">Question Types</label>
        {form.questionType.map((q, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={q}
              onChange={(e) => handleArrayChange(e, index)}
              placeholder={`Question Type ${index + 1}`}
              className="flex-1 p-3 border border-gray-300 rounded-xl"
            />
            {index > 0 && (
              <button
                onClick={() => removeQuestionType(index)}
                className="text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addQuestionType}
          className="text-blue-600 text-sm mb-4"
        >
          + Add Question Type
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
