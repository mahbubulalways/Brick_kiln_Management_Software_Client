import { useState } from "react";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import KhotiyanModal from "@/components/Dashboard/Modals/KhatiyanModal";

const Khotiyan = () => {
  const initialData = [
    { id: 1, name: "sona", group: "kath" },
    { id: 2, name: "saiful", group: "kath" },
    { id: 3, name: "harun", group: "kath" },
    { id: 4, name: "kabir", group: "kath" },
    { id: 5, name: "soriful", group: "kath" },
    { id: 6, name: "vutan", group: "kath" },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  // Delete function
  const handleDelete = (id: number) => {
    if (confirm("আপনি কি নিশ্চিত যে এই শ্রেণিটি মুছে ফেলতে চান?")) {
      setData(data.filter((row) => row.id !== id));
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 py-3">
          খতিয়ান অ্যাড/আপডেট
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="  bg-[#039A63] px-4 py-1.5 text-gray-100 font-medium rounded cursor-pointer"
        >
          + নতুন খতিয়ান
        </button>
      </div>

      <div className="overflow-x-auto border rounded-t-md">
        <table className="min-w-full  border-collapse">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <th className="p-2 border">#</th>
              <th className="p-2 border">খতিয়ানের নাম</th>
              <th className="p-2 border">গ্রুপ</th>
              <th className="p-2 border">বাটন</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="border p-2">{row.id}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.group}</td>
                <td className="border p-2">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between rounded-b-md items-center p-2   text-gray-600 bg-white shadow">
        <span>মোট খতিয়ান {data.length} টি</span>
        <div className="flex items-center space-x-3">
          <span className="border px-2 py-1 rounded bg-green-50 border-green-200">
            {currentPage}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1   font-medium text-gray-700 hover:bg-gray-50 transition">
                {rowsPerPage} খতিয়ান / পেজ <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 rounded-md border bg-white shadow-md"
            >
              {[5, 10, 15, 20].map((num) => (
                <DropdownMenuItem
                  key={num}
                  onSelect={() => {
                    setRowsPerPage(num);
                    setCurrentPage(1);
                  }}
                  className="cursor-pointer px-4 py-2   text-gray-700 hover:bg-gray-100"
                >
                  {num} খতিয়ান / পেজ
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isOpen && (
        <KhotiyanModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default Khotiyan;
