// @ts-nocheck
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserTable() {
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getUserList = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("educationToken");

      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/userList`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            limit: limit,
            search: searchText?.trim(),
          },
        }
      );

      setUserData(response.data?.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, [page]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      getUserList();
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchText]);

  if (loading) return <p>Loading viyagoo...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="w-full px-2 my-2 sm:w-64">
        <input
          type="search"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className=" overflow-y-auto overflow-x-auto">
        {" "}
        {/* Adjusted height and scroll */}
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 bg-white dark:bg-white/[0.03]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Wallet Amount
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Referral Code
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Activation Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Referred To
              </TableCell>
              {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                role
              </TableCell> */}
              {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                registerBy
              </TableCell> */}

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created Date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.walletAmount ? user?.walletAmount : 0}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.referralCode ? user?.referralCode : "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  {user.isActivate == true || user.isActivate == "true" ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-semibold text-sm">
                      InActive
                    </span>
                  )}
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-gray-500">
                  {user?.referrals?.length > 0 ? (
                    <button
                      onClick={() => handleView(user?.referrals)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      View
                    </button>
                  ) : (
                    "N/A"
                  )}
                </TableCell>

                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.role}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.registerBy}
                </TableCell> */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString("en-GB")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        {showModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md max-h-[80vh] p-6 z-10 overflow-y-auto transform transition-transform duration-300 scale-100 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Referred Users
              </h2>
              <div className="space-y-3">
                {selectedUser?.map((user, idx) => (
                  <div
                    key={user._id || idx}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-gray-700">
                      <span className="font-semibold">Name:</span>{" "}
                      {user?.userDetails?.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Email:</span>{" "}
                      {user?.userDetails?.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Activation Status:</span>{" "}
                      <span
                        className={
                          user.userDetails.isActivate == true ||
                          user.userDetails.isActivate == "true"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {user.userDetails.isActivate == true ||
                        user.userDetails.isActivate == "true"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
