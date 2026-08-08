import { FiPrinter } from "react-icons/fi";

const CustomPrintButton = () => {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="
        flex
        items-center
        justify-center
        gap-2
        bg-white
        text-[#039A63]
        px-2
        lg:px-3
        py-1
        rounded-md
        border
        border-[#039A63]
        hover:bg-[#039A63]
        hover:text-white
        transition
        cursor-pointer
      "
    >
      <FiPrinter className="h-4 w-4" />
      <span className="hidden lg:block">প্রিন্ট</span>
    </button>
  );
};

export default CustomPrintButton;
