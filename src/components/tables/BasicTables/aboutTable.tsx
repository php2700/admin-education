// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { FaRegImage } from "react-icons/fa";

export default function About() {
    const [form, setForm] = useState({
        description: [""],
        whyUsDescription: [""],
        howDiffrentDescription: [""],
        safetyDescription: [""],
        tutorDescription: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const token = localStorage.getItem("educationToken");

    const handleArrayChange = (field, index, value) => {
        const updated = [...form[field]];
        updated[index] = value;
        setForm({ ...form, [field]: updated });
    };

    const addArrayItem = (field) => {
        setForm({ ...form, [field]: [...form[field], ""] });
    };

    const removeArrayItem = (field, index) => {
        const updated = [...form[field]];
        updated.splice(index, 1);
        setForm({ ...form, [field]: updated });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file?.type.startsWith("image/")) {
            setError("Please select a valid image");
            return;
        }
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setError("");
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");

            const formData = new FormData();
            formData.append("tutorDescription", form.tutorDescription);
            formData.append("description", JSON.stringify(form.description));
            formData.append("whyUsDescription", JSON.stringify(form.whyUsDescription));
            formData.append("howDiffrentDescription", JSON.stringify(form.howDiffrentDescription));
            formData.append("safetyDescription", JSON.stringify(form.safetyDescription));
            if (image) formData.append("image", image);

            const res = await axios.post(
                `${import.meta.env.VITE_APP_URL}api/admin/about`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Saved successfully");
            setTimeout(() => setMessage(""), 2000);

            if (res.data.data?.image) {
                setPreview(`${import.meta.env.VITE_APP_URL}${res.data.data.image}`);
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getAboutData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${import.meta.env.VITE_APP_URL}api/admin/about`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data?.data) {
                const d = res.data.data;

                setForm({
                    description: d.description || [""],
                    whyUsDescription: d.whyUsDescription || [""],
                    howDiffrentDescription: d.howDiffrentDescription || [""],
                    safetyDescription: d.safetyDescription || [""],
                    tutorDescription: d.tutorDescription || "",
                });

                if (d.image) {
                    setPreview(`${import.meta.env.VITE_APP_URL}${d.image}`);
                }
            }
        } catch (err) {
            setError("Failed to load About data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAboutData();
    }, []);

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 space-y-6">
                
                {/* Alerts */}
                {error && (
                    <div className="bg-red-200 text-red-700 p-3 rounded-xl text-center font-semibold">
                        {error}
                    </div>
                )}
                {message && (
                    <div className="bg-green-200 text-green-700 p-3 rounded-xl text-center font-semibold">
                        {message}
                    </div>
                )}

                {/* Upload Image */}
                <div className="border-2 border-dashed border-blue-400 p-6 rounded-xl text-center">
                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                        <FiUploadCloud className="text-4xl text-blue-600" />
                        <p>{image ? "Change Image" : "Upload Image"}</p>
                    </label>
                    <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
                </div>

                {/* Preview */}
                {preview && (
                    <div className="bg-gray-200 rounded-xl overflow-hidden shadow">
                        <div className="bg-blue-600 text-white p-3 flex gap-2 items-center">
                            <FaRegImage /> <span>Preview</span>
                        </div>
                        <img src={preview} className="w-full h-64 object-cover" />
                    </div>
                )}

                {/* Dynamic Array Fields */}
                {[
                    { key: "description", label: "Description" },
                    { key: "whyUsDescription", label: "Why Us Description" },
                    { key: "howDiffrentDescription", label: "How Different Description" },
                    { key: "safetyDescription", label: "Safety Description" },
                ].map((field) => (
                    <div key={field.key}>
                        <label className="font-semibold text-gray-700">{field.label}</label>
                        {form[field.key].map((val, idx) => (
                            <div key={idx} className="flex items-center gap-3 mt-2">
                                <input
                                    type="text"
                                    value={val}
                                    onChange={(e) =>
                                        handleArrayChange(field.key, idx, e.target.value)
                                    }
                                    className="w-full p-3 border rounded-xl"
                                />
                                {idx !== 0 && (
                                    <button
                                        onClick={() => removeArrayItem(field.key, idx)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem(field.key)}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
                        >
                            + Add More
                        </button>
                    </div>
                ))}

                {/* Tutor Description */}
                <div>
                    <label className="font-semibold text-gray-700">Tutor Description</label>
                    <textarea
                        value={form.tutorDescription}
                        onChange={(e) =>
                            setForm({ ...form, tutorDescription: e.target.value })
                        }
                        className="w-full p-3 border rounded-xl"
                        rows="3"
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}
