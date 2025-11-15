// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ScienceDetail } from "./scienceDetail";

export default function ScienceTable() {
  const [form, setForm] = useState({
    description: "",
    tutorDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Fetch Science Data
  const fetchScienceData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/about-science`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;

      if (data) {
        setForm({
          description: data.description || "",
          tutorDescription: data.tutorDescription || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScienceData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save Science Data
  const handleSave = async () => {
    if (!form.description)
      return toast.error("Description is required");

    if (!form.tutorDescription)
      return toast.error("Tutor Description is required");

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/about-science`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);
      fetchScienceData();
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
          About Science
        </h2>

        {/* Description */}
        <label className="font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border p-3 rounded mb-4"
        />

        {/* Tutor Description */}
        <label className="font-medium">Tutor Description</label>
        <textarea
          name="tutorDescription"
          value={form.tutorDescription}
          onChange={handleChange}
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
      <ScienceDetail/>
    </div>
  );
}
