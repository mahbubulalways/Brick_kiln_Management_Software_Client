import { ReactNode } from "react";
import { HiXMark } from "react-icons/hi2";

type TCustomNormalModal = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
};

const CustomNormalModal = ({
  isOpen,
  onClose,
  children,
  width,
}: TCustomNormalModal) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 px-3 z-50 flex items-center justify-center bg-black/40 "
      onClick={onClose}
    >
      <div
        className={`bg-white relative rounded-md shadow-lg ${width} max-w-5xl `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className="flex px-3 pt-2 items-center justify-between sticky top-0 bg-[#F8FAFC] border-b shadow-sm pb-2">
          <button
            className="text-black bg-gray-200 p-1 rounded-full duration-200 cursor-pointer hover:bg-red-600 hover:text-white"
            onClick={onClose}
          >
            <HiXMark size={20} />
          </button>
        </div> */}

        {/* Body */}
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default CustomNormalModal;
