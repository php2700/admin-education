// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { KargarooDetail } from "./kangarooDetail";

export default function KangarooTable() {
  const [form, setForm] = useState({
    testPrepDescription: "",
    testStructureDescription: [""],
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  const fetchKangarooData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/kangaroo-test`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;

      if (data) {
        setForm({
          testPrepDescription: data.testPrepDescription || "",
          testStructureDescription: data.testStructureDescription || [""],
        });
      }
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKangarooData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // array update
  const handleArrayChange = (index, value) => {
    const updated = [...form.testStructureDescription];
    updated[index] = value;
    setForm({ ...form, testStructureDescription: updated });
  };

  const addField = () => {
    setForm({
      ...form,
      testStructureDescription: [...form.testStructureDescription, ""],
    });
  };

  const removeField = (index) => {
    setForm({
      ...form,
      testStructureDescription: form.testStructureDescription.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleSave = async () => {
    if (!form.testPrepDescription)
      return toast.error("Test Prep Description required");

    let formData = {
      testPrepDescription: form.testPrepDescription,
      testStructureDescription: form.testStructureDescription,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/kangaroo-test`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);
      fetchKangarooData();
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 flex flex-col justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-full ">
        <h2 className="text-xl font-semibold text-center mb-4">
          Kangaroo Test Management
        </h2>

        <label className="font-medium">Test Prep Description</label>
        <textarea
          name="testPrepDescription"
          value={form.testPrepDescription}
          onChange={handleChange}
          rows={3}
          className="w-full border p-3 rounded mb-4"
        />

        <label className="font-medium">Test Structure Description</label>
        {form.testStructureDescription.map((desc, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              value={desc}
              onChange={(e) => handleArrayChange(index, e.target.value)}
              className="flex-1 border p-3 rounded"
              placeholder={`Structure ${index + 1}`}
            />
            {form.testStructureDescription.length > 1 && (
              <button
                onClick={() => removeField(index)}
                className="bg-red-500 text-white px-3 rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button onClick={addField} className="text-blue-600">
          + Add Structure
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
      <KargarooDetail />
    </div>
  );
}
