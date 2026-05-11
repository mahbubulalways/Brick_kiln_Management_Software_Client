import { ReactNode } from "react";
import { HiXMark } from "react-icons/hi2";

type TCustomModalBottom = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  title?: string;
};

const CustomModalBottom = ({
  isOpen,
  onClose,
  children,
  width,
  title,
}: TCustomModalBottom) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 transition-opacity duration-300">
      <div
        className={`modal-container bg-white relative rounded-t-2xl md:rounded-md shadow-lg ${width}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex px-3 pt-2 items-center rounded-t-2xl md:rounded-md justify-between sticky top-0 bg-[#F8FAFC] border-b shadow-sm pb-2">
          <h1 className="text-xl">{title}</h1>
          <button
            className="text-black bg-gray-200 p-1 rounded-full duration-200 cursor-pointer hover:bg-red-600 hover:text-white"
            onClick={onClose}
          >
            <HiXMark size={20} />
          </button>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default CustomModalBottom;
