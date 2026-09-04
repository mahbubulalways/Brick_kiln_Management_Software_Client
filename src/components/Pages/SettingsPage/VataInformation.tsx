"use client";

import CustomLoader from "@/components/Reusable/CustomLoader";
import CustomStatus from "@/components/Reusable/CustomStatus";
import {  TVataResponse } from "@/interface/vata";
import { useGetMyVataInformationQuery } from "@/redux/features/vata.features";
import { formatBanglaDate } from "@/utils/formatBanglaDate";
import {
    FiInfo,
    FiUser,
    FiPhone,
    FiMapPin,
    FiCreditCard,
    FiCalendar,
    FiMessageSquare,
} from "react-icons/fi";
import { MdOutlineStorefront } from "react-icons/md";

type TVataInfo = {
    vataId: string;
    nameEn: string;
    nameBn: string;
    address: string;
    mobileNumber: string;
    ownerName: string;
    ownerPhoneNumber: string;
    smsRate: string;
    softwareFee: string;
    nextPaymentDate: string;
};

const VataInformation = () => {
    const { isError, isLoading, data } = useGetMyVataInformationQuery(undefined)

    const information = data?.data as TVataResponse

    if (isLoading) {
        return <CustomLoader cls="h-[50vh]" />
    }
    if (isError) {
        return <CustomStatus type="error" />
    }
    return (
        <div className="w-full bg-white px-1 md:p-5 rounded">
            {/* ================= HEADER ================= */}
            <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#039A63] text-white shadow-sm">
                    <FiInfo className="h-5 w-5" />
                </div>

                <div>
                    <h1 className="text-xl font-bold text-gray-900">
                        প্রতিষ্ঠানের তথ্য
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        ভাটার প্রোফাইল এবং বিলিং তথ্য। যে কোনো তথ্য আপডেটের জন্য
                        হেল্পলাইনে যোগাযোগ করুন
                    </p>
                </div>
            </div>

            <form >
                {/* ================= MAIN GRID ================= */}
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]">
                    {/* =====================================================
              LEFT SIDE
          ====================================================== */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        {/* Header */}
                        <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
                            <MdOutlineStorefront className="h-5 w-5 text-blue-500" />

                            <h2 className="text-lg font-semibold text-gray-700">
                                বিজনেসের বিবরণ
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* ================= BANGLA NAME ================= */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <MdOutlineStorefront className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        ভাটা নাম (বাংলা)
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                    {information?.nameBangla}
                                </p>
                            </div>

                            {/* ================= ENGLISH NAME ================= */}
                            <div className="rounded-xl border border-blue-100 bg-white p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <MdOutlineStorefront className="h-4 w-4 text-blue-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        ভাটার নাম (ইংরেজি)
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                    {information?.nameEnglish}
                                </p>
                            </div>

                            {/* ================= ADDRESS ================= */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 md:col-span-2">
                                <div className="mb-2 flex items-center gap-2">
                                    <FiMapPin className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        ঠিকানা (চালান অনুযায়ী)
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                    {information?.address}
                                </p>
                            </div>

                            {/* ================= OWNER NAME ================= */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <FiUser className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        মালিকের নাম
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                    {information?.ownerName}
                                </p>
                            </div>

                            {/* ================= OWNER PHONE ================= */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <FiPhone className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        ব্যক্তিগত যোগাযোগ
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                    {information?.ownerPhoneNumber}
                                </p>
                            </div>

                            {/* ================= MOBILE NUMBERS ================= */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 md:col-span-2">
                                <div className="mb-2 flex items-center gap-2">
                                    <FiPhone className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        ইনভয়েস ফোন নম্বর
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                    {information?.challansPhoneNumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
              RIGHT SIDE - BILLING
          ====================================================== */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        {/* Header */}
                        <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
                            <FiCreditCard className="h-5 w-5 text-[#039A63]" />

                            <h2 className="text-lg font-semibold text-gray-700">
                                বিলিং তথ্য
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* ================= CLIENT ID ================= */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <FiCreditCard className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        ক্লায়েন্ট আইডি
                                    </span>
                                </div>

                                <span className="inline-flex rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-600">
                                    {information?.vataId}
                                </span>
                            </div>

                            {/* ================= SOFTWARE FEE ================= */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <FiCreditCard className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        প্ল্যান
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                      {information?.subscriptionPlan?.name}
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <FiCreditCard className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                         সফটওয়্যার ফি
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                    ৳   {information?.subscriptionPlan?.price}/{information?.subscriptionPlan?.billingCycle}
                                </p>
                            </div>

                            {/* ================= SMS RATE ================= */}
                            {/* <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <FiMessageSquare className="h-4 w-4 text-gray-400" />

                                    <span className="text-sm font-medium text-gray-400">
                                        এসএমএস রেট (প্রতি টি)
                                    </span>
                                </div>

                                <p className="text-base font-semibold text-gray-700">
                                    ৳   {information?.smsRate}
                                </p>
                            </div> */}

                            {/* ================= NEXT PAYMENT ================= */}
                            <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
                                <div className="mb-2 text-center">
                                    <span className="text-sm font-semibold text-orange-500">
                                        পরবর্তী পেমেন্ট
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <FiCalendar className="h-6 w-6 text-orange-500" />

                                    <p className="text-2xl font-semibold text-orange-500">
                                        {formatBanglaDate({ date: information?.nextPaymentDate! })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="mt-5 flex items-start gap-2 border-t border-gray-200 pt-4">
                    <FiInfo className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                    <p className="text-sm leading-5 text-gray-400">
                        ভাটার তথ্য পরিবর্তনের প্রয়োজন হলে অ্যাডমিনের সাথে যোগাযোগ করুন।
                    </p>
                </div>
            </form>
        </div>
    );
};

export default VataInformation;