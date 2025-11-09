"use client";

import { useState, useMemo, Dispatch, SetStateAction } from "react";
import CustomModalBottom from "@/components/Reusable/CustomModalBottom";
import CustomSearchInput from "@/components/Reusable/CustomSearchInput";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomNewButton from "@/components/Reusable/CustomNewButton";
import KhotiyanModal from "./KhatiyanModal";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
  ledger: string;
  setLedger: Dispatch<SetStateAction<string>>;
};

type TLedger = {
  id: string;
  ledgerGroup: string;
  names?: string[];
};

const data: TLedger[] = [
  { id: "1", ledgerGroup: "আনাদায়", names: ["আনাদায়", "আনাদায় ২"] },
  { id: "2", ledgerGroup: "মোবাইল বিল" },
  { id: "3", ledgerGroup: "মালামাল" },
  { id: "4", ledgerGroup: "ম্যানেজার", names: ["মোস্তা"] },
  { id: "5", ledgerGroup: "Tractor", names: ["নিজ গাড়ী ৩"] },
];

const SelectLedgerModal = ({ isOpen, onClose, setLedger }: TCustomModal) => {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(
      (item) =>
        item.ledgerGroup.toLowerCase().includes(search.toLowerCase()) ||
        item.names?.some((n) => n.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const handleClick = (ledger: TLedger, name?: string) => {
    if (ledger.names && ledger.names.length > 0 && name) {
      setLedger(name);
      onClose();
    } else {
      setLedger(ledger.ledgerGroup);
      onClose();
    }
    setOpenId(null);
  };

  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="খতিয়ান নির্বাচণ করুন"
      width="w-3xl h-[85vh] lg:h-[80vh] overflow-y-auto pb-5 no-scrollbar"
    >
      {/* Search Input */}
      <div className="px-3 pb-3">
        <CustomSearchInput search={search} setSearch={setSearch} />
      </div>

      <ScrollArea className="px-3 pb-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredData.map((ledger) => (
            <Popover
              key={ledger.id}
              open={openId === ledger.id}
              onOpenChange={(open) => setOpenId(open ? ledger.id : null)}
            >
              <PopoverTrigger asChild>
                <Card
                  onClick={() => {
                    if (ledger.names && ledger.names.length > 0) {
                      setOpenId(openId === ledger.id ? null : ledger.id);
                    } else {
                      handleClick(ledger);
                    }
                  }}
                  className="p-2 text-center cursor-pointer   bg-gray-100 hover:bg-gray-200 transition rounded-lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    📘 <span>{ledger.ledgerGroup}</span>
                  </div>
                </Card>
              </PopoverTrigger>

              {ledger.names && ledger.names.length > 0 && (
                <PopoverContent
                  side="top"
                  align="center"
                  className="p-2 space-y-1 w-40 bg-white shadow-md border rounded-lg z-50"
                >
                  {ledger.names.map((name, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleClick(ledger, name)}
                      className="  p-1 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      {name}
                    </div>
                  ))}
                </PopoverContent>
              )}
            </Popover>
          ))}
        </div>
      </ScrollArea>
      <button onClick={() => setOpenNewModal(true)}>
        <CustomNewButton title="+ নতুন খতিয়ান অ্যাড" />
      </button>

      {openNewModal && (
        <KhotiyanModal
          isOpen={openNewModal}
          onClose={() => setOpenNewModal(false)}
        />
      )}
    </CustomModalBottom>
  );
};

export default SelectLedgerModal;
