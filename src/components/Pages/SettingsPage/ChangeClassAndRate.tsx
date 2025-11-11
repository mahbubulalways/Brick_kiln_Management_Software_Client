import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import NewClassModal from "@/components/Dashboard/Modals/NewClassModal";
import { useGetAllClassAndRateQuery } from "@/redux/features/classAndRate.features";
import { TClassAndRate } from "@/types/types";
import TableHead from "@/components/Reusable/TableHead";
import TableData from "@/components/Reusable/TableData";
import TableFooter from "@/components/Reusable/TableFooter";
import CustomLoader from "@/components/Reusable/CustomLoader";
import EditClassAndRateModal from "@/components/Dashboard/Modals/EditModals/EditClassAndRateModal";

const ChangeClassAndRate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [classId, setClassId] = useState<number>();
  // Load data
  const { isLoading, data: fetchedData } =
    useGetAllClassAndRateQuery(undefined);
  const classAndRates = fetchedData?.data || [];

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = classAndRates?.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Delete function
  const handleDelete = (id: number) => {};

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
              <TableHead th="#" />
              <TableHead th="শ্রেণির নাম" />
              <TableHead th="শ্রেণির ধরণ" />
              <TableHead th="রেট" />
              <TableHead th="বাটন" />
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <CustomLoader cls="h-[30vh]" />
                </td>
              </tr>
            ) : !paginatedData?.length ? (
              <tr>
                <td colSpan={5} className="py-8 text-gray-600">
                  কোনো ডাটা পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              paginatedData.map((row: TClassAndRate, index: number) => (
                <tr
                  key={row?.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableData td={index + 1} />
                  <TableData td={row?.className} />
                  <TableData td={row?.classType} />
                  <TableData td={`৳ ${row?.rate}`} />
                  <td className="border p-2">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setIsOpenEditModal(true);
                          setClassId(row?.id as number);
                        }}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        onClick={() => handleDelete(row?.id as number)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TableFooter
        currentPage={currentPage}
        length={paginatedData?.length}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        title="শ্রেণি"
      />

      {isOpen && (
        <NewClassModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      {isOpenEditModal && (
        <EditClassAndRateModal
          isOpen={isOpenEditModal}
          onClose={() => setIsOpenEditModal(false)}
          id={classId!}
        />
      )}
    </div>
  );
};

export default ChangeClassAndRate;
