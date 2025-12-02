import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus, FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

// Types Define
interface Member {
  _id: string;
  name: string;
  role: string;
  image: string; // "uploads/filename.jpg"
  description: string;
  order?: number;
}

export default function ManagementAdmin() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    description: "",
    order: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [list, setList] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Backend Base URL
  const API_URL = import.meta.env.VITE_APP_URL; 
  const token = localStorage.getItem("educationToken");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ FIXED FETCH FUNCTION
  const fetchList = async () => {
    try {
      setLoading(true);
      // NOTE: Make sure route matches backend ('/management' or '/getmanagement')
      const res = await axios.get(
        `${API_URL}api/admin/management`, 
        { 
            // 🔴 IMPORTANT: Token bhejna zaroori hai
            headers: { Authorization: `Bearer ${token}` } 
        }
      );
      setList(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.role) {
      toast.error("Name and Role are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("description", form.description);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      
      const config = {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      };

      if (editId) {
        await axios.patch(
          `${API_URL}api/admin/management/${editId}`,
          formData,
          config
        );
        toast.success("Updated Successfully");
      } else {
        await axios.post(
          `${API_URL}api/admin/management`,
          formData,
          config
        );
        toast.success("Added Successfully");
      }
      closeModal();
      fetchList();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_URL}api/admin/management/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Deleted Successfully");
      fetchList();
    } catch {
      toast.error("Delete failed");
    } finally {
      setConfirmModal(false);
    }
  };

  const openAdd = () => {
    setForm({ name: "", role: "", description: "", order: 0 });
    setImageFile(null);
    setImagePreview(null);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item: Member) => {
    setForm({
        name: item.name,
        role: item.role,
        description: item.description,
        order: item.order || 0
    });
    // ✅ Existing image ko preview me dikhane ke liye URL joda
    setImagePreview(item.image ? `${API_URL}${item.image}` : null);
    setImageFile(null);
    setEditId(item._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setImageFile(null);
    setImagePreview(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Management Team</h2>
        <button onClick={openAdd} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <FaPlus /> Add Member
        </button>
      </div>

      {loading && !showModal ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name & Role</th>
                <th className="px-6 py-4">Description Preview</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {list.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img 
                      // ✅ FIX: Image URL Prefix yahan add kiya hai
                      src={item.image ? `${API_URL}${item.image}` : "https://via.placeholder.com/50"} 
                      alt="avatar" 
                      className="w-12 h-12 rounded-full object-cover border"
                      onError={(e) => e.currentTarget.src = "https://via.placeholder.com/50"}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{item.name}</p>
                    <p className="text-sm text-blue-600">{item.role}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.description.substring(0, 50)}...
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <button onClick={() => openEdit(item)} className="text-blue-600 hover:text-blue-800"><FaEdit size={18} /></button>
                    <button onClick={() => { setDeleteId(item._id); setConfirmModal(true); }} className="text-red-500 hover:text-red-700"><FaTrashAlt size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-bold">{editId ? "Edit Member" : "Add Member"}</h3>
              <button onClick={closeModal}><FaTimes size={20} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. Raj Gaurav Sharma" />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-1">Role / Designation</label>
                <input name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded" placeholder="e.g. Executive Director" />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Profile Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition relative">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {imagePreview ? (
                        <div className="flex flex-col items-center">
                            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-full mb-2 shadow" />
                            <p className="text-xs text-blue-600">Click to change image</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-gray-500">
                            <FaCloudUploadAlt size={30} className="mb-2" />
                            <p className="text-sm">Click to upload photo</p>
                        </div>
                    )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full p-2 border rounded" placeholder="About the person..." />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
                    {loading ? "Saving..." : "Save Member"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl text-center shadow-xl">
                <p className="text-lg font-bold mb-4">Are you sure you want to delete?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setConfirmModal(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}