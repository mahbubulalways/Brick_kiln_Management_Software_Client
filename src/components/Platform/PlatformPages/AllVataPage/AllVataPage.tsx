"use client";

import {
    Ban,
    Banknote,
    CalendarDays,
    CalendarPlus,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    Eye,
    MapPin,
    MoreHorizontal,
    MoreVertical,
    Pencil,
    Plus,
    Power,
    Search,
    Settings,
    Store,
    UserRound,
    Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { useGetAllVataQuery } from "@/redux/system.features/system.vata.features";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CustomDropDownMenuItem from "@/components/Reusable/CustomDropDownMenuItem";

type TVata = {
    id: string;
    vataId: string;
    nameBangla: string;
    nameEnglish: string;
    nextPaymentDate: string | null;
    ownerName: string;
    address: string;
    createdAt: string;
    softwareFee: number | string;
};

const formatDate = (date: string | null) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("bn-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};

const formatAmount = (amount: number | string) => {
    return Number(amount || 0).toLocaleString("bn-BD");
};

const getPaymentStatus = (date: string | null) => {
    if (!date) {
        return {
            label: "তারিখ নেই",
            className: "bg-gray-100 text-gray-600",
        };
    }

    const today = new Date();
    const paymentDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    paymentDate.setHours(0, 0, 0, 0);

    if (paymentDate < today) {
        return {
            label: "পেমেন্ট বাকি",
            className: "bg-red-50 text-red-600",
        };
    }

    const diffTime =
        paymentDate.getTime() - today.getTime();

    const diffDays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24),
    );

    if (diffDays <= 7) {
        return {
            label: "শীঘ্রই পেমেন্ট",
            className: "bg-amber-50 text-amber-600",
        };
    }

    return {
        label: "সক্রিয়",
        className: "bg-emerald-50 text-emerald-600",
    };
};

const getPaymentDue = (
    nextPaymentDate: string | null,
    softwareFee: number | string,
) => {
    if (!nextPaymentDate) {
        return 0;
    }

    const today = new Date();
    const paymentDate = new Date(nextPaymentDate);

    today.setHours(0, 0, 0, 0);
    paymentDate.setHours(0, 0, 0, 0);

    if (paymentDate < today) {
        return Number(softwareFee || 0);
    }

    return 0;
};

