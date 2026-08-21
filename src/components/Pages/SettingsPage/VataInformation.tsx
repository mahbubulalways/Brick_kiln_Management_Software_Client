"use client";

import CustomInput from "@/components/Reusable/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiHome, FiSave, FiInfo } from "react-icons/fi";

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TVataInfo>({
        defaultValues: {
            vataId: "12321",
            nameEn: "DEMO",
            nameBn: "এম.এম.বি ব্রিকস",
            address: "হিলালিপাড়া,কাটাবাড়ি,গোবিন্দগঞ্জ",
            mobileNumber: "01901349901, 01901349906",
            ownerName: "মোঃ মানিক মিয়া",
            ownerPhoneNumber: "01918908070",
            // smsRate: "৳ 0.35",
            // softwareFee: "৳ 1500",
            // nextPaymentDate: "05-10-2033",
        },
    });

    const onSubmit: SubmitHandler<TVataInfo> = async (data) => {
        console.log(data);
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9F9F2] text-[#039A63]">
                        <FiHome className="h-5 w-5" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            ভাটার তথ্য
                        </h1>

                        <p className="text-xs text-gray-500 mt-1">
                            আপনার ভাটার মৌলিক তথ্য দেখুন ও পরিচালনা করুন
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Basic Information */}
                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                    <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/70 px-5 py-3.5">
                        <div className="h-2 w-2 rounded-full bg-[#039A63]" />

                        <h2 className="text-sm font-semibold text-gray-800">
                            ভাটার মৌলিক তথ্য
                        </h2>
                    </div>

                    <div className="p-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <CustomInput
                                name="vataId"
                                label="ভাটার আইডি"
                                error={errors.vataId!}
                                placeholder=""
                                register={register}
                                readonly
                                type="number"
                            />

                            <CustomInput
                                name="nameBn"
                                label="ভাটার নাম (বাংলায়)"
                                error={errors.nameBn!}
                                placeholder=""
                                register={register}
                                readonly
                                type="text"
                            />

                            <CustomInput
                                name="nameEn"
                                label="ভাটার নাম (ইংরেজি)"
                                error={errors.nameEn!}
                                placeholder=""
                                register={register}
                                readonly
                                type="text"
                            />

                            <CustomInput
                                name="address"
                                label="ভাটার ঠিকানা (চালানে রয়েছে)"
                                error={errors.address!}
                                placeholder=""
                                register={register}
                                readonly
                                type="text"
                            />

                            <CustomInput
                                name="ownerName"
                                label="মালিকের নাম"
                                error={errors.ownerName!}
                                placeholder=""
                                register={register}
                                readonly
                                type="text"
                            />

                            <CustomInput
                                name="ownerPhoneNumber"
                                label="মালিকের ফোন নম্বর"
                                error={errors.ownerPhoneNumber!}
                                placeholder=""
                                register={register}
                                readonly
                                type="text"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden mt-5">
                    <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/70 px-5 py-3.5">
                        <div className="h-2 w-2 rounded-full bg-[#039A63]" />

                        <h2 className="text-sm font-semibold text-gray-800">
                            যোগাযোগের তথ্য
                        </h2>
                    </div>

                    <div className="p-5">
                        <CustomInput
                            name="mobileNumber"
                            label="ফোন নম্বর (চালানে থাকবে)"
                            error={errors.mobileNumber!}
                            placeholder="019XXXXXXXX, 018XXXXXXXX"
                            register={register}
                            readonly
                            type="text"
                        />

                        <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#F0FDF8] border border-[#D1FAE5] px-3 py-2.5">
                            <FiInfo className="mt-0.5 h-4 w-4 shrink-0 text-[#039A63]" />

                            <div className="text-xs leading-5 text-gray-600">
                                <p>
                                    একটি নম্বর লেখার পর কমা (,) দিয়ে অন্য নম্বর
                                    লিখবেন।
                                </p>

                                <p className="text-gray-500">
                                    সর্বোচ্চ ৪টি নম্বর লিখতে পারবেন এবং নম্বরগুলো
                                    ইংরেজিতে লিখবেন।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                {/* <div className="rounded-xl border border-gray-200 bg-white overflow-hidden mt-5">
                    <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/70 px-5 py-3.5">
                        <div className="h-2 w-2 rounded-full bg-[#039A63]" />

                        <h2 className="text-sm font-semibold text-gray-800">
                            পেমেন্ট ও সফটওয়্যার তথ্য
                        </h2>
                    </div>

                    <div className="p-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <CustomInput
                                name="smsRate"
                                label="SMS রেট"
                                error={errors.smsRate!}
                                placeholder=""
                                register={register}
                                readonly
                                type="text"
                            />

                            <CustomInput
                                name="softwareFee"
                                label="সফটওয়্যার ফি"
                                error={errors.softwareFee!}
                                placeholder=""
                                register={register}
                                readonly
                                type="text"
                            />

                            <CustomInput
                                name="nextPaymentDate"
                                label="পরবর্তী পেমেন্টের তারিখ"
                                error={errors.nextPaymentDate!}
                                placeholder=""
                                register={register}
                                readonly
                                type="text"
                            />
                        </div>
                    </div>
                </div> */}

                {/* Footer */}
                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 mt-5">
                    <p className="text-xs text-gray-400">
                        ভাটার তথ্য পরিবর্তনের প্রয়োজন হলে অ্যাডমিনের সাথে যোগাযোগ করুন।
                    </p>

                    <button
                        type="submit"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            bg-[#039A63]
                            px-6
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-[#028653]
                            active:scale-[0.98]
                            cursor-pointer
                        "
                    >
                        <FiSave className="h-4 w-4" />
                        সেভ করুন
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VataInformation;