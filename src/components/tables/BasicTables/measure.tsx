// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function Measure() {
  const [form, setForm] = useState({
    title1: "",
    description1: "",
    title2: "",
    description2: "",
    title3: "",
    description3: "",
    title4: "",
    description4: "",
    title5: "",
    description5: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Fetch existing data
  const fetchRegistration = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/measure`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.data) {
        setForm(res.data.data);
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/measure`,
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
    <div className="bg-gray-50 p-8 min-h-[80vh] flex justify-center">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full md:w-2/3 lg:w-1/2">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="mb-6">
            {/* <input
              type="text"
              name={`title${num}`}
              value={form[`title${num}`]}
              onChange={handleChange}
              placeholder={`Enter Title ${num}`}
              className="w-full mb-2 p-3 border border-gray-300 rounded-xl"
            /> */}
            <ReactQuill
              value={form[`title${num}`]}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  [`title${num}`]: value,
                }))
              }
          modules={{
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "link"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
}}
              placeholder={`Enter Title ${num}`}
              className="mb-2 border border-gray-300 rounded-xl"
            />

            <textarea
              name={`description${num}`}
              value={form[`description${num}`]}
              onChange={handleChange}
              placeholder={`Enter Description ${num}`}
              className="w-full p-3 border border-gray-300 rounded-xl"
              rows={3}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          {loading ? "Saving..." : "Save Registration Info"}
        </button>
      </div>
    </div>
  );
}
