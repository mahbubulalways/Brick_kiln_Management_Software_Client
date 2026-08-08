"use client";

import { useState } from "react";
import { dashboardItems1, dashboardItems2 } from "./dashboardItem";
import ShowSidebarItems from "./ShowSidebarItems";

interface DrawerProps {
  isOpen: boolean;
}

const Drawer = ({ isOpen }: DrawerProps) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-44 bg-white border-r border-gray-200 flex flex-col 
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
      `}
    >
      {/* Header / Logo */}
      <div className="h-12 flex flex-col items-center justify-center ">
        <span className="font-semibold text-gray-700 text-xl pt-2 tracking-wide">
          এডমিন প্যানেল
        </span>
      </div>

      {/* Scrollable sidebar area */}
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        {/* First section */}
        <ul className="flex flex-col gap-0.5 mt-2">
          {dashboardItems1.map((item) => {
            const Icon = item.icon;
            const isItemOpen = openItem === item.id;
            return (
              <ShowSidebarItems
                key={item.id}
                item={item}
                toggleItem={toggleItem}
                Icon={Icon}
                isOpen={isItemOpen}
              />
            );
          })}
        </ul>

        {/* Divider */}
        <p className="pl-3 pb-2 text-gray-300 select-none">_ _</p>

        {/* Second section */}
        <ul className="flex flex-col gap-0.5 mb-3">
          {dashboardItems2.map((item) => {
            const Icon = item.icon;
            const isItemOpen = openItem === item.id;
            return (
              <ShowSidebarItems
                key={item.id}
                item={item}
                toggleItem={toggleItem}
                Icon={Icon}
                isOpen={isItemOpen}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
