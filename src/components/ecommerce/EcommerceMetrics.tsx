// // @ts-nocheck

// import { useEffect, useState } from "react";
// import { BoxIconLine, GroupIcon } from "../../icons";
// import axios from "axios";

// export default function EcommerceMetrics() {
//   const [data, setData] = useState();

//   const getCount = async () => {
//     try {
//       const token = localStorage.getItem("fatafatLoanToken");

//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/count`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setData(response?.data);
//     } catch (error) {
//       console.log(error, "gggg");
//     }
//   };

//   useEffect(() => {
//     getCount();
//   }, []);

//   console.log(data, "aaq");
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
//       {/* <!-- Metric Item Start --> */}
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
//         <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//           <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
//         </div>

//         <div className="flex items-end justify-between mt-5">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Home
//             </span>
//             <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//               {data?.userCount}
//             </h4>
//           </div>
//         </div>
//       </div>

//       {/* <!-- Metric Item Start --> */}
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
//         <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//           <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
//         </div>
//         <div className="flex items-end justify-between mt-5">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               AboutUs
//             </span>
//             <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//               {data?.active}
//             </h4>
//           </div>
//         </div>
//       </div>
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
//         <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//           <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
//         </div>
//         <div className="flex items-end justify-between mt-5">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Courses
//             </span>
//             <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//               {data?.inActive}
//             </h4>
//           </div>
//         </div>
//       </div>

//       {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
//         <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//           <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
//         </div>
//         <div className="flex items-end justify-between mt-5">
//           <div>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               Total payout
//             </span>
//             <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//               {data?.totalPayout}
//             </h4>
//           </div>
//         </div>
//       </div> */}
//       {/* <!-- Metric Item End --> */}
//     </div>
//   );
// }

// @ts-nocheck

// import { useEffect, useState } from "react";
// import { BoxIconLine, GroupIcon } from "../../icons";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // 1. Navigate import kiya

// export default function EcommerceMetrics() {
//   const [data, setData] = useState();
//   const navigate = useNavigate(); // 2. Hook initialize kiya

//   const getCount = async () => {
//     try {
//       const token = localStorage.getItem("fatafatLoanToken"); // Token key check kar lena (screenshot me educationToken ho sakta hai agar app different hai)
      
//       // Note: Agar aapka token key "educationToken" hai (pichle codes ke hisaab se), toh usey replace karein.
//       // const token = localStorage.getItem("educationToken");

//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_URL}api/admin/count`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setData(response?.data);
//     } catch (error) {
//       console.log(error, "gggg");
//     }
//   };

//   useEffect(() => {
//     getCount();
//   }, []);

//   // 3. Saare Cards ki list banayi taaki code clean rahe aur sab par click chale
//   // Note: 'path' wahi dalein jo aapke App.js me route define kiya hai
//   const metricsData = [
//     {
//       title: "Home",
//       value: data?.userCount || 0,
//       icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
//       path: "/banner", // Yahan apna route path check karein (sidebar ke hisaab se)
//     },
//     {
//       title: "About Us",
//       value: data?.active || 0, // API data key adjust karein agar alag ho
//       icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
//       path: "/about",
//     },
//     {
//       title: "Courses",
//       value: data?.inActive || 0,
//       icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
//       path: "/math-test-prep", // Screenshot me "Maths" ya "Courses" jo bhi route ho
//     },
//     {
//       title: "Pricing",
//       value: 0, // Abhi API me iska data nahi hai to 0 rakha hai
//       icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
//       path: "/pricing",
//     },
//     {
//       title: "Our Management",
//       value: 0,
//       icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
//       path: "/Our-Managments",
//     },
//     {
//       title: "Testimonial",
//       value: 0,
//       icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
//       path: "/testimonial",
//     },
//     {
//       title: "Blog",
//       value: 0,
//       icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
//       path: "/blog",
//     },
//      {
//       title: "Contact",
//       value: 0,
//       icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
//       path: "/contact-text",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
//       {metricsData.map((item, index) => (
//         <div
//           key={index}
//           onClick={() => navigate(item.path)} // 4. Click event lagaya
//           className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
//         >
//           <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
//             {item.icon}
//           </div>

//           <div className="flex items-end justify-between mt-5">
//             <div>
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 {item.title}
//               </span>
//               <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
//                 {item.value}
//               </h4>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// @ts-nocheck
import { useEffect, useState } from "react";
import { BoxIconLine, GroupIcon } from "../../icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EcommerceMetrics() {
  const [data, setData] = useState({}); // Empty object se initialize kiya
  const navigate = useNavigate();

  const getCount = async () => {
    try {
      // Token key update kar di hai
      const token = localStorage.getItem("educationToken");

      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/admin/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Data set karte waqt safe check lagaya hai
      // Agar backend response.data.data bhej raha hai ya seedha response.data
      setData(response?.data?.data || response?.data || {});
    } catch (error) {
      console.log(error, "Error fetching counts");
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  const metricsData = [
    {
      title: "Home (Banners)",
      // Agar backend update nahi hua to purana key chalega, nahi to naya key
      value: data?.homeTotal || 0,
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
      path: "/banner",
    },
    {
      title: "About Us",
      value: data?.aboutCount || data?.active || 0, 
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      path: "/about",
    },
    {
      title: "Courses",
      value: data?.courseCount || data?.inActive || 0,
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      path: "/math-test-prep",
    },
    {
      title: "Pricing",
      value: data?.pricingCount || 0,
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      path: "/pricing",
    },
    {
      title: "Our Management",
      value: data?.managementCount || 0,
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
      path: "/Our-Managments",
    },
    {
      title: "Testimonial",
      value: data?.testimonialCount || 0,
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      path: "/testimonial",
    },
    {
      title: "Blog",
      value: data?.blogCount || 0,
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      path: "/blog",
    },
    {
      title: "Contact",
      value: data?.contactCount || 0,
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
      path: "/contact-text",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {metricsData.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.path)}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {item.icon}
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {item.value}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}