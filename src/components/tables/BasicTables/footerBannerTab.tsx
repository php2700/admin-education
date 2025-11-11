// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

export default function FooterBanner() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("educationToken");

  // Fetch existing banner
  const fetchBanner = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/footer-banner`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;
      if (data) {
        setForm({ title: data.title, description: data.description });
        setPreview(`${import.meta.env.VITE_APP_URL}${data.image}`);
      }
    } catch (err) {
      toast.error("Failed to load banner data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  // Handle text change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image file");
    }
  };

  // Save or update banner
  const handleSave = async () => {
    if (!form.title || !form.description)
      return toast.error("All fields are required");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (image) formData.append("image", image);

      // Since backend auto-updates existing banner, just POST
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/footer-banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Saved successfully");
      fetchBanner();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 min-h-[80vh] flex flex-col items-center">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Footer Banner Settings
        </h3>

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
          rows={3}
        ></textarea>

        <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 text-center mb-3">
          <label htmlFor="fileInput" className="cursor-pointer">
            <FiUploadCloud className="text-4xl text-blue-500 mx-auto mb-2" />
            <span className="text-sm text-gray-600">
              {image ? "Change Image" : "Click to Upload Image"}
            </span>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {preview && (
          <div className="flex justify-center mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-[40vh] object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Banner"}
        </button>
      </div>
    </div>
  );
}
