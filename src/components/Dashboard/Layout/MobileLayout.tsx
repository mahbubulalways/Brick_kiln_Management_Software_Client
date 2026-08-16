"use client";
import { TChildren } from "@/types/project";
import Seasons from "../NavbarOptions/Seasons";
import { usePathname } from "next/navigation";
import DashboardNavbar from "./DashboardNavbar";

const MobileLayout = ({ children }: TChildren) => {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <div className="pb-10 ">
      {isActive ? (
        <div className="flex items-center justify-between px-2 py-2 border-b border-gray-300 shadow">
          <h1 className="text-lg text-gray-900 pl-3 lg:pl-0">
            DEMO BRICK FIELD
          </h1>

          <Seasons />
        </div>
      ) : (
        <DashboardNavbar />
      )}

      <div className="pt-3 px-2">{children}</div>
    </div>
  );
};

export default MobileLayout;
