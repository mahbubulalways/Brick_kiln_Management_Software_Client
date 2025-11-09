"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface TableFooterProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filtered: any[];
  currentPage: number;
  setRowsPerPage: (num: number) => void;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
}

const TableFooter = ({
  title,
  filtered,
  currentPage,
  setRowsPerPage,
  setCurrentPage,
  rowsPerPage,
}: TableFooterProps) => {
  const rowsPerPageOptions = [2, 20, 50, 100];

  return (
    <div className="flex justify-between items-center p-3   text-gray-600 bg-gray-50 border-t rounded-b-md">
      <span>
        মোট {title} <strong>{filtered.length}</strong> টি
      </span>

      <div className="flex items-center space-x-3">
        {/* Current Page */}
        <span className="border px-2 py-1 rounded bg-green-50 border-green-200 text-gray-700 font-medium">
          {currentPage}
        </span>

        {/* Rows per page dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1   font-medium text-gray-700 hover:bg-gray-50 transition">
              {rowsPerPage} {title} / পেজ <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {rowsPerPageOptions.map((num) => (
              <DropdownMenuItem
                key={num}
                onClick={() => {
                  setRowsPerPage(num);
                  setCurrentPage(1);
                }}
                className="cursor-pointer"
              >
                {num} {title} / পেজ
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TableFooter;
