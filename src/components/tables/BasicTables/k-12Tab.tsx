// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import Methodology from "../../../pages/Tables/methodology";

export default function BannerTable() {
  const [activeTab, setActiveTab] = useState("service");

  const [form, setForm] = useState({
    title: "",
    description: "", // single input
    title1: "",
    description1: [], // array
    title2: "",
    description2: [], // array
    title3: "",
    description3: [], // array
  });

  const [images, setImages] = useState({
    image: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const [previews, setPreviews] = useState({
    image: "",
    image1: "",
    image2: "",
    image3: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  const fetchBanner = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/k-12service`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data.data;
      if (data) {
        const parseArray = (field) =>
          Array.isArray(field)
            ? field
            : typeof field === "string"
            ? JSON.parse(field)
            : [];

        setForm({
          title: data.title || "",
          description: data.description || "",
          title1: data.title1 || "",
          description1: parseArray(data.description1),
          title2: data.title2 || "",
          description2: parseArray(data.description2),
          title3: data.title3 || "",
          description3: parseArray(data.description3),
        });

        setPreviews({
          image: data.image
            ? `${import.meta.env.VITE_APP_URL}${data.image}`
            : "",
          image1: data.image1
            ? `${import.meta.env.VITE_APP_URL}${data.image1}`
            : "",
          image2: data.image2
            ? `${import.meta.env.VITE_APP_URL}${data.image2}`
            : "",
          image3: data.image3
            ? `${import.meta.env.VITE_APP_URL}${data.image3}`
            : "",
        });
      }
    } catch (err) {
      toast.error("Failed to load banner");
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const newArr = [...form[field]];
      newArr[index] = e.target.value;
      setForm({ ...form, [field]: newArr });
    } else {
      setForm({ ...form, [field]: e.target.value });
    }
  };

  const handleAddDescription = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const handleRemoveDescription = (field, index) => {
    const newArr = [...form[field]];
    newArr.splice(index, 1);
    setForm({ ...form, [field]: newArr });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setImages({ ...images, [field]: file });
      setPreviews({ ...previews, [field]: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "title",
      "description",
      "title1",
      "description1",
      "title2",
      "description2",
      "title3",
      "description3",
    ];

    for (let field of requiredFields) {
      if (
        !form[field] ||
        (Array.isArray(form[field]) && form[field].length === 0)
      ) {
        return toast.error("All fields are required");
      }
    }

    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (Array.isArray(form[key])) {
          formData.append(key, JSON.stringify(form[key]));
        } else {
          formData.append(key, form[key]);
        }
      });

      Object.keys(images).forEach((key) => {
        if (images[key]) formData.append(key, images[key]);
      });

      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/k-12service`,
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
      setImages({ image: null, image1: null, image2: null, image3: null });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderBannerInput = (
    titleKey,
    descKey,
    imageKey,
    label,
    isArray = false
  ) => (
    <div className="mb-6">
      <input
        type="text"
        name={titleKey}
        value={form[titleKey]}
        onChange={(e) => handleChange(e, titleKey)}
        placeholder={`Enter ${label} title`}
        className="w-full mb-2 p-3 border rounded-xl"
      />

      {isArray ? (
        <>
          {form[descKey]?.map((desc, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={desc}
                onChange={(e) => handleChange(e, descKey, index)}
                placeholder={`Enter ${label} description`}
                className="w-full p-3 border rounded-xl"
              />
              <button
                type="button"
                onClick={() => handleRemoveDescription(descKey, index)}
                className="ml-2 bg-red-500 text-white px-3 rounded"
              >
                <FaMinus />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddDescription(descKey)}
            className="mb-2 bg-green-500 text-white px-3 py-1 rounded flex items-center"
          >
            <FaPlus className="mr-1" /> Add Description
          </button>
        </>
      ) : (
        <textarea
          type="text"
          value={form[descKey]}
          onChange={(e) => handleChange(e, descKey)}
          placeholder={`Enter ${label} description`}
          className="w-full mb-2 p-3 border rounded-xl"
        />
      )}

      <div className="border-2 border-dashed border-blue-400 rounded-xl p-1 text-center mb-2">
        <label htmlFor={imageKey} className="cursor-pointer">
          <FiUploadCloud className="text-4xl text-blue-500 mx-auto mb-2" />
          Upload {label} Image
          <input
            id={imageKey}
            type="file"
            onChange={(e) => handleFileChange(e, imageKey)}
            className="hidden"
          />
        </label>
      </div>

      {previews[imageKey] && (
        <img
          src={previews[imageKey]}
          className={
            imageKey === "image"
              ? "w-40 h-40 object-cover rounded-xl mb-2"
              : "w-10 h-10 object-cover rounded-xl mb-2"
          }
        />
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 p-8">
      <div className="flex gap-4 border-b pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "service"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("service")}
        >
          Service
        </button>

        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "methodology"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("methodology")}
        >
          Methodology
        </button>
      </div>

      {activeTab === "service" && (
        <div className="bg-white p-6 shadow-lg rounded-xl w-full mx-auto">
          {renderBannerInput("title", "description", "image", " k-12service")}{" "}
          {/* single input */}
          {renderBannerInput(
            "title1",
            "description1",
            "image1",
            "Subject Experticse",
            true
          )}
          {renderBannerInput(
            "title2",
            "description2",
            "image2",
            "Subject Experticse",
            true
          )}
          {renderBannerInput(
            "title3",
            "description3",
            "image3",
            "Subject Experticse",
            true
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            {loading ? "Saving..." : "Save Banner"}
          </button>
        </div>
      )}
      {activeTab === "methodology" && <Methodology />}
    </div>
  );
}
