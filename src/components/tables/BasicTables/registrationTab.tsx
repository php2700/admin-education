// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Measure from "./measure";

export default function Registration() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("educationToken");

  // Fetch existing registration data
  const fetchRegistration = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/registration`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;
      if (data) {
        setForm({
          title: data.title,
          description: data.description,
        });
      }
    } catch (err) {
      toast.error("Failed to load registration data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistration();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save or update registration data
  const handleSave = async () => {
    if (!form.title || !form.description)
      return toast.error("All fields are required");

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/registration`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Saved successfully");
      fetchRegistration();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
    
    <div className="bg-gray-50 p-8  flex flex-col items-center">
     
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full md:w-2/3 lg:w-1/2">
    

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
          rows={4}
        ></textarea>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          {loading ? "Saving..." : "Save Registration Info"}
        </button>
      </div>
    </div>
     <Measure/>
    </div>
  );
}
