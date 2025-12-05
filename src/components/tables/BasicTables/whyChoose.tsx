// @ts-nocheck
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FiUploadCloud } from "react-icons/fi";
// import { FaRegImage, FaEdit, FaTrashAlt } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function WhyChoose() {
//   const [form, setForm] = useState({ title: "", description: "" });
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [list, setList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [confirmModal, setConfirmModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const token = localStorage.getItem("educationToken");
//   const countWords = (text) => {
//     if (!text) return 0;
//     return text.trim().split(/\s+/).filter((word) => word !== "").length;
//   };

//   // handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//      if (error) setError(""); 
//   };

//   // file change
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file?.type.startsWith("image/")) {
//       setError("Please select a valid image file");
//       return;
//     }
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//     setError("");
//   };

//   // fetch list
//   const fetchList = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/why-choose`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setList(res.data.data || []);
//     } catch (err) {
//       setError("Failed to fetch list");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const countWords = (text) => {
//   if (!text) return 0;
//   return text.trim().split(/\s+/).filter((word) => word !== "").length;
// };

//   // add or edit
//   const handleSubmit = async () => {
//     if (!form.title || !form.description)
//       return setError("All fields are required");

//      const wordCount = countWords(form.description);
//   if (wordCount > 250) {
//     return setError(`Description cannot contain more than 250 words. Current: ${wordCount}`);
//   }

//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("description", form.description);
//       if (image) formData.append("image", image);

//       let res;
//       if (editId) {
//         formData.append("_id", editId);
//         res = await axios.patch(
//           `${import.meta.env.VITE_APP_URL}api/admin/why-choose/`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       } else {
//         res = await axios.post(
//           `${import.meta.env.VITE_APP_URL}api/admin/why-choose`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       }

//       setMessage(res.data.message || "Success!");
//       setTimeout(() => setMessage(""), 2000);
//       setForm({ title: "", description: "" });
//       setImage(null);
//       setPreview("");
//       setEditId(null);
//       setShowModal(false);
//       fetchList();
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setConfirmModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_APP_URL}api/admin/why-choose/${deleteId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Item deleted successfully");
//       fetchList();
//     } catch (err) {
//       toast.error("Failed to delete item");
//     } finally {
//       setConfirmModal(false);
//       setDeleteId(null);
//     }
//   };

//   // open edit modal
//   const openEdit = (item) => {
//     setForm({ title: item.title, description: item.description });
//     setPreview(`${import.meta.env.VITE_APP_URL}${item.image}`);
//     setEditId(item._id);
//     setShowModal(true);
//     setError("");

//   };

//   // open add modal
//   const openAdd = () => {
//     setForm({ title: "", description: "" });
//     setPreview("");
//     setImage(null);
//     setEditId(null);
//     setShowModal(true);
//     setError("");

//   };

//   useEffect(() => {
//     fetchList();
//   }, []);
  

//   return (
//     <div className=" bg-gray-50 p-8">
//       <div className="">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={openAdd}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             + Add New
//           </button>
//         </div>

//         {/* Alerts */}
//         {error && (
//           <div className="text-center bg-red-100 text-red-700 font-medium p-3 rounded-xl mb-4">
//             {error}
//           </div>
//         )}
//         {message && !error && (
//           <div className="text-center bg-green-100 text-green-700 font-medium p-3 rounded-xl mb-4">
//             {message}
//           </div>
//         )}

//         {/* Table List */}
//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : list.length === 0 ? (
//           <p className="text-center text-gray-500">No items found</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200 text-left">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th className="px-4 py-3 border-b text-gray-700">#</th>
//                   <th className="px-4 py-3 border-b text-gray-700">Image</th>
//                   <th className="px-4 py-3 border-b text-gray-700">Title</th>
//                   <th className="px-4 py-3 border-b text-gray-700">
//                     Description
//                   </th>
//                   <th className="px-4 py-3 border-b text-gray-700 text-center">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {list.map((item, index) => (
//                   <tr
//                     key={item._id}
//                     className="hover:bg-gray-50 transition-all"
//                   >
//                     <td className="px-4 py-3 border-b text-gray-700">
//                       {index + 1}
//                     </td>
//                     <td className="px-4 py-3 border-b">
//                       <img
//                         src={`${import.meta.env.VITE_APP_URL}${item.image}`}
//                         alt={item.title}
//                         className="w-16 h-16 object-cover rounded-lg border"
//                       />
//                     </td>
//                     <td className="px-4 py-3 border-b text-gray-800 font-medium">
//                       {item.title}
//                     </td>
//                     <td className="px-4 py-3 border-b text-gray-600">
//                       {item.description.length > 100
//                         ? item.description.slice(0, 100) + "..."
//                         : item.description}
//                     </td>
//                     <td className="px-4 py-3 border-b text-center">
//                       <button
//                         onClick={() => openEdit(item)}
//                         className="text-blue-600 hover:text-blue-800 mr-3"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(item._id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <FaTrashAlt />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
//             <button
//               className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
//               onClick={() => setShowModal(false)}
//             >
//               ✖
//             </button>

//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               {editId ? "Edit Item" : "Add New Item"}
//             </h3>

//             {/* Upload area */}
//             <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 text-center mb-3 bg-blue-50 hover:bg-blue-100 transition-all">
//               <label
//                 htmlFor="fileInput"
//                 className="cursor-pointer flex flex-col items-center"
//               >
//                 <FiUploadCloud className="text-3xl text-blue-500 mb-2" />
//                 <span className="text-sm text-gray-700 font-medium">
//                   {image ? "Change Image" : "Click to Upload Image"}
//                 </span>
//                 <input
//                   id="fileInput"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {/* Image Preview */}
//             {preview && (
//               <div className="flex justify-center mb-4">
//                 <div className="rounded-xl overflow-hidden border border-gray-200   bg-gray-100">
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                 </div>
//               </div>
//             )}
//             {/* Title input */}
//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               placeholder="Enter title..."
//               className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
//             />

//             {/* Description input */}
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Enter description..."
//              className={`w-full p-3 border rounded-xl ${
//                     isOverLimit ? "border-red-500 focus:outline-red-500 bg-red-50" : "border-gray-300"
//                 }`}
//               rows={4}
//             ></textarea>
//               <div className="flex justify-end mt-1">
//                 <span className={`text-xs font-bold ${isOverLimit ? "text-red-600" : "text-gray-500"}`}>
//                   Word Count: {currentCount} / 250
//                 </span>
//               </div>

//             {/* Save Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </div>
//       )}

//       {confirmModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
//             <h3 className="text-lg font-bold mb-4">
//               Are you sure you want to delete this item?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleConfirmDelete}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={() => setConfirmModal(false)}
//                 className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { FaRegImage, FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function WhyChoose() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("educationToken");

  // Helper function to count words
  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter((word) => word !== "").length;
  };

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Error clear karein agar user type kar raha hai
    if (error) setError(""); 
  };

  // file change
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

  // fetch list
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/why-choose`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setList(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch list");
    } finally {
      setLoading(false);
    }
  };

  // add or edit
  const handleSubmit = async () => {
    // 1. Basic Field Validation
    if (!form.title || !form.description)
      return setError("All fields are required");

    // 2. WORD LIMIT VALIDATION (Main Logic)
    const currentWordCount = countWords(form.description);
    
    if (currentWordCount > 250) {
      // Agar 250 se jyada hai to yahi ruk jao (return)
      setError(`Description exceeds limit! Current: ${currentWordCount} words. Max allowed: 250.`);
      return; // SAVE NAHI HOGA
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (image) formData.append("image", image);

      let res;
      if (editId) {
        formData.append("_id", editId);
        res = await axios.patch(
          `${import.meta.env.VITE_APP_URL}api/admin/why-choose/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_APP_URL}api/admin/why-choose`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setMessage(res.data.message || "Success!");
      setTimeout(() => setMessage(""), 2000);
      setForm({ title: "", description: "" });
      setImage(null);
      setPreview("");
      setEditId(null);
      setShowModal(false);
      fetchList();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_URL}api/admin/why-choose/${deleteId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Item deleted successfully");
      fetchList();
    } catch (err) {
      toast.error("Failed to delete item");
    } finally {
      setConfirmModal(false);
      setDeleteId(null);
    }
  };

  // open edit modal
  const openEdit = (item) => {
    setForm({ title: item.title, description: item.description });
    setPreview(`${import.meta.env.VITE_APP_URL}${item.image}`);
    setEditId(item._id);
    setShowModal(true);
    setError(""); // Open karte waqt purana error hatayein
  };

  // open add modal
  const openAdd = () => {
    setForm({ title: "", description: "" });
    setPreview("");
    setImage(null);
    setEditId(null);
    setShowModal(true);
    setError("");
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Real-time calculation for UI
  const currentCount = countWords(form.description);
  const isOverLimit = currentCount > 250;

  return (
    <div className=" bg-gray-50 p-8">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add New
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="text-center bg-red-100 text-red-700 font-medium p-3 rounded-xl mb-4 border border-red-200">
            {error}
          </div>
        )}
        {message && !error && (
          <div className="text-center bg-green-100 text-green-700 font-medium p-3 rounded-xl mb-4">
            {message}
          </div>
        )}

        {/* Table List */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : list.length === 0 ? (
          <p className="text-center text-gray-500">No items found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 border-b text-gray-700">#</th>
                  <th className="px-4 py-3 border-b text-gray-700">Image</th>
                  <th className="px-4 py-3 border-b text-gray-700">Title</th>
                  <th className="px-4 py-3 border-b text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 border-b text-gray-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-4 py-3 border-b text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <img
                        src={`${import.meta.env.VITE_APP_URL}${item.image}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="px-4 py-3 border-b text-gray-800 font-medium">
                      {item.title}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-600">
                      {item.description.length > 100
                        ? item.description.slice(0, 100) + "..."
                        : item.description}
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editId ? "Edit Item" : "Add New Item"}
            </h3>

            {/* Upload area */}
            <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 text-center mb-3 bg-blue-50 hover:bg-blue-100 transition-all">
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center"
              >
                <FiUploadCloud className="text-3xl text-blue-500 mb-2" />
                <span className="text-sm text-gray-700 font-medium">
                  {image ? "Change Image" : "Click to Upload Image"}
                </span>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="flex justify-center mb-4">
                <div className="rounded-xl overflow-hidden border border-gray-200   bg-gray-100">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              </div>
            )}
            {/* Title input */}
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title..."
              className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
            />

            {/* Description input */}
            <div className="mb-3">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description..."
                className={`w-full p-3 border rounded-xl ${
                    isOverLimit ? "border-red-500 focus:outline-red-500 bg-red-50" : "border-gray-300"
                }`}
                rows={4}
              ></textarea>
              
              {/* Visual Word Counter */}
              <div className="flex justify-end mt-1">
                <span className={`text-xs font-bold ${isOverLimit ? "text-red-600" : "text-gray-500"}`}>
                  Word Count: {currentCount} / 250
                </span>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              // Disable button if loading OR over limit
              disabled={loading}
              className={`w-full py-2 bg-gradient-to-r text-white rounded-xl transition-all ${
                 isOverLimit 
                 ? "from-gray-400 to-gray-500 cursor-not-allowed" // Disabled Style
                 : "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" // Normal Style
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {confirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this item?
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
    </div>
  );
}