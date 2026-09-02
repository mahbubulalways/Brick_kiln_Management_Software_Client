"use client";

import CustomNewButton from "@/components/Reusable/CustomNewButton";
import { useGetAllStocksQuery, useGetMainStockQuery } from "@/redux/features/stock_book.features";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { TMainStock, TMainStockTotal, TStockBook } from "@/interface/stock_book";
import TableHead from "@/components/Reusable/TableHead";
import CustomLoader from "@/components/Reusable/CustomLoader";
import { TMetaConfig } from "@/interface/meta";
import TableData from "@/components/Reusable/TableData";
import { formatBanglaDate } from "@/utils/formatBanglaDate";
import { toBanglaNumber } from "@/utils/toBanglaNumber";
import { TablePagination } from "@/components/Reusable/TablePagination";
import CustomStatus from "@/components/Reusable/CustomStatus";

export default function StockBookPage() {

    // MAIN STOCKS
    const { data, isLoading } = useGetMainStockQuery(undefined);
    const stockData = data?.data?.data as TMainStock[] || [];
    const total = data?.data?.total as TMainStockTotal

    // SIDE STOCKS
    const {
        data: stockBook,
        isLoading: stockBookLoading,
    } = useGetAllStocksQuery(
        {
            limit: 110,
            page: 1,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const stocks = (stockBook?.data?.data ?? []) as TStockBook[];
    const meta = stockBook?.data?.meta as TMetaConfig;

    return (
        <div className="p-4 bg-white min-h-screen">
            <div>
                <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            স্টক বুক
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            শ্রেণী অনুযায়ী বর্তমান স্টকের তথ্য
                        </p>
                    </div>

                    <Link href="/dashboard/stock-book/update-stock">
                        <CustomNewButton title="আপডেট স্টক" />
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-t-lg border border-gray-200 bg-white shadow-sm">
                    {isLoading ? (
                         <CustomStatus type="loading" />
                    ) : !stockData.length ? (
                        <CustomStatus type="empty" />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] border-collapse">
                                {/* Header */}
                                <thead>
                                    <tr className="bg-emerald-600 text-white">
                                        <th className="sticky left-0 z-10 min-w-[150px] border-r border-emerald-500 bg-emerald-600 px-4 py-3 text-left text-sm font-semibold">
                                            শ্রেণী
                                        </th>

                                        {stockData?.map((item, idx) => (
                                            <th
                                                key={idx}
                                                className="min-w-[130px] border-r border-emerald-500 px-4 py-3 text-center text-sm font-semibold last:border-r-0"
                                            >
                                                {item.className}
                                            </th>
                                        ))}

                                        <th className="min-w-[140px] px-4 py-3 text-center text-sm font-semibold">
                                            মোট
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* মোট স্টক */}
                                    <tr className="border-b border-gray-200">
                                        <td className="sticky left-0 z-10 border-r border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700">
                                            মোট স্টক
                                        </td>

                                        {stockData.map((item, idx) => (
                                            <td
                                                key={idx}
                                                className="border-r border-gray-100 px-4 py-3 text-center text-sm text-red-500 last:border-r-0"
                                            >
                                                {toBanglaNumber(item.totalStock)}
                                            </td>
                                        ))}

                                        <td className="px-4 py-3 text-center text-sm font-semibold text-red-500">
                                            {toBanglaNumber(total?.totalStock)}
                                        </td>
                                    </tr>

                                    {/* ডেলিভারি বাকি */}
                                    <tr className="border-b border-gray-200">
                                        <td className="sticky left-0 z-10 border-r border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700">
                                            ডেলিভারি বাকি
                                        </td>

                                        {stockData.map((item, idx) => (
                                            <td
                                                key={idx}
                                                className="border-r border-gray-100 px-4 py-3 text-center text-sm text-gray-700 last:border-r-0"
                                            >
                                                {toBanglaNumber(item.deliveryPending)}
                                            </td>
                                        ))}

                                        <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                                            {toBanglaNumber(total?.deliveryPending)}
                                        </td>
                                    </tr>

                                    {/* অফিস স্টক */}
                                    <tr className="border-b border-gray-200">
                                        <td className="sticky left-0 z-10 border-r border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700">
                                            আসল স্টক
                                        </td>

                                        {stockData.map((item, idx) => (
                                            <td
                                                key={idx}
                                                className="border-r border-gray-100 px-4 py-3 text-center text-sm text-red-500 last:border-r-0"
                                            >
                                                {toBanglaNumber(item.mainStock)}
                                            </td>
                                        ))}

                                        <td className="px-4 py-3 text-center text-sm font-semibold text-red-500">
                                            {toBanglaNumber(total?.mainStock)}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="sticky left-0 z-10 border-r border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700">
                                            শ্রেণী মূল্য
                                        </td>

                                        {stockData.map((item, idx) => (
                                            <td
                                                key={idx}
                                                className="border-r border-gray-100 px-4 py-3 text-center text-sm text-violet-700 last:border-r-0"
                                            >
                                                {toBanglaNumber(item.rate)}
                                            </td>
                                        ))}

                                        <td className="px-4 py-3 text-center text-sm font-semibold text-red-500">
                                            -
                                        </td>
                                    </tr>

                                    {/* স্টক মূল্য */}
                                    <tr>
                                        <td className="sticky left-0 z-10 border-r border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-600">
                                            স্টক মূল্য
                                        </td>

                                        {stockData.map((item, idx) => (
                                            <td
                                                key={idx}
                                                className="border-r border-gray-100 px-4 py-3 text-center text-sm font-semibold text-emerald-600 last:border-r-0"
                                            >
                                                {toBanglaNumber(item.stockValue)}
                                            </td>
                                        ))}

                                        <td className="px-4 py-3 text-center text-sm font-bold text-emerald-600">
                                            {toBanglaNumber(total?.stockValue)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>


            <div className="grid grid-cols-6 pt-10">
                <div className="col-span-2"></div>
                <div className="col-span-4">
                    <div>
                        <table className="overflow-hidden rounded-lg w-full border-collapse border">
                            <thead>
                                <tr className="bg-[#039A63] text-center text-white">
                                    <TableHead th="তারিখ" />
                                    <TableHead th="বিবরণ" />
                                    <TableHead th="শ্রেণি" />
                                    <TableHead th="স্টক ++" cls="text-green-100" />
                                    <TableHead th="স্টক --" cls="text-red-100" />

                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {stockBookLoading ? (
                                    <tr>
                                        <td colSpan={6} className="py-10">
                                            <CustomLoader cls="h-[20vh]" />
                                        </td>
                                    </tr>
                                ) : !stocks.length ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-gray-500">
                                            কোনো স্টকের তথ্য পাওয়া যায়নি।
                                        </td>
                                    </tr>
                                ) : (
                                    stocks.map((stock: TStockBook) => (
                                        <tr
                                            key={stock.id}
                                            className="border-b border-gray-200 transition-colors last:border-b-0 hover:bg-gray-50"
                                        >
                                            <TableData
                                                td={formatBanglaDate({
                                                    date: stock.createdAt,
                                                })}
                                            />

                                            <TableData
                                                td={stock.description || "-"}
                                                cls="text-left"
                                            />

                                            <TableData td={stock.class || "-"} />

                                            <TableData
                                                td={toBanglaNumber(stock.stockIn)}
                                                cls="font-medium text-green-600"
                                            />

                                            <TableData
                                                td={toBanglaNumber(stock.stockOut)}
                                                cls="font-medium text-red-500"
                                            />
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <TablePagination
                            page={meta?.page ?? 1}
                            totalPages={meta?.totalPages ?? 1}
                            dataLength={stocks.length}
                            title="স্টক"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}