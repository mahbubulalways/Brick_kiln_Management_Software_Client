"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const limitOptions = [1, 10, 30, 40, 50];

  const updateParams = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));
    params.set("limit", String(newLimit));

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLimitChange = (value: number) => {
    setIsOpen(false);
    updateParams(1, value);
  };

  return (
    <div
      className="
        relative z-50
        flex w-full min-w-0
        items-center justify-between
        gap-2
        border-t border-gray-200
        bg-gray-50
        px-3 py-3
        sm:px-4
        md:px-6 md:py-2
      "
    >
      <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-4">
        <p className="whitespace-nowrap text-xs text-gray-600 sm:text-sm">
          পৃষ্ঠা{" "}
          <span className="font-semibold text-[#006A4E]">
            {page}
          </span>{" "}
          এর মধ্যে{" "}
          <span className="font-semibold text-gray-900">
            {Math.max(totalPages, 1)}
          </span>
        </p>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <span className="hidden text-sm font-medium text-gray-600 sm:inline">
            দেখান
          </span>

          <div
            ref={dropdownRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              className={`
                flex h-8 min-w-[100px]
                cursor-pointer items-center justify-between
                gap-3 rounded-lg border
                bg-white px-5
                text-sm font-semibold text-gray-700
                 outline-none transition-all
               
                ${isOpen
                  ? "border-[#006A4E] ring-4 ring-[#006A4E]/10"
                  : "border-gray-200 hover:border-[#006A4E]/40 hover:shadow"
                }
              `}
            >
              <span>{limit}</span>

              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`
                  shrink-0 text-gray-500 transition-transform duration-200
                  ${isOpen ? "rotate-180 text-[#006A4E]" : ""}
                `}
              />
            </button>

            {isOpen && (
              <div
                role="listbox"
                className="
                  absolute left-0 top-full z-[9999]
                  mt-2 w-[190px]
                  overflow-hidden
                  rounded-xl border border-gray-200
                  bg-white p-1.5
                  shadow-[0_12px_40px_rgba(0,0,0,0.16)]
                "
              >
                <div
                  className="
                    border-b border-gray-100
                    px-3 py-2
                    text-[11px] font-semibold text-gray-400
                  "
                >
                  প্রতি পেজে দেখান
                </div>

                <div className="mt-1">
                  {limitOptions.map((item) => {
                    const selected = limit === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => handleLimitChange(item)}
                        className={`
                          flex w-full cursor-pointer
                          items-center justify-between
                          rounded-lg px-3 py-1.5
                          text-left text-sm transition-colors
                          ${selected
                            ? "bg-[#006A4E]/10 font-semibold text-[#006A4E]"
                            : "font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                      >
                        <span>
                          {item} {title} / পেজ
                        </span>

                        {selected && (
                          <span
                            className="
                              flex h-5 w-5 shrink-0
                              items-center justify-center
                              rounded-full bg-[#006A4E] text-white
                            "
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <span className="hidden text-sm font-medium text-gray-600 sm:inline">
            টি
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        <button
          type="button"
          onClick={() => updateParams(page - 1, limit)}
          disabled={page <= 1}
          aria-label="আগের পৃষ্ঠা"
          title="আগের পৃষ্ঠা"
          className="
            flex h-7 w-7 shrink-0
            items-center justify-center
            rounded-md border border-gray-300
            bg-white text-gray-600 transition
            hover:border-[#006A4E] hover:text-[#006A4E]
            disabled:cursor-not-allowed disabled:opacity-50
            sm:h-8 sm:w-8 sm:rounded-lg
          "
        >
          <ChevronLeft size={14} strokeWidth={2} />
        </button>

        <div
          className="
            flex h-7 min-w-7 shrink-0
            items-center justify-center
            rounded-md border border-[#006A4E]
            bg-white px-1.5
            sm:h-8 sm:min-w-8 sm:rounded-lg sm:px-2
          "
        >
          <span className="text-[11px] font-semibold text-[#006A4E] sm:text-xs">
            {page}
          </span>
        </div>

        <button
          type="button"
          onClick={() => updateParams(page + 1, limit)}
          disabled={page >= totalPages || dataLength === 0}
          aria-label="পরের পৃষ্ঠা"
          title="পরের পৃষ্ঠা"
          className="
            flex h-7 w-7 shrink-0
            items-center justify-center
            rounded-md bg-[#006A4E]
            text-white transition
            hover:bg-[#00563f]
            disabled:cursor-not-allowed disabled:opacity-50
            sm:h-8 sm:w-8 sm:rounded-lg
          "
        >
          <ChevronRight size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};