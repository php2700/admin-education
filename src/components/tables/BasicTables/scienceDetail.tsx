// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ScienceDetail = () => {
  const token = localStorage.getItem("educationToken");

  const [list, setList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    heading: "",
    description: "",
    image: null,
    previewImage: null,
    id: null,
  });

  const fetchList = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/science-detail`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setList(res.data.data || []);
    } catch {
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

  const handleEdit = (item) => {
    setForm({
      id: item._id,
      title: item.title,
      heading: item.heading,
      description: item.description,
      image: null,
      previewImage: `${import.meta.env.VITE_APP_URL}${item.image}`,
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
        `${import.meta.env.VITE_APP_URL}api/admin/science-detail/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Deleted");
      setDeleteModal(false);
      fetchList();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSave = async () => {
    if (!form.title) return toast.error("Title required");
    if (!form.heading) return toast.error("Heading required");
    if (!form.description) return toast.error("Description required");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("heading", form.heading);
    fd.append("description", form.description);

    if (form.image) fd.append("image", form.image);
    if (form.id) fd.append("id", form.id);

    try {
      setLoading(true);

      const url = `${import.meta.env.VITE_APP_URL}api/admin/science-detail`;
      const method = form.id ? "patch" : "post";

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
    } catch {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      heading: "",
      description: "",
      image: null,
      previewImage: null,
      id: null,
    });
  };

  return (
    <div className="bg-white p-6 mt-8 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Science Detail</h2>
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
          <div className="grid grid-cols-12 bg-gray-100 p-3 font-semibold text-sm">
            <div className="col-span-2">Image</div>
            <div className="col-span-2">Title</div>
            <div className="col-span-2">Heading</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>

          {list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-12 items-center p-3 border-b last:border-none"
            >
              <div className="col-span-2">
                <img
                  src={`${import.meta.env.VITE_APP_URL}${item.image}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              </div>

              <div className="col-span-2 font-medium">{item.title}</div>
              <div className="col-span-2 font-medium">{item.heading}</div>

              <div className="col-span-5 text-sm">{item.description}</div>

              <div className="col-span-1 flex flex-col gap-2">
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
              className="border w-full p-2 rounded mb-3"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <label className="font-medium">Heading</label>
            <input
              className="border w-full p-2 rounded mb-3"
              value={form.heading}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
            />

            <label className="font-medium">Description</label>
            <textarea
              className="border w-full p-2 rounded mb-3"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <label className="font-medium">Image</label>
            <input
              type="file"
              onChange={handleImage}
              className="border w-full p-2 rounded mb-3"
            />

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
    </div>
  );
};