export default function AllVataPage() {
    const { data, isLoading, isFetching } =
        useGetAllVataQuery(undefined);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 10;

    const vatas: TVata[] = data?.data ?? [];

    const filteredVatas = useMemo(() => {
        const searchValue = search
            .toLowerCase()
            .trim();

        if (!searchValue) {
            return vatas;
        }

        return vatas.filter((vata) => {
            return (
                vata.vataId
                    ?.toLowerCase()
                    .includes(searchValue) ||
                vata.nameBangla
                    ?.toLowerCase()
                    .includes(searchValue) ||
                vata.nameEnglish
                    ?.toLowerCase()
                    .includes(searchValue) ||
                vata.ownerName
                    ?.toLowerCase()
                    .includes(searchValue) ||
                vata.address
                    ?.toLowerCase()
                    .includes(searchValue)
            );
        });
    }, [vatas, search]);

    const totalPages = Math.ceil(
        filteredVatas.length / itemsPerPage,
    );

    const paginatedVatas =
        filteredVatas.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage,
        );

    const totalPaymentDue = vatas.reduce(
        (total, vata) =>
            total +
            getPaymentDue(
                vata.nextPaymentDate,
                vata.softwareFee,
            ),
        0,
    );

    const totalDueVata = vatas.filter(
        (vata) =>
            getPaymentDue(
                vata.nextPaymentDate,
                vata.softwareFee,
            ) > 0,
    ).length;

    const activeVata = vatas.filter(
        (vata) =>
            getPaymentStatus(
                vata.nextPaymentDate,
            ).label === "সক্রিয়",
    ).length;

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-full space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#039A63]/10">
                        <Store
                            size={20}
                            className="text-[#039A63]"
                        />
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold text-gray-800">
                            সকল ভাটা
                        </h1>

                        <p className="mt-0.5 text-xs text-gray-500">
                            প্ল্যাটফর্মের সকল ভাটার তথ্য
                            দেখুন ও পরিচালনা করুন
                        </p>
                    </div>
                </div>

                <Link
                    href="/system/bricks/create"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#039A63] px-4 text-sm font-semibold text-white transition hover:bg-[#028653]"
                >
                    <Plus size={17} />
                    নতুন ভাটা
                </Link>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                মোট ভাটা
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-gray-800">
                                {vatas.length.toLocaleString(
                                    "bn-BD",
                                )}
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                            <Store
                                size={20}
                                className="text-blue-600"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                সক্রিয় ভাটা
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-gray-800">
                                {activeVata.toLocaleString(
                                    "bn-BD",
                                )}
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                পেমেন্ট বাকি ভাটা
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-gray-800">
                                {totalDueVata.toLocaleString(
                                    "bn-BD",
                                )}
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                            <CalendarDays
                                size={20}
                                className="text-red-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                মোট পেমেন্ট বাকি
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-red-600">
                                ৳
                                {totalPaymentDue.toLocaleString(
                                    "bn-BD",
                                )}
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                            <Banknote
                                size={20}
                                className="text-red-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-gray-800">
                            ভাটার তালিকা
                        </h2>

                        <p className="mt-0.5 text-xs text-gray-500">
                            মোট{" "}
                            {filteredVatas.length.toLocaleString(
                                "bn-BD",
                            )}{" "}
                            টি ভাটা পাওয়া গেছে
                        </p>
                    </div>

                    <div className="relative w-full md:w-[300px]">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                handleSearch(
                                    e.target.value,
                                )
                            }
                            placeholder="ভাটা, মালিক বা ঠিকানা খুঁজুন..."
                            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-[#039A63] focus:bg-white focus:ring-1 focus:ring-[#039A63]"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="space-y-3 p-5">
                        {Array.from({
                            length: 6,
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="h-14 animate-pulse rounded-lg bg-gray-100"
                            />
                        ))}
                    </div>
                ) : paginatedVatas.length === 0 ? (
                    <div className="flex min-h-[300px] flex-col items-center justify-center">
                        <Store
                            size={30}
                            className="text-gray-300"
                        />

                        <p className="mt-3 text-sm font-medium text-gray-500">
                            কোনো ভাটা পাওয়া যায়নি
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px]">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">
                                            ভাটার তথ্য
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                            মালিক
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                            ঠিকানা
                                        </th>

                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                                            সফটওয়্যার ফি
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                            পরবর্তী পেমেন্ট
                                        </th>

                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                                            পেমেন্ট বাকি
                                        </th>

                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                                            স্ট্যাটাস
                                        </th>

                                        <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500">
                                            অ্যাকশন
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {paginatedVatas.map(
                                        (vata) => {
                                            const paymentStatus =
                                                getPaymentStatus(
                                                    vata.nextPaymentDate,
                                                );

                                            const paymentDue =
                                                getPaymentDue(
                                                    vata.nextPaymentDate,
                                                    vata.softwareFee,
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        vata.id
                                                    }
                                                    className="border-b border-gray-100 transition hover:bg-gray-50/70"
                                                >
                                                    <td className="px-5 py-3.5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#039A63]/10 text-sm font-bold text-[#039A63]">
                                                                {vata.nameBangla?.charAt(
                                                                    0,
                                                                ) ||
                                                                    "ভ"}
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-semibold text-gray-800">
                                                                    {
                                                                        vata.nameBangla
                                                                    }
                                                                </p>

                                                                <div className="mt-0.5 flex items-center gap-2">
                                                                    <span className="text-xs text-gray-500">
                                                                        {
                                                                            vata.nameEnglish
                                                                        }
                                                                    </span>

                                                                    <span className="text-gray-300">
                                                                        •
                                                                    </span>

                                                                    <span className="text-[11px] text-gray-400">
                                                                        {
                                                                            vata.vataId
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-3.5">
                                                        <div className="flex items-center gap-2">
                                                            <UserRound
                                                                size={
                                                                    15
                                                                }
                                                                className="text-gray-400"
                                                            />

                                                            <span className="text-sm text-gray-700">
                                                                {
                                                                    vata.ownerName
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-3.5">
                                                        <div className="flex max-w-[190px] items-center gap-2">
                                                            <MapPin
                                                                size={
                                                                    15
                                                                }
                                                                className="shrink-0 text-gray-400"
                                                            />

                                                            <span className="truncate text-sm text-gray-600">
                                                                {
                                                                    vata.address
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-3.5 text-right">
                                                        <span className="text-sm font-semibold text-gray-700">
                                                            ৳
                                                            {formatAmount(
                                                                vata.softwareFee,
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-3.5">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarDays
                                                                size={
                                                                    15
                                                                }
                                                                className="text-gray-400"
                                                            />

                                                            <span className="text-sm text-gray-700">
                                                                {formatDate(
                                                                    vata.nextPaymentDate,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-3.5 text-right">
                                                        {paymentDue >
                                                            0 ? (
                                                            <span className="text-sm font-bold text-red-600">
                                                                ৳
                                                                {formatAmount(
                                                                    paymentDue,
                                                                )}
                                                            </span>
                                                        ) : (
                                                            <span className="text-sm font-medium text-emerald-600">
                                                                ৳০
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3.5">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${paymentStatus.className}`}
                                                        >
                                                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

                                                            {
                                                                paymentStatus.label
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Link
                                                                href={`/system/bricks/${vata.id}`}
                                                                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-[#039A63]/10 hover:text-[#039A63]"
                                                            >
                                                                <Eye
                                                                    size={
                                                                        16
                                                                    }
                                                                />
                                                            </Link>

                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <button className="rounded p-1.5 transition hover:bg-gray-100">
                                                                        <MoreVertical className="h-4 w-4 cursor-pointer text-gray-600" />
                                                                    </button>
                                                                </DropdownMenuTrigger>

                                                                <DropdownMenuContent
                                                                    align="end"
                                                                    className="rounded-md border bg-white shadow-md"
                                                                >
                                                                    {/* <DropdownMenuItem>
                                                                        <CustomDropDownMenuItem
                                                                            Icon={Eye}
                                                                            title="ভাটার তথ্য দেখুন"
                                                                        />
                                                                    </DropdownMenuItem> */}

                                                                    <DropdownMenuItem>
                                                                        <CustomDropDownMenuItem
                                                                            Icon={Pencil}
                                                                            title="তথ্য আপডেট করুন"
                                                                        />
                                                                    </DropdownMenuItem>

                                                                    <DropdownMenuItem>
                                                                        <CustomDropDownMenuItem
                                                                            Icon={CreditCard}
                                                                            title="সাবস্ক্রিপশন পরিবর্তন করুন"
                                                                        />
                                                                    </DropdownMenuItem>

                                                                    <DropdownMenuItem>
                                                                        <CustomDropDownMenuItem
                                                                            Icon={CalendarPlus}
                                                                            title="সাবস্ক্রিপশন মেয়াদ বাড়ান"
                                                                        />
                                                                    </DropdownMenuItem>

                                                                   

                                                                    

                                                                    <DropdownMenuItem>
                                                                        <CustomDropDownMenuItem
                                                                            Icon={Power}
                                                                            title="ভাটা Deactivate করুন"
                                                                        />
                                                                    </DropdownMenuItem>

                                                                    <DropdownMenuItem>
                                                                        <CustomDropDownMenuItem
                                                                            Icon={Ban}
                                                                            title="ভাটা Suspend করুন"
                                                                        />
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3.5">
                            <p className="text-xs text-gray-500">
                                মোট{" "}
                                {filteredVatas.length.toLocaleString(
                                    "bn-BD",
                                )}{" "}
                                টি ভাটা
                            </p>

                            <div className="flex items-center gap-1.5">
                                <button
                                    type="button"
                                    disabled={
                                        currentPage === 1
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            (prev) =>
                                                prev - 1,
                                        )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 disabled:opacity-40"
                                >
                                    <ChevronLeft
                                        size={16}
                                    />
                                </button>

                                <span className="px-2 text-xs font-medium text-gray-600">
                                    {currentPage} /{" "}
                                    {totalPages || 1}
                                </span>

                                <button
                                    type="button"
                                    disabled={
                                        currentPage ===
                                        totalPages ||
                                        totalPages === 0
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            (prev) =>
                                                prev + 1,
                                        )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 disabled:opacity-40"
                                >
                                    <ChevronRight
                                        size={16}
                                    />
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {isFetching && !isLoading && (
                    <div className="border-t border-gray-100 px-5 py-2 text-right text-[11px] text-gray-400">
                        তথ্য আপডেট হচ্ছে...
                    </div>
                )}
            </div>
        </div>
    );
}