// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { FaEdit, FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import path from "path";

export default function Pricing() {
  const [form, setForm] = useState({
    className: "",
    fees: [{ label: "", price: "" }], // now an array
    feesPerHour: "",
    off: "",
    planName: "",
  });
  const [image, setImage] = useState(null);
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
  };

  // fees handlers
  const addFeeRow = () => {
    setForm((prev) => ({ ...prev, fees: [...prev.fees, { label: "", price: "" }] }));
  };

  const updateFeeRow = (index, key, value) => {
    setForm((prev) => {
      const fees = [...prev.fees];
      fees[index] = { ...fees[index], [key]: value };
      return { ...prev, fees };
    });
  };

  const removeFeeRow = (index) => {
    setForm((prev) => {
      const fees = prev.fees.filter((_, i) => i !== index);
      return { ...prev, fees: fees.length ? fees : [{ label: "", price: "" }] };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // fetch all pricing items
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_APP_URL}api/admin/pricing`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch pricing list");
    } finally {
      setLoading(false);
    }
  };

  // Add or Update
  const handleSubmit = async () => {
    const { className, fees, feesPerHour, off, planName } = form;
   
    for (let i = 0; i < fees.length; i++) {
      if (!fees[i].label?.trim() || !fees[i].price?.toString().trim()) {
        toast.error(`Fee row ${i + 1} is incomplete`);
        return;
      }
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("className", className);
      formData.append("fees", JSON.stringify(fees)); // stringified array
      formData.append("feesPerHour", feesPerHour);
      formData.append("off", off);
      formData.append("planName", planName);
      if (image) formData.append("image", image);

      let res;
      if (editId) {
        formData.append("_id", editId);
        res = await axios.patch(`${import.meta.env.VITE_APP_URL}api/admin/pricing`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Pricing updated successfully");
      } else {
        res = await axios.post(`${import.meta.env.VITE_APP_URL}api/admin/pricing`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Pricing added successfully");
      }

      // reset
      setForm({ className: "", fees: [{ label: "", price: "" }], feesPerHour: "", off: "", planName: "" });
      setImage(null);
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
    setForm({ className: "", fees: [{ label: "", price: "" }], feesPerHour: "", off: "", planName: "" });
    setImage(null);
    setPreview("");
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    // item.fees could be stored as array or JSON string; handle both
    let feesParsed = [];
    if (Array.isArray(item.fees)) feesParsed = item.fees;
    else {
      try {
        feesParsed = JSON.parse(item.fees);
        if (!Array.isArray(feesParsed)) feesParsed = [{ label: "", price: "" }];
      } catch {
        // if simple value, convert to one-row
        feesParsed = [{ label: "Fee", price: item.fees }];
      }
    }

    setForm({
      className: item.className || "",
      fees: feesParsed.length ? feesParsed : [{ label: "", price: "" }],
      feesPerHour: item.feesPerHour || "",
      off: item.off || "",
      planName: item.planName || "",
    });

    // preview image URL - ensure correct path if backend stores 'public/uploads/...'
    setPreview(item.image ? `${import.meta.env.VITE_APP_URL}${item.image}` : "");
    setEditId(item._id);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_URL}api/admin/pricing/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Item deleted successfully");
      fetchList();
    } catch {
      toast.error("Failed to delete item");
    } finally {
      setConfirmModal(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const formatFeesDisplay = (fees) => {
    try {
      const parsed = Array.isArray(fees) ? fees : JSON.parse(fees);
      return parsed.map((f, i) => (
        <div key={i} className="text-sm">
          {f.label ? `${f.label}: ` : ""} <span className="font-medium">{f.price}</span>
        </div>
      ));
    } catch {
      return <div className="text-sm font-medium">₹{fees}</div>;
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Pricing
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No pricing data found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Image</th>
                <th className="px-4 py-3 border-b">Class Name</th>
                <th className="px-4 py-3 border-b">Plan</th>
                <th className="px-4 py-3 border-b">Fees</th>
                <th className="px-4 py-3 border-b">Fee / Hour</th>
                <th className="px-4 py-3 border-b">Off</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">
                    <img src={`${import.meta.env.VITE_APP_URL}${item.image}`} alt={item.className} className="w-16 h-16 rounded-lg object-cover border" />
                  </td>
                  <td className="px-4 py-3 border-b">{item.className}</td>
                  <td className="px-4 py-3 border-b">{item.planName || "-"}</td>
                  <td className="px-4 py-3 border-b">{formatFeesDisplay(item.fees)}</td>
                  <td className="px-4 py-3 border-b">{item.feesPerHour}</td>
                  <td className="px-4 py-3 border-b">{item.off}</td>
                  <td className="px-4 py-3 border-b text-center">
                    <button onClick={() => openEdit(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteClick(item._id)} className="text-red-600 hover:text-red-800">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative shadow-xl">
            <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-800" onClick={() => setShowModal(false)}>
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">{editId ? "Edit Pricing" : "Add Pricing"}</h3>

            {/* Upload */}
            <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 text-center mb-3 bg-blue-50 hover:bg-blue-100">
              <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                <FiUploadCloud className="text-3xl text-blue-500 mb-2" />
                <span className="text-sm text-gray-700 font-medium">{image ? "Change Image" : "Click to Upload Image"}</span>
                <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            {preview && (
              <div className="flex justify-center mb-4">
                <img src={preview} alt="Preview" className="w-full object-cover rounded-xl border max-h-48" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input type="text" name="className" value={form.className} onChange={handleChange} placeholder="Enter class name with hour" className="w-full p-3 border border-gray-300 rounded-xl" />
              <input type="text" name="planName" value={form.planName} onChange={handleChange} placeholder="Plan name (e.g., Basic, Premium)" className="w-full p-3 border border-gray-300 rounded-xl" />
            </div>

            {/* Fees dynamic rows */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Fees</h4>
                <button type="button" onClick={addFeeRow} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                  <FaPlus /> Add Fee
                </button>
              </div>

              <div className="space-y-2">
                {form.fees.map((fee, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input value={fee.label} onChange={(e) => updateFeeRow(idx, "label", e.target.value)} placeholder="Label e.g., Basic" className="flex-1 p-2 border border-gray-300 rounded-xl" />
                    <input value={fee.price} onChange={(e) => updateFeeRow(idx, "price", e.target.value)} placeholder="Price" className="w-32 p-2 border border-gray-300 rounded-xl" />
                    <button type="button" onClick={() => removeFeeRow(idx)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                      <FaMinus />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input type="text" name="feesPerHour" value={form.feesPerHour} onChange={handleChange} placeholder="Enter fee per hour" className="w-full p-3 border border-gray-300 rounded-xl" />
              <input type="text" name="off" value={form.off} onChange={handleChange} placeholder="Enter off (%)" className="w-full p-3 border border-gray-300 rounded-xl" />
            </div>

            <button onClick={handleSubmit} disabled={loading} className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this pricing item?</h3>
            <div className="flex justify-center gap-4">
              <button onClick={handleConfirmDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Yes
              </button>
              <button onClick={() => setConfirmModal(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
