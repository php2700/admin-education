// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ActTestPrepAdmin() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("educationToken");

  // --- Initial State ---
  const initialState = {
    heroTitle: "",
    heroDescription: "",

    aboutHeading: "",
    aboutDescription: "",
    aboutList: [{ title: "", description: "" }],

    actHeading: "",
    actList: [{ title: "", description: "" }],
  };

  const [form, setForm] = useState(initialState);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/act-test`,
        { headers: { Authorization: `Bearer ${token}` } }
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

  // ===========================
  //       INPUT HANDLERS
  // ===========================
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleObjectListChange = (listName, index, field, value) => {
    const updated = [...form[listName]];
    updated[index][field] = value;
    setForm({ ...form, [listName]: updated });
  };

  const addObjectListItem = (listName) => {
    setForm({
      ...form,
      [listName]: [...form[listName], { title: "", description: "" }],
    });
  };

  const removeObjectListItem = (listName, index) => {
    const updated = form[listName].filter((_, i) => i !== index);
    setForm({ ...form, [listName]: updated });
  };

  // ===========================
  //       SAVE BUTTON
  // ===========================
  const handleSave = async () => {
    if (!form.heroTitle.trim()) return toast.error("Hero Title is required!");
    if (!form.heroDescription.trim()) return toast.error("Hero Description is required!");

    if (!form.aboutHeading.trim()) return toast.error("About Heading is required!");
    if (!form.aboutDescription.trim()) return toast.error("About Description is required!");

    if (!form.actHeading.trim()) return toast.error("ACT Heading is required!");

    const cleanedAboutList = form.aboutList.filter(
      (a) => a.title.trim() !== "" || a.description.trim() !== ""
    );
    const cleanedActList = form.actList.filter(
      (a) => a.title.trim() !== "" || a.description.trim() !== ""
    );

    if (cleanedAboutList.length === 0)
      return toast.error("At least one About List item is required!");

    if (cleanedActList.length === 0)
      return toast.error("At least one ACT List item is required!");

    const payload = {
      ...form,
      aboutList: cleanedAboutList,
      actList: cleanedActList,
    };

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_URL}api/admin/act-test`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("ACT Page Saved Successfully");
      setForm(payload);
    } catch (err) {
      console.log(err);
      toast.error("Failed to Save");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  //       DELETE ALL
  // ===========================
  const handleDelete = async () => {
    if (!confirm("Delete ALL ACT data?")) return;
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/act-test`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted Successfully");
      setForm(initialState);
    } catch (err) {
      toast.error("Delete Failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  //                       UI PAGE
  // ==========================================================
  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl border-t-4 border-blue-600 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          ACT Test Preparation — Admin
        </h2>

        {/* --------------------------- HERO SECTION --------------------------- */}
        <section className="mb-8 border-b pb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            Hero Section <span className="text-red-500">*</span>
          </h3>

          <input
            name="heroTitle"
            value={form.heroTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            placeholder="Hero Title..."
          />

          <textarea
            name="heroDescription"
            value={form.heroDescription}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded"
            placeholder="Hero Description..."
          />
        </section>

        {/* --------------------------- ABOUT SECTION --------------------------- */}
        <section className="mb-8 border-b pb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            About ACT Section <span className="text-red-500">*</span>
          </h3>

          <input
            name="aboutHeading"
            value={form.aboutHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            placeholder="About Heading..."
          />

          <textarea
            name="aboutDescription"
            value={form.aboutDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-6"
            rows={4}
            placeholder="About Description..."
          />

          <h4 className="font-semibold mb-2">About List Items:</h4>

          {form.aboutList.map((item, index) => (
            <div key={index} className="border rounded p-4 mb-3 bg-gray-50">
              <input
                value={item.title}
                onChange={(e) =>
                  handleObjectListChange("aboutList", index, "title", e.target.value)
                }
                className="w-full p-2 border rounded mb-2"
                placeholder="Title..."
              />

              <textarea
                value={item.description}
                onChange={(e) =>
                  handleObjectListChange(
                    "aboutList",
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Description..."
              />

              <button
                onClick={() => removeObjectListItem("aboutList", index)}
                className="text-red-600 mt-2"
              >
                ✕ Remove
              </button>
            </div>
          ))}

          <button
            onClick={() => addObjectListItem("aboutList")}
            className="text-blue-600"
          >
            + Add About Item
          </button>
        </section>

        {/* --------------------------- ACT LIST SECTION --------------------------- */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            ACT Test Sections <span className="text-red-500">*</span>
          </h3>

          <input
            name="actHeading"
            value={form.actHeading}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            placeholder="ACT Test Heading..."
          />

          {form.actList.map((item, index) => (
            <div key={index} className="border rounded p-4 mb-3 bg-gray-50">
              <input
                value={item.title}
                onChange={(e) =>
                  handleObjectListChange("actList", index, "title", e.target.value)
                }
                className="w-full p-2 border rounded mb-2"
                placeholder="ACT Test Section Title..."
              />

              <textarea
                value={item.description}
                onChange={(e) =>
                  handleObjectListChange(
                    "actList",
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Description..."
              />

              <button
                onClick={() => removeObjectListItem("actList", index)}
                className="text-red-600 mt-2"
              >
                ✕ Remove
              </button>
            </div>
          ))}

          <button
            onClick={() => addObjectListItem("actList")}
            className="text-blue-600"
          >
            + Add ACT Item
          </button>
        </section>

        {/* --------------------------- ACTION BUTTONS --------------------------- */}
        <div className="flex gap-4 mt-6 pt-6 border-t">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow"
          >
            {loading ? "Saving..." : "Save All Changes"}
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}
