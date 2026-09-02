"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  dataLength: number;
  title: string;
}

export const TablePagination = ({
  page,
  totalPages,
  dataLength,
  title,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || 10;

  const updateParams = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));
    params.set("limit", String(newLimit));

    router.replace(`${pathname}?${params.toString()}`);
  };

  
  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-2 overflow-x-auto
     border-t border-gray-200 bg-gray-50 px-3 py-3 sm:px-4 md:px-6 md:py-2">
      {/* Left Side */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Page Info */}
        <p className="whitespace-nowrap text-xs text-gray-600 sm:text-sm">
          পৃষ্ঠা <span className="font-semibold text-[#006A4E]">{page}</span>
          {" এর মধ্যে "}
          <span className="font-semibold text-gray-900">
            {Math.max(totalPages, 1)}
          </span>
        </p>

        {/* Limit */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <span className="hidden text-sm font-medium text-gray-600 sm:inline">
            দেখান
          </span>

          <div className="relative">
            <select
              value={limit}
              onChange={(e) => updateParams(1, Number(e.target.value))}
              className="
                h-8
                min-w-14
                cursor-pointer
                appearance-none
                rounded-lg
                border border-gray-200
                bg-white
                pl-2.5
                pr-7
                text-xs
                font-semibold
                text-gray-700
                outline-none
                transition-all
                hover:border-[#006A4E]/40
                focus:border-[#006A4E]
                focus:ring-2
                focus:ring-[#006A4E]/10
                sm:h-10
                sm:min-w-16
                sm:pl-3
                sm:pr-8
                sm:text-sm
              "
            >
              {[2, 10, 30, 40, 50].map((item) => (
                <option key={item} value={item}>
                  {item} {title} / পেজ
                </option>
              ))}
            </select>

            <svg
              className="
                pointer-events-none
                absolute
                right-2
                top-1/2
                h-3.5
                w-3.5
                -translate-y-1/2
                text-gray-500
                sm:right-2.5
              "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <span className="hidden text-sm font-medium text-gray-600 sm:inline">
            টি
          </span>
        </div>
      </div>

     {/* Pagination */}
<div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
  {/* Previous */}
  <button
    type="button"
    onClick={() => updateParams(page - 1, limit)}
    disabled={page <= 1}
    aria-label="আগের পৃষ্ঠা"
    title="আগের পৃষ্ঠা"
    className="
      flex
      h-7
      w-7
      shrink-0
      items-center
      justify-center
      rounded-md
      border
      border-gray-300
      bg-white
      text-gray-600
      transition
      hover:border-[#006A4E]
      hover:text-[#006A4E]
      disabled:cursor-not-allowed
      disabled:opacity-50
      sm:h-8
      sm:w-8
      sm:rounded-lg
    "
  >
    <ChevronLeft size={14} strokeWidth={2} />
  </button>

  {/* Current Page */}
  <div
    className="
      flex
      h-7
      min-w-7
      shrink-0
      items-center
      justify-center
      rounded-md
      border
      border-[#006A4E]
      bg-white
      px-1.5
      sm:h-8
      sm:min-w-8
      sm:rounded-lg
      sm:px-2
    "
  >
    <span className="text-[11px] font-semibold text-[#006A4E] sm:text-xs">
      {page}
    </span>
  </div>

  {/* Next */}
  <button
    type="button"
    onClick={() => updateParams(page + 1, limit)}
    disabled={page >= totalPages || dataLength === 0}
    aria-label="পরের পৃষ্ঠা"
    title="পরের পৃষ্ঠা"
    className="
      flex
      h-7
      w-7
      shrink-0
      items-center
      justify-center
      rounded-md
      bg-[#006A4E]
      text-white
      transition
      hover:bg-[#00563f]
      disabled:cursor-not-allowed
      disabled:opacity-50
      sm:h-8
      sm:w-8
      sm:rounded-lg
    "
  >
    <ChevronRight size={14} strokeWidth={2} />
  </button>
</div>
    </div>
  );
};
