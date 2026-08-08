"use client";
import React from "react";
import { RiMenuFold4Line } from "react-icons/ri";
import Seasons from "../NavbarOptions/Seasons";
import NavbarIcon from "../NavbarOptions/NavbarIcon";
import { MdHistory } from "react-icons/md";
import {
  IoCallOutline,
  IoDocumentTextOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { CiYoutube } from "react-icons/ci";
import { SiFampay } from "react-icons/si";
import { ProfileMenu } from "../NavbarOptions/Profile";
import { useTitleStore } from "@/zustand/store/titleStore";
import Link from "next/link";

interface DashboardNavbarProps {
  onToggleDrawer?: () => void;
  isDrawerOpen?: boolean;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  onToggleDrawer,
  isDrawerOpen,
}) => {
  const { title } = useTitleStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return;
  return (
    <div className="flex sticky top-0 items-center justify-between bg-white shadow-sm  py-2 w-full pr-5">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Toggle Drawer */}
        <button
          onClick={onToggleDrawer}
          className={`p-2 cursor-pointer hidden lg:block bg-gray-100 rounded ml-2 ${
            isDrawerOpen ? "rotate-180" : ""
          } duration-300`}
        >
          <RiMenuFold4Line className={`w-5 h-5 text-gray-700  `} />
        </button>
        <Link href={"/"}>
          <h1 className="text-lg font-semibold text-gray-900 pl-3 lg:pl-0">
            {title}
          </h1>
        </Link>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 ">
        <Seasons />
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 ">
            <NavbarIcon
              Icon={MdHistory}
              path="/dashboard/history"
              title="আপডেড হিস্ট্রি"
            />
            <NavbarIcon
              Icon={IoDocumentTextOutline}
              path="/dashboard/login-record"
              title="লগইন রেকর্ড"
            />
            <NavbarIcon
              Icon={IoCallOutline}
              path="/dashboard/help-line"
              title="হেল্প লাইন"
            />
            <NavbarIcon
              Icon={CiYoutube}
              path="/dashboard/video"
              title="ভিডিও"
            />
            <NavbarIcon
              Icon={SiFampay}
              path="/dashboard/software-payment"
              title="সফটওয়্যার পেমেন্ট"
            />
            <NavbarIcon
              Icon={IoSettingsOutline}
              path="/dashboard/settings"
              title="সেটিং"
            />
            <ProfileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
