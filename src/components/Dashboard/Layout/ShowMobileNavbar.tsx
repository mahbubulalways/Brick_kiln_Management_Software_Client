"use client";

import { useState } from "react";
import { dashboardItems1, dashboardItems2 } from "./dashboardItem";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function ShowMobileNavbar() {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  // Split array into chunks of 3 for rows
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 pb-8 z-9999">
      {/* Top Summary Section */}
      <div className="grid grid-cols-2  overflow-hidden shadow-sm bg-linear-to-b from-slate-800 to-slate-700 text-white rounded">
        <div className="flex flex-col items-center justify-center py-8 border-r border-white/20">
          <span className="  text-gray-200">বিক্রি</span>
          <span className="text-4xl font-bold">0</span>
        </div>
        <div className="flex flex-col items-center justify-center py-5">
          <span className="  text-gray-200">ক্যাশ</span>
          <span className="text-4xl font-bold">0</span>
        </div>
      </div>

      <div className="pt-5">
        {chunkArray(dashboardItems1, 3).map((row, rowIndex) => (
          <div key={rowIndex} className="mb-2">
            <div className="grid grid-cols-3 gap-3">
              {row.map((item) => {
                const hasChildren = !!item.children;
                const hasLink = !!item.path;

                // Parent with only a link
                if (!hasChildren && hasLink) {
                  return (
                    <Link
                      key={item.id}
                      href={item.path as string}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col items-center justify-center hover:shadow-md transition"
                    >
                      <item.icon className="h-6 w-6 text-gray-700" />
                      <span className="text-gray-800   mt-2 font-medium">
                        {item.title}
                      </span>
                    </Link>
                  );
                }

                // Parent with children (may also have link, children take priority)
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col items-center justify-center hover:shadow-md transition"
                  >
                    <button
                      onClick={() => handleToggle(item.id)}
                      className="flex flex-col items-center justify-center w-full"
                    >
                      <item.icon className="h-6 w-6 text-gray-700" />
                      <span className="text-gray-800   mt-2 font-medium">
                        {item.title}
                      </span>
                      {hasChildren && (
                        <>
                          {openItemId === item.id ? (
                            <ChevronUp className="h-4 w-4 text-gray-400 mt-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400 mt-1" />
                          )}
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Expanded Children Row (Full width under the row) */}
            {row
              ?.filter((item) => item.id === openItemId && item.children)
              .map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-3 gap-2 mt-2 bg-gray-50 rounded-xl border border-gray-200 p-2 animate-fadeIn"
                >
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={child.path!}
                      className="bg-white text-gray-700   font-medium py-2 rounded-lg border border-gray-200 hover:bg-green-50 transition flex items-center justify-center gap-1"
                    >
                      <child.icon className="h-4 w-4 text-gray-500" />
                      {child.title}
                    </Link>
                  ))}
                </div>
              ))}
          </div>
        ))}
      </div>
      {/* Grid Buttons Section 2 */}

      <h1 className="text-gray-600 text-center py-5">ONNANO</h1>
      <div className="grid grid-cols-3 gap-3 ">
        {dashboardItems2.map((item) => (
          <Link
            href={item.path!}
            key={item.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col items-center justify-center hover:shadow-md transition"
          >
            <item.icon className="h-6 w-6 text-gray-700" />
            <span className="text-gray-800   mt-2 font-medium">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
