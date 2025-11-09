"use client";
import { useState } from "react";
import SeasonModal from "../Modals/SeasonModal";

const Seasons = () => {
  const [season, setSeason] = useState<string>("24-25");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="border-2 cursor-pointer border-gray-300 text-gray-600   px-2 py-1 rounded-md"
      >
        সিজনঃ {season}
      </button>
      {isOpen && (
        <SeasonModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setSeason={setSeason}
        />
      )}
    </div>
  );
};

export default Seasons;
