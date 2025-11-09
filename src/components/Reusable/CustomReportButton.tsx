import { FiFileText } from "react-icons/fi";

const CustomReportButton = () => {
  return (
    <span className="flex items-center justify-center gap-2  bg-white text-[#039A63] px-2 lg:px-3 py-1 rounded border border-[#039A63] hover:bg-[#039A63] hover:text-white   transition cursor-pointer">
      <FiFileText className="h-4 w-4 " />
      <span className="hidden lg:block">রিপোর্ট</span>
    </span>
  );
};

export default CustomReportButton;
