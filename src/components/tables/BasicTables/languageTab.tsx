// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function LanguageTable() {
  const [form, setForm] = useState({
    heading: "",
    description: "",
    property1: "",
    property2: "",
    property3: "",
    property4: "",
    property5: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("educationToken");

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/language`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.data;

      if (data) {
        setForm(data);
        setImagePreview(`${import.meta.env.VITE_APP_URL}${data.image}`);
      }
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Save all data (in ONE request)
  const handleSave = async () => {
    try {
      const required = [
        "heading",
        "description",
        "property1",
        "property2",
        "property3",
        "property4",
        "property5",
      ];

      for (let field of required) {
        if (!form[field] || form[field].trim() === "") {
          return toast.error(`${field} is required`);
        }
      }

      if (!selectedImageFile && !form.image) {
        return toast.error("Image is required");
      }

      setLoading(true);

      // Create formData for all keys
      const formData = new FormData();
      formData.append("heading", form.heading);
      formData.append("description", form.description);
      formData.append("property1", form.property1);
      formData.append("property2", form.property2);
      formData.append("property3", form.property3);
      formData.append("property4", form.property4);
      formData.append("property5", form.property5);

      if (selectedImageFile) {
        formData.append("image", selectedImageFile);
      } else {
        formData.append("image", form.image);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/language`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
          Language Details
        </h2>

        {/* All Inputs */}
        {[
          "heading",
          "description",
          "property1",
          "property2",
          "property3",
          "property4",
          "property5",
        ].map((field) => (
          <div key={field} className="mb-3">
            <label className="font-medium capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        {/* Image Input */}
        <label className="font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded mb-3"
        />

        {/* Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            className="h-40 w-40 object-cover rounded border mb-4"
          />
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
