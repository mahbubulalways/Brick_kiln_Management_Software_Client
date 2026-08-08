"use client";
import { useEffect, useState } from "react";
import SidebarMenu from "./SettingsSidebar";
import { useTitleStore } from "@/zustand/store/titleStore";
import VataInformation from "./VataInformation";
import ChangeClassAndRate from "./ChangeClassAndRate";
import Khotiyan from "./Khotiyan";
import SoftwareUser from "./SoftwareUser";
import PasswordChange from "./PasswordChange";
import UserLimit from "./UserLimit";

const DashboardSettings = () => {
  const [page, setPage] = useState<number>(1);
  const { setTitle } = useTitleStore();

  useEffect(() => {
    setTitle("সেটিংস");
  }, [page, setTitle]);

  let content;
  switch (page) {
    case 1:
      content = <VataInformation />;
      break;
    case 2:
      content = <ChangeClassAndRate />;
      break;
    case 3:
      content = <Khotiyan />;
      break;
    case 4:
      content = <SoftwareUser />;
      break;
    case 5:
      content = <PasswordChange />;
      break;
    case 6:
      content = <UserLimit />;
      break;
    case 7:
      content = "ইউজার অ্যাক্সেস";
      break;

    default:
      break;
  }
  return (
    <div className="bg-white p-3 rounded-md h-[90vh] ">
      <div className="flex gap-5">
        <SidebarMenu setPage={setPage} />
        <div className="w-full">{content}</div>
      </div>
    </div>
  );

  // return (
  //   <div className="bg-white p-3 rounded-md h-[90vh]">
  //     <div className="flex gap-5">
  //       <SidebarMenu setPage={setPage} />
  //       {content}
  //     </div>
  //   </div>
  // );
};

export default DashboardSettings;
