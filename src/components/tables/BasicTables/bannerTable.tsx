// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

export default function BannerTable() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  const fetchBanner = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/banner`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.data;
      if (data) {
        setForm({ title: data.title, description: data.description });
        setPreview(`${import.meta.env.VITE_APP_URL}${data.image}`);
      }
    } catch (err) {
      toast.error("Failed to load banner");
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description)
      return toast.error("All fields are required");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (image) formData.append("image", image);

      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/banner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
      fetchBanner();
      setImage(null);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white p-6 shadow-lg rounded-xl w-full mx-auto">


        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="w-full mb-3 p-3 border rounded-xl"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="w-full mb-3 p-3 border rounded-xl"
          rows={4}
        ></textarea>

        <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 text-center mb-4">
          <label htmlFor="fileInput" className="cursor-pointer">
            <FiUploadCloud className="text-4xl text-blue-500 mx-auto mb-2" />
            Upload Image
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {preview && (
          <img
            src={preview}
            className="w-full h-60 object-cover rounded-xl mb-4"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save Banner"}
        </button>
      </div>
    </div>
  );
}
