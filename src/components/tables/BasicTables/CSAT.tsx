// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


export default function ScatTestAdminPage() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  const initialState = {
    heroTitle: "",
    heroDescription: "",

    aboutHeading: "",
    aboutDescription: "",
    versionsHeading: "",
    versionsList: [""],

    formatHeading: "",
    formatDescription: "",
    formatSections: [{ title: "", description: "" }],

    scoringHeading: "",
    scoringLevels: [{ title: "", details: "" }],

    tipsHeading: "",
    tipsList: [""],

    registerHeading: "",
    registerSubHeading: "",
    registerContactList: "",
    authHeading: "",
    authDescription: "",
  };

  const [form, setForm] = useState(initialState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/scat-test`,
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

  // Generic handlers for array fields
  const handleArrayChange = (arrayName, index, value) => {
    const updated = [...form[arrayName]];
    updated[index] = value;
    setForm({ ...form, [arrayName]: updated });
  };

  const addArrayItem = (arrayName, defaultValue = "") => {
    setForm({ ...form, [arrayName]: [...form[arrayName], defaultValue] });
  };

  const removeArrayItem = (arrayName, index) => {
    const updated = form[arrayName].filter((_, i) => i !== index);
    setForm({ ...form, [arrayName]: updated });
  };

  // Handlers for object arrays
  const handleObjectArrayChange = (arrayName, index, field, value) => {
    const updated = [...form[arrayName]];
    updated[index][field] = value;
    setForm({ ...form, [arrayName]: updated });
  };

  const addObjectArrayItem = (arrayName, defaultObj) => {
    setForm({ ...form, [arrayName]: [...form[arrayName], defaultObj] });
  };

  const removeObjectArrayItem = (arrayName, index) => {
    const updated = form[arrayName].filter((_, i) => i !== index);
    setForm({ ...form, [arrayName]: updated });
  };

  const handleSave = async () => {
    // Add simple validation if needed
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/scat-test`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Saved successfully");
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete all SCAT Test data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/scat-test`, {
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
      <div className="w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">SCAT Test Admin</h1>

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

        {/* About Section */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">About Section</h2>
          <input
            type="text"
            name="aboutHeading"
            value={form.aboutHeading}
            onChange={handleChange}
            placeholder="About Heading"
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="aboutDescription"
            value={form.aboutDescription}
            onChange={handleChange}
            placeholder="About Description"
            rows={3}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="versionsHeading"
            value={form.versionsHeading}
            onChange={handleChange}
            placeholder="Versions Heading"
            className="w-full mb-2 p-2 border rounded mt-2"
          />

          <h3 className="font-medium mb-1">Versions List</h3>
          {form.versionsList.map((item, idx) => (
            <div key={idx} className="mb-2 flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange("versionsList", idx, e.target.value)
                }
                className="flex-1 p-2 border rounded"
                placeholder="Version"
              />
              <button
                onClick={() => removeArrayItem("versionsList", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem("versionsList", "")}
            className="text-blue-600 text-sm"
          >
            + Add Version
          </button>
        </div>

        {/* Format Sections */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Format Section</h2>
          <input
            type="text"
            name="formatHeading"
            value={form.formatHeading}
            onChange={handleChange}
            placeholder="Format Heading"
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="formatDescription"
            value={form.formatDescription}
            onChange={handleChange}
            placeholder="Format Description"
            rows={3}
            className="w-full p-2 border rounded mb-2"
          />
          <h3 className="font-medium mb-1">Sections</h3>
          {form.formatSections.map((item, idx) => (
            <div key={idx} className="mb-2 p-2 border rounded">
              <input
                type="text"
                value={item.title}
                onChange={(e) =>
                  handleObjectArrayChange(
                    "formatSections",
                    idx,
                    "title",
                    e.target.value
                  )
                }
                placeholder="Title"
                className="w-full mb-1 p-2 border rounded"
              />
              <textarea
                value={item.description}
                onChange={(e) =>
                  handleObjectArrayChange(
                    "formatSections",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Description"
                rows={2}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => removeObjectArrayItem("formatSections", idx)}
                className="mt-1 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              addObjectArrayItem("formatSections", {
                title: "",
                description: "",
              })
            }
            className="text-blue-600 text-sm"
          >
            + Add Section
          </button>
        </div>

        {/* Scoring Levels */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Scoring Section</h2>
          <input
            type="text"
            name="scoringHeading"
            value={form.scoringHeading}
            onChange={handleChange}
            placeholder="Scoring Heading"
            className="w-full mb-2 p-2 border rounded"
          />
          {form.scoringLevels.map((item, idx) => (
            <div key={idx} className="mb-2 p-2 border rounded">
              <input
                type="text"
                value={item.title}
                onChange={(e) =>
                  handleObjectArrayChange(
                    "scoringLevels",
                    idx,
                    "title",
                    e.target.value
                  )
                }
                placeholder="Level Title"
                className="w-full mb-1 p-2 border rounded"
              />
              <textarea
                value={item.details}
                onChange={(e) =>
                  handleObjectArrayChange(
                    "scoringLevels",
                    idx,
                    "details",
                    e.target.value
                  )
                }
                placeholder="Details"
                rows={2}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => removeObjectArrayItem("scoringLevels", idx)}
                className="mt-1 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              addObjectArrayItem("scoringLevels", { title: "", details: "" })
            }
            className="text-blue-600 text-sm"
          >
            + Add Level
          </button>
        </div>

        {/* Tips Section */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Tips Section</h2>
          <input
            type="text"
            name="tipsHeading"
            value={form.tipsHeading}
            onChange={handleChange}
            placeholder="Tips Heading"
            className="w-full mb-2 p-2 border rounded"
          />
          {form.tipsList.map((item, idx) => (
            <div key={idx} className="mb-2 flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange("tipsList", idx, e.target.value)
                }
                className="flex-1 p-2 border rounded"
                placeholder="Tip"
              />
              <button
                onClick={() => removeArrayItem("tipsList", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem("tipsList", "")}
            className="text-blue-600 text-sm"
          >
            + Add Tip
          </button>
        </div>

        {/* Registration & Auth */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Registration & Auth</h2>
          <input
            type="text"
            name="registerHeading"
            value={form.registerHeading}
            onChange={handleChange}
            placeholder="Register Heading"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="registerSubHeading"
            value={form.registerSubHeading}
            onChange={handleChange}
            placeholder="Register Sub Heading"
            className="w-full mb-2 p-2 border rounded"
          />
          {/* <input
            type="text"
            name="registerContactList"
            value={form.registerContactList}
            onChange={handleChange}
            placeholder="Register Contact List"
            className="w-full mb-2 p-2 border rounded"
          /> */}
          <ReactQuill
  theme="snow"
  value={form.registerContactList}
  onChange={(value) => setForm({ ...form, registerContactList: value })}
  placeholder="Register Contact List"
  className="w-full bg-white rounded mb-2"
  modules={{
    toolbar: [
      ["bold", "italic", "underline"], // basic formatting
      [{ color: [] }],                 // text color
      ["link"],                        // links
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["clean"],                       // remove formatting
    ],
  }}
/>
          <input
            type="text"
            name="authHeading"
            value={form.authHeading}
            onChange={handleChange}
            placeholder="Auth Heading"
            className="w-full mb-2 p-2 border rounded"
          />
          {/* <textarea
            name="authDescription"
            value={form.authDescription}
            onChange={handleChange}
            placeholder="Auth Description"
            rows={2}
            className="w-full p-2 border rounded"
          /> */}
          <ReactQuill
            theme="snow"
            value={form.authDescription}
            onChange={(value) => {
              setForm({ ...form, authDescription: value });
            }}
            placeholder="Auth Description"
            className="w-full bg-white rounded"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ color: [] }],
                ["link"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
              ],
            }}
          />
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
