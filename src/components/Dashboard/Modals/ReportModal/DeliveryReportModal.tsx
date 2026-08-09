/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomModal from "@/components/Reusable/CustomModal";
export type TItems = { class: string; delivered: number };

type TDeliveryReport = {
  items: TItems[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const DeliveryReportModal = ({
  isOpen,
  items,
  onClose,
  title,
}: TDeliveryReport) => {
  // Group and sum by class
  const groupedItems = items.reduce((acc: any, item) => {
    const found = acc.find((i: any) => i.class === item.class);
    if (found) found.delivered += item.delivered;
    else acc.push({ ...item });
    return acc;
  }, []);

  const total = groupedItems.reduce(
    (t: number, i: TItems) => t + i?.delivered,
    0
  );

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={title} width="md">
      {!items?.length ? (
        <p className="text-center py-16">কোনো রিপোর্ট পাওয়া যায় নি</p>
      ) : (
        <div className="w-full border rounded-md overflow-hidden">
          <div className="grid grid-cols-2 bg-gray-100 p-2 font-medium text-center">
            <span>শ্রেণি</span>
            <span>ডেলিভারি</span>
          </div>

          {groupedItems.map((item: TItems, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm px-2 py-1.5 border-t text-center"
            >
              <span>{item.class}</span>
              <span>{item.delivered.toLocaleString()}</span>
            </div>
          ))}

          <div className="flex items-center justify-between text-sm px-2 py-1.5 border-t font-bold text-center bg-gray-50">
            <span>মোট</span>
            <span>{total.toLocaleString()}</span>
          </div>
        </div>
      )}
    </CustomModal>
  );
};

export default DeliveryReportModal;
