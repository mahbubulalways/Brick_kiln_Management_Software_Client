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
import { useGetAllLedgerQuery } from "@/redux/features/ledger.features";
import { TLedger } from "@/interface/ledger";

type TCustomModal = {
  isOpen: boolean;
  onClose: () => void;
  ledger: string;
  setLedger: Dispatch<SetStateAction<string>>;
};

const SelectLedgerModal = ({ isOpen, onClose, setLedger }: TCustomModal) => {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [openNewModal, setOpenNewModal] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetAllLedgerQuery(undefined);
  const ledgers = data?.data as TLedger[];

  const filteredData = useMemo(() => {
    return ledgers ?? [];
  }, [ledgers]);

  return (
    <CustomModalBottom
      isOpen={isOpen}
      onClose={onClose}
      title="খতিয়ান নির্বাচণ করুন"
      width="xl"
    >
      {/* Search Input */}
      <div className="px-3 pb-3">
        <CustomSearchInput search={search} setSearch={setSearch} />
      </div>

      <ScrollArea className="px-3 pb-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredData?.map((ledger: TLedger) => {
            const hasChildren = (ledger?.children?.length as number) > 0;

            return (
              <Popover key={ledger.id}>
                <PopoverTrigger asChild>
                  <Card
                    onClick={() => {
                      if (!hasChildren) {
                        setLedger(ledger.name);
                        onClose();
                      }
                    }}
                    className="cursor-pointer rounded-lg p-2 text-center"
                  >
                    📘 {ledger.name}
                  </Card>
                </PopoverTrigger>

                {hasChildren && (
                  <PopoverContent className="w-44 p-2">
                    {ledger?.children?.map((child: TLedger) => (
                      <div
                        key={child.id}
                        onClick={() => {
                          setLedger(child.name);
                          onClose();
                        }}
                        className="cursor-pointer rounded-md p-2 hover:bg-gray-100"
                      >
                        {child.name}
                      </div>
                    ))}
                  </PopoverContent>
                )}
              </Popover>
            );
          })}
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
