import CustomNewButton from "@/components/Reusable/CustomNewButton";
import Link from "next/link";

export default function StockBookPage() {
    return (
        <div className="bg-white">
           <Link 
           href={'/dashboard/stock-book/update-stock'}
           className="flex justify-end items-center p-4"
           > 
           <CustomNewButton title="আপডেট স্টক " />
           </Link>
        </div>
    )
}
