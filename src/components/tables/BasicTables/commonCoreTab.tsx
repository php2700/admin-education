// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CommonCoreDetail } from "./commonCoreDetail";

export default function CommonCoreTable() {
  const [form, setForm] = useState({
    coreDescription: [""], // array of input boxes
    coverDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Fetch Core ELA Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/about-core-ela`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;

      if (data) {
        setForm({
          coreDescription: Array.isArray(data.coreDescription)
            ? data.coreDescription
            : [""],

          coverDescription: data.coverDescription || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Description Change
  const handleDescriptionChange = (index, value) => {
    const updated = [...form.coreDescription];
    updated[index] = value;
    setForm({ ...form, coreDescription: updated });
  };

  // Add New Description
  const addDescription = () => {
    setForm({
      ...form,
      coreDescription: [...form.coreDescription, ""],
    });
  };

  // Remove Description
  const removeDescription = (i) => {
    const updated = [...form.coreDescription];
    updated.splice(i, 1);

    setForm({
      ...form,
      coreDescription: updated.length ? updated : [""],
    });
  };

  // Save Core ELA Data
  const handleSave = async () => {
    if (!form.coreDescription.some((v) => v.trim()))
      return toast.error("Core Description is required");

    if (!form.coverDescription)
      return toast.error("Cover Description is required");

    try {
      setLoading(true);

      const payload = {
        coreDescription: form.coreDescription
          .map((v) => v.trim())
          .filter((v) => v),

        coverDescription: form.coverDescription,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/about-core-ela`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);
      fetchData();
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 flex flex-col justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-full">
        <h2 className="text-xl font-semibold text-center mb-4">
          About Core ELA
        </h2>

        {/* Dynamic Core Description Inputs */}
        <label className="font-medium">Core Description</label>

        {form.coreDescription.map((desc, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={desc}
              onChange={(e) =>
                handleDescriptionChange(index, e.target.value)
              }
              className="w-full border p-2 rounded"
              placeholder={`Description ${index + 1}`}
            />

            {/* Remove Button */}
            {form.coreDescription.length > 1 && (
              <button
                onClick={() => removeDescription(index)}
                className="bg-red-500 text-white px-3 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}

        {/* Add More Button */}
        <button
          onClick={addDescription}
          className="bg-green-600 text-white py-1 px-4 rounded mb-4"
        >
          + Add More
        </button>

        {/* Cover Description */}
        <div className="font-medium">Cover Description</div>
        <textarea
          name="coverDescription"
          value={form.coverDescription}
          onChange={(e) =>
            setForm({ ...form, coverDescription: e.target.value })
          }
          rows={3}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      <CommonCoreDetail />
    </div>
  );
}
