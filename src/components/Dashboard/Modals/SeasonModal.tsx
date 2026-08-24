"use client";

import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import seasonImage from "@/assets/season.png";
import { useGetAllSeasonsQuery } from "@/redux/features/season.features";

export type TSeason = {
  id: string;
  name: string;
};
type TSeasonModal = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SeasonModal({
  isOpen,
  setIsOpen,
}: TSeasonModal) {
  const { data, isLoading } = useGetAllSeasonsQuery(undefined, {
    skip: !isOpen,
  });

  const seasons = data?.data as TSeason[] || [];

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-full h-full p-6 overflow-y-auto relative no-scrollbar">
        {/* Close Button */}
        <button
          className="absolute top-4 left-4 p-2 cursor-pointer bg-red-500 text-white rounded-full"
          onClick={() => setIsOpen(false)}
        >
          <HiXMark size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl text-center font-semibold mb-6 text-red-500">
          সিজন নির্বাচন করুন
        </h2>

        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">সিজন লোড হচ্ছে...</p>
          </div>
        ) : seasons.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">কোনো সিজন পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {seasons.map((season) => (
              <div
                key={season.id}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-red-100 transition"
              >
                <div className="w-10 h-10 lg:w-20 lg:h-20 rounded-md flex items-center justify-center text-white font-bold mb-2">
                  <Image
                    src={seasonImage}
                    alt="season"
                    height={400}
                    width={400}
                  />
                </div>

                <span className="text-center">{season.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}