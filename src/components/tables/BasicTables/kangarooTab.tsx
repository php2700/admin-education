// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function KangarooTable() {
  const [form, setForm] = useState({
    testPrepDescription: "",
    testStructureDescription: [""],
    data: [{ title: "", image: "", points: [""] }],
  });

  const [images, setImages] = useState([]); // store image files
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
          testStructureDescription: Array.isArray(data.testStructureDescription)
            ? data.testStructureDescription
            : [data.testStructureDescription || ""],
          data:
            Array.isArray(data.data) && data.data.length
              ? data.data.map((item) => ({
                  title: item.title || "",
                  image: `${import.meta.env.VITE_APP_URL}${item.image}`|| "",
                  points: Array.isArray(item.points)
                    ? item.points
                    : [item.points || ""],
                }))
              : [{ title: "", image: "", points: [""] }],
        });
      }
    } catch {
      toast.error("Failed to load Kangaroo data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKangarooData();
  }, []);

  // handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle array fields
  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field) =>
    setForm({ ...form, [field]: [...form[field], ""] });

  const removeArrayField = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated });
  };

  // handle nested data changes
  const handleDataChange = (index, key, value) => {
    const updated = [...form.data];
    updated[index][key] = value;
    setForm({ ...form, data: updated });
  };
const handleImageChange = (index, file) => {
  const updatedData = [...form.data];
  updatedData[index].image = URL.createObjectURL(file); // preview
  setForm({ ...form, data: updatedData });

  // store the actual File object (not just file name)
  const updatedImages = [...images];
  updatedImages[index] = file;
  setImages(updatedImages);
};

  const addDataItem = () => {
    setForm({
      ...form,
      data: [...form.data, { title: "", image: "", points: [""] }],
    });
  };

  const removeDataItem = (index) => {
    const updated = form.data.filter((_, i) => i !== index);
    setForm({ ...form, data: updated });
  };

  // handle points
  const handlePointChange = (dataIndex, pointIndex, value) => {
    const updated = [...form.data];
    updated[dataIndex].points[pointIndex] = value;
    setForm({ ...form, data: updated });
  };

  const addPoint = (dataIndex) => {
    const updated = [...form.data];
    updated[dataIndex].points.push("");
    setForm({ ...form, data: updated });
  };

  const removePoint = (dataIndex, pointIndex) => {
    const updated = [...form.data];
    updated[dataIndex].points.splice(pointIndex, 1);
    setForm({ ...form, data: updated });
  };

  // submit data
 const handleSave = async () => {
  if (!form.testPrepDescription)
    return toast.error("Test Prep Description is required");

  const formData = new FormData();
  formData.append("testPrepDescription", form.testPrepDescription);
  formData.append(
    "testStructureDescription",
    JSON.stringify(form.testStructureDescription)
  );

  const dataToSend = form.data.map((item, index) => {
    if (images[index]) {
      // new/updated image
      return { ...item, image: "" };
    } else {
      // old image path stays
      return item;
    }
  });

  formData.append("data", JSON.stringify(dataToSend));

  // append each changed/new image with a known key (like image_0, image_1)
  images.forEach((file, index) => {
    if (file) formData.append(`image_${index}`, file);
  });

  try {
    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_APP_URL}api/admin/kangaroo-test`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success(res.data.message || "Saved successfully");
    fetchKangarooData();
  } catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Kangaroo Test Management
        </h3>

        <label className="block mb-2 font-medium">Test Prep Description</label>
        <textarea
          name="testPrepDescription"
          value={form.testPrepDescription}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-xl mb-4"
        />

        <label className="block mb-2 font-medium">
          Test Structure Description
        </label>
        {form.testStructureDescription.map((desc, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={desc}
              onChange={(e) =>
                handleArrayChange(
                  "testStructureDescription",
                  index,
                  e.target.value
                )
              }
              placeholder={`Structure ${index + 1}`}
              className="flex-1 p-3 border border-gray-300 rounded-xl"
            />
            {form.testStructureDescription.length > 1 && (
              <button
                onClick={() =>
                  removeArrayField("testStructureDescription", index)
                }
                className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayField("testStructureDescription")}
          className="text-blue-600 text-sm mb-4"
        >
          + Add Test Structure
        </button>

        {/* Data Section */}
        <h4 className="font-medium mb-2">Data Sections</h4>
   {form.data.map((item, dataIndex) => (
  <div
    key={dataIndex}
    className="border border-gray-200 rounded-xl p-4 mb-3 bg-gray-50"
  >
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          handleDataChange(dataIndex, "image", imageUrl);
        }
      }}
      className="w-full p-3 border border-gray-300 rounded-xl mb-2"
    />

    {item.image && (
      <div className="mb-3">
        <img
          src={item.image}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-lg border"
        />
      </div>
    )}

    <label className="block mb-1 font-medium text-sm">Points</label>
    {item.points.map((point, pointIndex) => (
      <div key={pointIndex} className="flex gap-2 mb-2">
        <input
          type="text"
          value={point}
          onChange={(e) =>
            handlePointChange(dataIndex, pointIndex, e.target.value)
          }
          placeholder={`Point ${pointIndex + 1}`}
          className="flex-1 p-3 border border-gray-300 rounded-xl"
        />
        {item.points.length > 1 && (
          <button
            onClick={() => removePoint(dataIndex, pointIndex)}
            className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
          >
            ✕
          </button>
        )}
      </div>
    ))}
    <button
      onClick={() => addPoint(dataIndex)}
      className="text-blue-600 text-sm mb-2"
    >
      + Add Point
    </button>

    {/* 👇 This button removes the whole data section */}
    {form.data.length > 1 && (
      <button
        onClick={() => removeDataItem(dataIndex)}
        className="text-red-600 text-sm mt-2"
      >
        ✕ Remove Section
      </button>
    )}
  </div>
))}


        <button
          onClick={addDataItem}
          className="w-full py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
        >
          + Add Data Section
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
