// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactUser from "./contactList";

export default function Contact() {
    const [activeTab,setActiveTab]=useState('contacts')
    const [form, setForm] = useState({
        description: "",
        mobile: "",
        email: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("educationToken");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");

            await axios.post(
                `${import.meta.env.VITE_APP_URL}api/admin/contact`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Saved successfully");
            setTimeout(() => setMessage(""), 2000);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getContactData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${import.meta.env.VITE_APP_URL}api/admin/contact`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.data?.data) {
                const d = res.data.data;

                setForm({
                    description: d.description || "",
                    mobile: d.mobile || "",
                    email: d.email || "",
                    address: d.address || "",
                });
            }
        } catch (err) {
            setError("Failed to load Contact data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContactData();
    }, []);

    return (
     <div className="p-6 space-y-10">


          <div className="flex gap-4 border-b pb-2">
    <button
      className={`px-4 py-2 font-semibold ${
        activeTab === "contacts"
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-500"
      }`}
      onClick={() => setActiveTab("contacts")}
    >
      Contact List
    </button>

    <button
      className={`px-4 py-2 font-semibold ${
        activeTab === "conactText"
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-500"
      }`}
      onClick={() => setActiveTab("conactText")}
    >
      Contact Text
    </button>
  </div>


  {activeTab === "conactText" && (
    <div className="w-full mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 space-y-6">

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

      <div>
        <label className="font-semibold text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 mt-2 border rounded-xl"
          rows="3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Mobile */}
        <div>
          <label className="font-semibold text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-xl"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-xl"
          />
        </div>

        {/* Address */}
        <div>
          <label className="font-semibold text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-xl"
          />
        </div>

      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
      >
        {loading ? "Saving..." : "Save"}
      </button>

    </div>
  )}
  {activeTab === "contacts" && <ContactUser />}

</div>

    );
}
