"use client";

import { HiXMark } from "react-icons/hi2";
const years = [
  "২৩ - ২৪",
  "২৪ - ২৫",
  "২৫ - ২৬",
  "২৬ - ২৭",
  "২৭ - ২৮",
  "২৮ - ২৯",
  "২৯ - ৩০",
  "৩০ - ৩১",
  "৩১ - ৩২",
  "৩২ - ৩৩",
  "৩৩ - ৩৪",
  "৩৪ - ৩৫",
  "৩৫ - ৩৬",
  "৩৬ - ৩৭",
  "৩৭ - ৩৮",
  "৩৮ - ৩৯",
  "৩৯ - ৪০",
  "৪০ - ৪১",
];

import { createPortal } from "react-dom";
import { Dispatch, SetStateAction } from "react";
import seasonImage from "@/assets/season.png";
import Image from "next/image";
type TSeasonModal = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSeason: Dispatch<SetStateAction<string>>;
};
export default function SeasonModal({
  isOpen,
  setIsOpen,
  setSeason,
}: TSeasonModal) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white w-full h-full  p-6 overflow-y-auto relative no-scrollbar">
        <button
          className="absolute top-4 left-4 p-2 cursor-pointer bg-red-500 text-white rounded-full"
          onClick={() => setIsOpen(false)}
        >
          <HiXMark size={24} />
        </button>
        <h2 className="text-2xl text-center font-semibold mb-6 text-red-500">
          সিজন নির্বাচন করুন
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {years.map((year, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSeason(year);
                setIsOpen(false);
              }}
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-red-100 transition"
            >
              <div className="w-10 h-10 lg:w-20 lg:h-20 rounded-md flex items-center justify-center text-white font-bold mb-2">
                <Image src={seasonImage} alt="icon" height={400} width={400} />
              </div>
              <span className="text-center  ">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
