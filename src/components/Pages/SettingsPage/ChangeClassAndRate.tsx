import { useState } from "react";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import NewClassModal from "@/components/Dashboard/Modals/NewClassModal";

const ChangeClassAndRate = () => {
  const initialData = [
    { id: 1, name: "১ নং", type: "ইট", rate: 10 },
    { id: 2, name: "পিকেট", type: "ইট", rate: 10 },
    { id: 3, name: "২ নং (ক)", type: "ইট", rate: 8.5 },
    { id: 4, name: "২ নং (খ)", type: "ইট", rate: 6.5 },
    { id: 5, name: "৩ নং ছাল্ট", type: "ইট", rate: 4.5 },
    { id: 6, name: "৩ নং গরিয়া", type: "ইট", rate: 6.5 },
    { id: 7, name: "এলোট", type: "ইট", rate: 0 },
    { id: 8, name: "১ নং আদলা", type: "আধলা", rate: 10.5 },
    { id: 9, name: "৩ নং আদলা", type: "আধলা", rate: 4 },
    { id: 10, name: "রাবিস", type: "অন্যান্য", rate: 500 },
    { id: 11, name: "খোয়া", type: "অন্যান্য", rate: 120 },
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
          শ্রেণি এবং রেট পরিবর্তন
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="  bg-[#039A63] px-4 py-1.5 text-gray-100 font-medium rounded cursor-pointer"
        >
          + নতুন শ্রেণি
        </button>
      </div>

      <div className="overflow-x-auto border rounded-t-md">
        <table className="min-w-full  border-collapse">
          <thead>
            <tr className="bg-[#039A63] text-white text-center">
              <th className="p-2 border">#</th>
              <th className="p-2 border">শ্রেণির নাম</th>
              <th className="p-2 border">শ্রেণির ধরণ</th>
              <th className="p-2 border">রেট</th>
              <th className="p-2 border">বাটন</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="border p-2">{row.id}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.type}</td>
                <td className="border p-2">৳ {row.rate}</td>
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
        <span>মোট শ্রেণি {data.length} টি</span>
        <div className="flex items-center space-x-3">
          <span className="border px-2 py-1 rounded bg-green-50 border-green-200">
            {currentPage}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1   font-medium text-gray-700 hover:bg-gray-50 transition">
                {rowsPerPage} শ্রেণি / পেজ <ChevronDown className="h-4 w-4" />
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
                  {num} শ্রেণি / পেজ
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isOpen && (
        <NewClassModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default ChangeClassAndRate;
