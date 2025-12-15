// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const KargarooDetail = () => {
  const token = localStorage.getItem("educationToken");

  const [list, setList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: [""],
    image: null,
    previewImage: null,
  });

  // -----------------------------------------
  // Load List
  // -----------------------------------------
  const fetchList = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/detail-kangaroo`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setList(res.data.data || []);
    } catch (err) {
      toast.error("Unable to fetch details");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      image: file,
      previewImage: URL.createObjectURL(file),
    });
  };

  const handleDescriptionChange = (i, v) => {
    const updated = [...form.description];
    updated[i] = v;
    setForm({ ...form, description: updated });
  };

  const addDescription = () => {
    setForm({ ...form, description: [...form.description, ""] });
  };

  const removeDescription = (i) => {
    setForm({
      ...form,
      description: form.description.filter((_, idx) => idx !== i),
    });
  };

  // -----------------------------------------
  // Edit Button Handler
  // -----------------------------------------
  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      image: null,
      previewImage: `${import.meta.env.VITE_APP_URL}${item.image}`,
      id: item._id,
    });

    setOpenForm(true);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/detail-kangaroo/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Deleted");
      setDeleteModal(false);
      fetchList();
    } catch {
      toast.error("Failed to delete");
    }
  };

  // -----------------------------------------
  // Save Add/Edit
  // -----------------------------------------
  const handleSave = async () => {
    if (!form.title) return toast.error("Title required");
    if (!form.description[0]) return toast.error("Description required");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", JSON.stringify(form.description));
    if (form.image) fd.append("image", form.image);

    try {
      setLoading(true);

      const url = form.id
        ? `${import.meta.env.VITE_APP_URL}api/admin/detail-kangaroo`
        : `${import.meta.env.VITE_APP_URL}api/admin/detail-kangaroo`;
      const method = form.id ? "patch" : "post";
      if (form.id) fd.append("id", form.id);

      const res = await axios({
        method,
        url,
        data: fd,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      setOpenForm(false);
      fetchList();
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: [""],
      image: null,
      previewImage: null,
      id: null,
    });
  };

  return (
    <div className="bg-white p-6 mt-8 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Kangaroo Detail</h2>
        <button
          onClick={() => {
            resetForm();
            setOpenForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Detail
        </button>
      </div>

      <div className="w-full mt-4">
        <div className="border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold text-sm">
            <div className="col-span-2">Image</div>
            <div className="col-span-3">Title</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Rows */}
          {list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-12 items-center p-3 border-b last:border-none"
            >
              {/* Image */}
              <div className="col-span-2">
                <img
                  src={`${import.meta.env.VITE_APP_URL}${item.image}`}
                  alt="kangaroo"
                  className="w-20 h-20 object-cover rounded border"
                />
              </div>

              {/* Title */}
              <div className="col-span-3 font-medium">{item.title}</div>

              {/* Description */}
              <div className="col-span-5 text-sm">
                <ul className="list-disc ml-4">
                  {/* {item.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))} */}
                  {item.description?.length && (
    <button
      onClick={() => setSelectedMessage(item.description)}
      className="ml-2 text-blue-600 font-medium hover:underline"
    >
      View
    </button>
  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => openDeleteModal(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              {form.id ? "Edit Detail" : "Add Detail"}
            </h3>

            <label className="font-medium">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border w-full p-2 rounded mb-3"
            />

            <label className="font-medium">Descriptions</label>
            {form.description.map((d, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={d}
                  onChange={(e) => handleDescriptionChange(i, e.target.value)}
                  className="border flex-1 p-2 rounded"
                />
                {form.description.length > 1 && (
                  <button
                    onClick={() => removeDescription(i)}
                    className="bg-red-500 text-white px-3 rounded"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addDescription}
              className="text-blue-600 mb-3 text-sm"
            >
              + Add Description
            </button>

            <div className="font-medium">Image</div>
            <div className="mt-3">
              <input
                type="file"
                onChange={handleImage}
                className="border w-full p-2 rounded mb-3"
              />
            </div>

            {form.previewImage && (
              <img
                src={form.previewImage}
                className="w-full h-40 object-cover rounded mt-3 shadow"
              />
            )}

            <div className="flex gap-2 mt-5">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white py-2 px-4 rounded flex-1"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setOpenForm(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded flex-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="text-sm mb-6">
              Do you really want to delete this item?
            </p>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded flex-1"
              >
                Yes
              </button>

              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

          {selectedMessage && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-lg relative">
      <button
        onClick={() => setSelectedMessage(null)}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
      >
        ✖
      </button>

      <h3 className="text-lg font-semibold mb-3">Description</h3>
 <ul className="text-gray-700 whitespace-pre-wrap list-decimal pl-5">
  {selectedMessage?.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

    </div>
  </div>
)}
    </div>
  );
};
