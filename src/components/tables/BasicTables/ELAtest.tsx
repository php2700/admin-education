// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";



export default function ElaTestAdminPage() {
 
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  const initialState = {
    heroTitle: "",
    heroDescription: "",
    introHeading: "",
    introDescription: "",

    administrationHeading: "",
    administrationPoints: [{ title: "", description: "" }],
  };

  const [form, setForm] = useState(initialState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/ela-test`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.data) {
        setForm({ ...initialState, ...res.data.data });
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdminPointChange = (index, field, value) => {
    const updated = [...form.administrationPoints];
    updated[index][field] = value;
    setForm({ ...form, administrationPoints: updated });
  };

  const addAdminPoint = () => {
    setForm({
      ...form,
      administrationPoints: [
        ...form.administrationPoints,
        { title: "", description: "" },
      ],
    });
  };

  const removeAdminPoint = (idx) => {
    const updated = form.administrationPoints.filter((_, i) => i !== idx);
    setForm({ ...form, administrationPoints: updated });
  };

  const handleSave = async () => {
    if (!form.heroTitle.trim()) return toast.error("Hero Title required");
    if (!form.heroDescription.trim())
      return toast.error("Hero Description required");
    if (!form.introHeading.trim()) return toast.error("Intro Heading required");
    if (!form.introDescription.trim())
      return toast.error("Intro Description required");
    if (!form.administrationHeading.trim())
      return toast.error("Administration Heading required");

    const validAdmin = form.administrationPoints.filter(
      (a) => a.title.trim() !== "" && a.description.trim() !== ""
    );
    if (validAdmin.length === 0)
      return toast.error("At least one Administration Point required");

    const dataToSend = {
      ...form,
      administrationPoints: validAdmin,
    };

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/ela-test`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Saved successfully");
      setForm(dataToSend);
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete all ELA data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/ela-test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted successfully");
      setForm(initialState);
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full  bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">ELA Test Admin</h1>

        {/* Hero Section */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Hero Section</h2>
          <input
            type="text"
            name="heroTitle"
            value={form.heroTitle}
            onChange={handleChange}
            placeholder="Hero Title"
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="heroDescription"
            value={form.heroDescription}
            onChange={handleChange}
            placeholder="Hero Description"
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Intro Section */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Intro Section</h2>
          <input
            type="text"
            name="introHeading"
            value={form.introHeading}
            onChange={handleChange}
            placeholder="Intro Heading"
            className="w-full mb-2 p-2 border rounded"
          />
          {/* <textarea
            name="introDescription"
            value={form.introDescription}
            onChange={handleChange}
            placeholder="Intro Description"
            rows={3}
            className="w-full p-2 border rounded"
          /> */}
          <ReactQuill
            theme="snow"
            value={form.introDescription}
            onChange={(value) => setForm({ ...form, introDescription: value })}
            placeholder="Intro Description"
            className="w-full bg-white rounded"
            modules={{
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    ["link"],
    ["clean"],
  ],
}}
                           theme="snow"
          />
        </div>

        {/* Administration Section */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Administration Section</h2>
          <input
            type="text"
            name="administrationHeading"
            value={form.administrationHeading}
            onChange={handleChange}
            placeholder="Administration Heading"
            className="w-full mb-2 p-2 border rounded"
          />

          {form.administrationPoints.map((item, idx) => (
            <div key={idx} className="mb-4 p-3 border rounded">
              <input
                type="text"
                value={item.title}
                onChange={(e) =>
                  handleAdminPointChange(idx, "title", e.target.value)
                }
                placeholder="Title"
                className="w-full mb-2 p-2 border rounded"
              />
              <textarea
                value={item.description}
                onChange={(e) =>
                  handleAdminPointChange(idx, "description", e.target.value)
                }
                placeholder="Description"
                rows={2}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => removeAdminPoint(idx)}
                className="mt-2 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <button onClick={addAdminPoint} className="text-blue-600 text-sm">
            + Add Administration Point
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 border border-red-500 text-red-500 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
