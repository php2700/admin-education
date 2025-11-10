// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineDescription } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";

export default function About() {
      const [form, setForm] = useState({ title: "", description: "" });
      const [image, setImage] = useState(null);
      const [preview, setPreview] = useState("");
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState("");
      const [error, setError] = useState("");
      const token = localStorage.getItem("educationToken");
      const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
      };

      const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file?.type.startsWith("image/")) {
                  setError("Please select a valid image file");
                  return;
            }
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError("");
      };

      const handleSubmit = async () => {
            if (!form.title || !form.description)
                  return setError("All fields are required");

            try {
                  setLoading(true);
                  setError("");
                  setMessage("");

                  const formData = new FormData();
                  formData.append("title", form.title);
                  formData.append("description", form.description);
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

                  setMessage(res.data.message);
                  setTimeout(() => {
                        setMessage("");
                  }, 2000);
                  if (res.data.data.image)
                        setPreview(
                              `${import.meta.env.VITE_APP_URL}${
                                    res.data.data.image
                              }`
                        );
            } catch (err) {
                  setError(
                        err.response?.data?.message || "Something went wrong"
                  );
            } finally {
                  setLoading(false);
            }
      };

      const getaboutData = async () => {
            try {
                  setLoading(true);
                  setError("");
                  setMessage("");
                  if (!token) {
                        setError(
                              "Authentication token missing. Please log in again."
                        );
                        return;
                  }
                  const res = await axios.get(
                        `${import.meta.env.VITE_APP_URL}api/admin/about`,
                        {
                              headers: {
                                    Authorization: `Bearer ${token}`,
                              },
                        }
                  );
                  if (res.data?.data) {
                        const aboutData = res.data.data;
                        setForm({
                              title: aboutData.title || "",
                              description: aboutData.description || "",
                        });
                        if (aboutData?.image) {
                              setPreview(
                                    `${import.meta.env.VITE_APP_URL}${
                                          aboutData.image
                                    }`
                              );
                        }
                        setMessage("About data loaded successfully!");
                        setTimeout(() => {
                              setMessage("");
                        }, 2000);
                  }
            } catch (error) {
                  setError("Failed to load About data.");
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            getaboutData();
      }, []);

      return (
            <div className="  from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
                  <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 space-y-6 transform transition-all duration-500 ">
                        {/* Title */}
                        {/* Alerts */}
                        {error && (
                              <div className="text-center bg-red-100 text-red-700 font-medium p-3 rounded-xl">
                                    {error}
                              </div>
                        )}
                        {message && !error && (
                              <div className="text-center bg-green-100 text-green-700 font-medium p-3 rounded-xl">
                                    {message}
                              </div>
                        )}
                        <div className="relative">
                              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                                    Title
                              </label>
                              <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Enter title..."
                                    className="w-full p-3  border border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                              />
                        </div>

                        {/* Description */}
                        <div>
                              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                                    Description
                              </label>
                              <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Enter description..."
                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                                    rows={4}
                              ></textarea>
                        </div>

                        {/* Upload Image */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300">
                              <label
                                    htmlFor="fileInput"
                                    className="flex flex-col items-center"
                              >
                                    <FiUploadCloud className="text-4xl text-blue-500 mb-2" />
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                          {image
                                                ? "Change Image"
                                                : "Click to Upload Image"}
                                    </p>
                                    <input
                                          id="fileInput"
                                          type="file"
                                          accept="image/*"
                                          onChange={handleFileChange}
                                          className="hidden"
                                    />
                              </label>
                        </div>

                        {/* Preview */}
                        {preview && (
                              <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold p-3">
                                          <FaRegImage />
                                          <span>Preview</span>
                                    </div>
                                    <img
                                          src={preview}
                                          alt="Preview"
                                          className="w-full h-64 object-cover rounded-b-2xl"
                                    />
                              </div>
                        )}

                        {/* Button */}
                        <button
                              onClick={handleSubmit}
                              disabled={loading}
                              className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex justify-center items-center gap-2"
                        >
                              {loading ? (
                                    <>
                                          <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                          >
                                                <circle
                                                      className="opacity-25"
                                                      cx="12"
                                                      cy="12"
                                                      r="10"
                                                      stroke="currentColor"
                                                      strokeWidth="4"
                                                ></circle>
                                                <path
                                                      className="opacity-75"
                                                      fill="currentColor"
                                                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                                ></path>
                                          </svg>
                                          Saving...
                                    </>
                              ) : (
                                    "Save"
                              )}
                        </button>
                  </div>
            </div>
      );
}
