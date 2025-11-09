import { TChildren } from "@/types/project";
import DashboardNavbar from "./DashboardNavbar";

const MobileLayout = ({ children }: TChildren) => {
  return (
    <div className="pb-10">
      <DashboardNavbar />
      <div className="pt-5 px-2">{children}</div>
    </div>
  );
};

export default MobileLayout;
