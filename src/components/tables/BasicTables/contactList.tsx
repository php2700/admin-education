// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ContactUser() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("educationToken");

  const fetchList = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/contact-list`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        {
          params: {
            page: page,
          },
        }
      );

      setList(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      toast.error("Failed to fetch contact list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList(currentPage);
  }, []);

  return (
    <div className="p-8 bg-gray-50">
        <p className="text-2xl font-semiibold mb-2">Contact List</p>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-500">No contact data found</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 border-b">#</th>
                  <th className="px-4 py-3 border-b">Name</th>
                  <th className="px-4 py-3 border-b">Email</th>
                  <th className="px-4 py-3 border-b">Mobile</th>
                  <th className="px-4 py-3 border-b">Message</th>
                  <th className="px-4 py-3 border-b">Date</th>

                </tr>
              </thead>
              <tbody>
                {list?.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b">{index + 1}</td>
                    <td className="px-4 py-3 border-b">{item.name}</td>
                    <td className="px-4 py-3 border-b">{item.email}</td>
                    <td className="px-4 py-3 border-b">{item.mobile}</td>
                    <td className="px-4 py-3 border-b">{item.message}</td>
                    <td className="px-4 py-3 border-b">  {new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination UI */}
          <div className="flex justify-end mt-4 gap-3">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => fetchList(currentPage - 1)}
            >
              Prev
            </button>

            <span className="px-4 py-2">
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => fetchList(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
