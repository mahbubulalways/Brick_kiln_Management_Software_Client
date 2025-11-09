"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FiUser,
  FiList,
  FiBookOpen,
  FiUsers,
  FiLock,
  FiInfo,
  FiCheckSquare,
} from "react-icons/fi";

const menuItems = [
  { id: 1, label: "ভাটার তথ্য", icon: FiUser },
  { id: 2, label: "শ্রেণি এবং রেট", icon: FiList },
  { id: 3, label: "ক্ষতিপান অ্যাড", icon: FiBookOpen },
  { id: 4, label: "সফটওয়্যার ইউজার", icon: FiUsers },
  { id: 5, label: "পাসওয়ার্ড পরিবর্তন", icon: FiLock },
  { id: 6, label: "লিমিট", icon: FiInfo },
  { id: 7, label: "ইউজার পারমিশন", icon: FiCheckSquare },
];

type TSidebarMenu = { setPage: Dispatch<SetStateAction<number>> };

const SidebarMenu = ({ setPage }: TSidebarMenu) => {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="w-44  bg-gray-100 p-3 flex flex-col gap-2 border border-gray-200 rounded-md overflow-hidden select-none">
      {menuItems.map(({ id, label, icon: Icon }) => {
        const isActive = id === activeId;
        return (
          <button
            key={id}
            onClick={() => {
              setActiveId(id);
              setPage(id);
            }}
            className={`flex flex-col items-center justify-center gap-1 py-3 px-2    transition rounded cursor-pointer 
              ${
                isActive
                  ? "bg-[#039A63] text-white border-l-4 border-l-green-800"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
