// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud, FiVideo } from "react-icons/fi";

export default function VideoUpload() {
      const [video, setVideo] = useState(null);
      const [preview, setPreview] = useState("");
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState("");
      const [error, setError] = useState("");
      const [data, setData] = useState(null);

      // Handle file input
      const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith("video/")) {
                  setVideo(file);
                  setPreview(URL.createObjectURL(file));
                  setError("");
                  setMessage("");
            } else {
                  setError("Please select a valid video file.");
                  setVideo(null);
                  setPreview("");
            }
      };

      // Upload or update video
      const handleUpload = async () => {
            if (!video) {
                  setError("Please select a new video before uploading.");
                  return;
            }

            const token = localStorage.getItem("educationToken");
            if (!token) {
                  setError(
                        "Authentication token missing. Please log in again."
                  );
                  return;
            }

            const formData = new FormData();
            formData.append("video", video);

            try {
                  setLoading(true);
                  setError("");
                  setMessage("");

                  const res = await axios.post(
                        `${import.meta.env.VITE_APP_URL}api/admin/banner`,
                        formData,
                        {
                              headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: `Bearer ${token}`,
                              },
                        }
                  );

                  setMessage(
                        res.data.message || "Video uploaded successfully!"
                  );
                  setVideo(null);
                  setPreview("");
                  getData();
            } catch (err) {
                  const errorMsg =
                        err.response?.data?.message ||
                        "Something went wrong during upload.";
                  setError(errorMsg);
            } finally {
                  setLoading(false);
            }
      };

      // Fetch existing banner video
      const getData = async () => {
            const token = localStorage.getItem("educationToken");
            if (!token) return;

            try {
                  const res = await axios.get(
                        `${import.meta.env.VITE_APP_URL}api/admin/get-banner`,
                        {
                              headers: {
                                    Authorization: `Bearer ${token}`,
                              },
                        }
                  );

                  if (res.data?.data?.video) {
                        setData(res.data.data);
                        setPreview(
                              `${import.meta.env.VITE_APP_URL}${
                                    res.data.data.video
                              }`
                        );
                  }
            } catch (err) {
                  setError("Error fetching banner data.");
            }
      };

      useEffect(() => {
            getData();
      }, []);

      return (
            <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg w-full mx-auto transition-all duration-300">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
                        Upload or Update Your Video
                  </h2>

                  {/* Upload input */}
                  <label
                        htmlFor="fileInput"
                        className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 bg-white dark:bg-gray-900 rounded-xl w-full p-6 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                        <FiUploadCloud className="text-4xl text-blue-500 mb-2" />
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {video
                                    ? "Change Video"
                                    : data
                                    ? "Re-upload or Change Video"
                                    : "Click to upload video"}
                        </p>
                        <input
                              id="fileInput"
                              type="file"
                              accept="video/*"
                              onChange={handleFileChange}
                              className="hidden"
                        />
                  </label>

                  {/* Preview Section */}
                  {preview && (
                        <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
                              <div className="p-3 flex items-center gap-2 bg-blue-600 text-white font-semibold">
                                    <FiVideo className="text-lg" />
                                    {data && !video
                                          ? "Current Video"
                                          : "Preview"}
                              </div>
                              <video
                                    src={preview}
                                    controls
                                    className="w-full h-[50vh] object-cover rounded-b-xl"
                              />
                        </div>
                  )}

                  {/* Upload button */}
                  <button
                        onClick={handleUpload}
                        disabled={loading || !video}
                        className="w-full flex justify-center items-center gap-2 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50"
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
                                    Uploading...
                              </>
                        ) : (
                              "Upload Video"
                        )}
                  </button>

                  {error && (
                        <div className="w-full text-center font-medium p-3 rounded-lg bg-red-100 text-red-700">
                              {error}
                        </div>
                  )}

                  {message && !error && (
                        <div className="w-full text-center font-medium p-3 rounded-lg bg-green-100 text-green-700">
                              {message}
                        </div>
                  )}
            </div>
      );
}
