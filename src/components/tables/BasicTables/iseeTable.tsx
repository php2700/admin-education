// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AboutIseeTab() {
  const [form, setForm] = useState({
    title: [""],
    purpose: [""],
    testStructure: [{ heading: "", description: "" }],
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Fetch existing about-isee data
  const fetchAboutIsee = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/about-isee`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.data;
      if (data) {
        setForm({
          title: data.title || [""],
          purpose: data.purpose || [""],
          testStructure: data.testStructure.length
            ? data.testStructure
            : [{ heading: "", description: "" }],
        });
      }
    } catch (err) {
      toast.error("Failed to load About ISEE data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutIsee();
  }, []);

  // Handle simple array fields (title, purpose)
  const handleArrayChange = (e, index, field) => {
    const newArray = [...form[field]];
    newArray[index] = e.target.value;
    setForm({ ...form, [field]: newArray });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const newArray = [...form[field]];
    newArray.splice(index, 1);
    setForm({ ...form, [field]: newArray });
  };

  const handleTestStructureChange = (e, index, key) => {
    const newTestStructure = [...form.testStructure];
    newTestStructure[index][key] = e.target.value;
    setForm({ ...form, testStructure: newTestStructure });
  };

  const addTestStructure = () => {
    setForm({
      ...form,
      testStructure: [...form.testStructure, { heading: "", description: "" }],
    });
  };

  const removeTestStructure = (index) => {
    const newList = [...form.testStructure];
    newList.splice(index, 1);
    setForm({ ...form, testStructure: newList });
  };

  const handleSave = async () => {
    if (
      !form.title.length ||
      !form.purpose.length ||
      !form.testStructure.length
    )
      return toast.error("All fields are required");

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/about-isee`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Saved successfully");
      fetchAboutIsee();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 min-h-[80vh] flex flex-col items-center ">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full md:w-2/3 lg:w-1/2">
        <h3 className="text-xl font-semibold mb-4 text-center">About ISEE</h3>

        {/* Title Section */}
        <h4 className="font-medium mb-2">Title</h4>
        {form.title.map((t, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={t}
              onChange={(e) => handleArrayChange(e, index, "title")}
              placeholder={`Title ${index + 1}`}
              className="flex-1 p-3 border border-gray-300 rounded-xl"
            />
            {index > 0 && (
              <button
                onClick={() => removeArrayField("title", index)}
                className="text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayField("title")}
          className="text-blue-600 text-sm mb-4"
        >
          + Add More Title
        </button>

        {/* Purpose Section */}
        <h4 className="font-medium mb-2 mt-4">Purpose</h4>
        {form.purpose.map((p, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={p}
              onChange={(e) => handleArrayChange(e, index, "purpose")}
              placeholder={`Purpose ${index + 1}`}
              className="flex-1 p-3 border border-gray-300 rounded-xl"
            />
            {index > 0 && (
              <button
                onClick={() => removeArrayField("purpose", index)}
                className="text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayField("purpose")}
          className="text-blue-600 text-sm mb-4"
        >
          + Add More Purpose
        </button>

        {/* Test Structure Section */}
        <h4 className="font-medium mb-2 mt-4">Test Structure</h4>
        {form.testStructure.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-3 mb-3"
          >
            <input
              type="text"
              value={item.heading}
              onChange={(e) => handleTestStructureChange(e, index, "heading")}
              placeholder="Heading"
              className="w-full mb-2 p-3 border border-gray-300 rounded-xl"
            />
            <textarea
              value={item.description}
              onChange={(e) =>
                handleTestStructureChange(e, index, "description")
              }
              placeholder="Description"
              className="w-full p-3 border border-gray-300 rounded-xl"
              rows={3}
            ></textarea>
            {index > 0 && (
              <button
                onClick={() => removeTestStructure(index)}
                className="text-red-500 mt-2"
              >
                ✕ Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addTestStructure}
          className="text-blue-600 text-sm mb-4"
        >
          + Add Test Structure
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
