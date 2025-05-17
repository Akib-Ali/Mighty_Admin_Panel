
// "use client"
// import { FiUser } from "react-icons/fi";
// import { IoIosArrowDown } from "react-icons/io";


// export default function AdminHeader() {
//   return (
//     <header className="bg-white shadow p-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center justify-between gap-3">
//           <h2 className="text-xl font-semibold">Add Property</h2>
//           <p className="text-sm text-gray-500">Mighty Warners Real Estate</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="border border-gray-300 rounded px-3 py-1 text-sm text-black hover:bg-gray-100 cursor-pointer">
//             + Quick Actions
//           </button>

//           <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center">
//             <span>
//               <FiUser />
//             </span>
//           </div>
//           <div className="text-gray-500">
//             <IoIosArrowDown />

//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }




"use client";

import { Button } from "@/components/ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function AdminHeader() {
  return (
    <header className="bg-white shadow p-4">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Add Property</h2>
          <span className="text-sm text-gray-500">Mighty Warners Real Estate</span>
        </div>


        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Quick Action Button */}
          <Button className="bg-red-700 text-white hover:bg-red-900 flex items-center gap-2">
            <span className="w-5 h-5 bg-white text-red-700 rounded-full flex items-center justify-center">
              <Plus className="w-3 h-3" />
            </span>
            Quick Actions
          </Button>

          {/* Dummy User Image */}
          <div className="w-8 h-8 rounded-full overflow-hidden border">
            <Image
              src="/images/avatar/2.jpg" // Place a dummy image at public/images/dummy-user.jpg
              alt="User"
              width={32}
              height={32}
            />
          </div>

        </div>
      </div>
    </header>
  );
}



