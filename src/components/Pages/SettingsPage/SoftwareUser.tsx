import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import SoftwareUserModal from "@/components/Dashboard/Modals/SoftwareUserModal";

const SoftwareUser = () => {
  const initialData = [
    { id: 1, name: "sona", userName: "Demo", userType: "মালিক" },
    { id: 2, name: "saiful", userName: "Demo", userType: "মালিক" },
    { id: 3, name: "harun", userName: "Demo", userType: "ম্যানেজার" },
    { id: 4, name: "kabir", userName: "Demo", userType: "ম্যানেজার" },
    { id: 5, name: "soriful", userName: "Demo", userType: "মালিক" },
    { id: 6, name: "vutan", userName: "Demo", userType: "ম্যানেজার" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 py-3">
          সফটওয়ার ইউজার
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="  bg-[#039A63] px-4 py-1.5 text-gray-100 font-medium rounded cursor-pointer"
        >
          + নতুন ইউজার
        </button>
      </div>

      <div className="overflow-x-auto border rounded-t-md">
        <table className="min-w-full  border-collapse">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <th className="p-2 border">#</th>
              <th className="p-2 border">নাম</th>
              <th className="p-2 border">ইউজারনেম</th>
              <th className="p-2 border">ইউজারের ধরন</th>
              <th className="p-2 border">বাটন</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {initialData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="border p-2">{row.id}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.userName}</td>
                <td className="border p-2">{row.userType}</td>
                <td className="border p-2">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <SoftwareUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default SoftwareUser;
