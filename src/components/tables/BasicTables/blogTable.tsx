// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function BlogTab() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "image", // 🟢 NEW
  });
  const [selectedDescription, setSelectedDescription] = useState(null);

  const [file, setFile] = useState(null); // image or video both
  const [preview, setPreview] = useState("");

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("educationToken");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // 🟢 If switching type, clear previous file + preview
    if (e.target.name === "type") {
      setFile(null);
      setPreview("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // 🟢 Validate based on type
    if (form.type === "image" && !file?.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (form.type === "video" && !file?.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/blog`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setList(res.data.data || []);
    } catch {
      toast.error("Failed to fetch blog list");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const { title, description, type } = form;

    if (!title || !description) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);

      if (file) {
        formData.append(type, file); // ⬅️ If type = "image" → append("image"), if "video" → append("video")
      }

      let res;
      if (editId) {
        formData.append("_id", editId);
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/blog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Blog updated successfully");
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/blog`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Blog added successfully");
      }

      setForm({ title: "", description: "", type: "image" });
      setFile(null);
      setPreview("");
      setEditId(null);
      setShowModal(false);
      fetchList();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setForm({ title: "", description: "", type: "image" });
    setFile(null);
    setPreview("");
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      type: item.type, // 🟢 detect type (video/image)
    });

    if (item.type === "image") {
      setPreview(`${import.meta.env.VITE_APP_URL}${item.image}`);
    } else {
      setPreview(`${import.meta.env.VITE_APP_URL}${item.video}`);
    }

    setEditId(item._id);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/blog/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Blog deleted successfully");
      fetchList();
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setConfirmModal(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const getShortTextFromHTML = (html = "", limit = 50) => {
    const div = document.createElement("div");
    div.innerHTML = html;

    const text = div.textContent || div.innerText || "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const getTextLength = (html = "") => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent?.length || 0;
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Blog
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No blog posts found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Image</th>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Description</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">
                    {item.type === "image" && item.image ? (
                      <img
                        src={`${import.meta.env.VITE_APP_URL}${item.image}`}
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover border"
                      />
                    ) : item.type === "video" && item.video ? (
                      <video
                        src={`${import.meta.env.VITE_APP_URL}${item.video}`}
                        className="w-20 h-20 rounded-lg border"
                        controls
                      />
                    ) : (
                      <span>No Media</span>
                    )}
                  </td>

                  <td className="px-4 py-3 border-b font-semibold text-gray-800">
                    {item.title}
                  </td>
                  {/* <td className="px-4 py-3 border-b text-gray-600 truncate max-w-xs " dangerouslySetInnerHTML={{__html:item.description}}>
                  </td> */}
                  <td className="px-4 py-3 border-b text-gray-600 max-w-xs">
                    {getShortTextFromHTML(item.description, 50)}

                    {getTextLength(item.description) > 50 && (
                      <button
                        onClick={() => setSelectedDescription(item.description)}
                        className="ml-2 text-blue-600 text-sm font-medium hover:underline"
                      >
                        View more
                      </button>
                    )}
                  </td>

                  <td className="px-4 py-3 border-b text-center">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center overflow-y-auto justify-center z-100000 "
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-xl w-full max-w-3xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-2"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h3 className="text-lg font-bold mb-4">
              {editId ? "Edit Blog" : "Add Blog"}
            </h3>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded-lg"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

            {/* FILE UPLOADER */}
            <div className="border-2 border-dashed p-4 rounded-xl mb-3 text-center">
              <label htmlFor="fileInput" className="cursor-pointer">
                <FiUploadCloud className="text-3xl mx-auto mb-2" />
                <span className="text-sm">
                  {file ? "Change File" : `Upload ${form.type}`}
                </span>
              </label>
              <input
                id="fileInput"
                type="file"
                accept={form.type === "image" ? "image/*" : "video/*"}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="mb-3">
                {form.type === "image" ? (
                  <img src={preview} className="rounded-xl h-50" />
                ) : (
                  <video src={preview} controls className="rounded-xl" />
                )}
              </div>
            )}

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border rounded-lg mb-3"
            />

            {/* <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded-lg mb-3 h-32"
            /> */}
            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, description: value }))
              }
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                  ["clean"],
                ],
              }}
              placeholder="Description"
              className="mb-3 bg-white rounded-lg"
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white w-full py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this blog?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedDescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedDescription(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h3 className="text-lg font-semibold mb-4">Description</h3>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedDescription }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
