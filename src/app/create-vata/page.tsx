"use client";


import { useCreateNewVataMutation } from "@/redux/features/vata.features";
import { handleApiError } from "@/utils/handleApiError";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export type TVata = {
    vata: {
        // Basic Information
        vataId: string;
        nameEnglish: string;
        nameBangla: string;
        address: string;
        subdomain: string;

        // Owner Information
        ownerName: string;
        ownerPhoneNumber: string;

        // Challan Information
        challansPhoneNumber: string;

        // Payment / Software Information
        smsRate: string;
        softwareFee: string;
        nextPaymentDate: string;
    };

    // Admin User Information
    owner: {
        name: string;
        username: string;
        password: string;
    };
};

const VataInformation = () => {
    const [createNewVata, { isLoading }] = useCreateNewVataMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TVata>({
        defaultValues: {
            vata: {
                vataId: "VATA-003",
                nameEnglish: "Greenfield Bricks",
                nameBangla: "গ্রিনফিল্ড ব্রিকস",
                address: "ধামরাই, ঢাকা",
                subdomain: "greenfield",
                ownerName: "Rahim Uddin",
                ownerPhoneNumber: "01745678901",
                challansPhoneNumber: "01845678901",
                smsRate: "0.45",
                softwareFee: "2500",
                nextPaymentDate: "2026-10-15",
            },

            owner: {
                name: "Rahim Uddin",
                username: "rahim",
                password: "123456",
            },
        },
    });

    const onSubmit: SubmitHandler<TVata> = async (data) => {
        try {
            const res = await createNewVata(data).unwrap()
            if (res?.success) {
                toast.success("|OOOO")
            } else {
                toast.error(res?.message)
            }
        } catch (error: any) {
            handleApiError({ error })

        }
    };

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-5 text-xl font-semibold text-gray-800">
                ভাটার তথ্য
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
                {/* ==================== */}
                {/* Vata Information */}
                {/* ==================== */}

                {/* Vata ID */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        ভাটার আইডি
                    </label>

                    <input
                        {...register("vata.vataId", {
                            required: "ভাটার আইডি দিন",
                        })}
                        type="text"
                        placeholder="VATA-001"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.vataId && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.vataId.message}
                        </p>
                    )}
                </div>

                {/* Subdomain */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        সাবডোমেইন
                    </label>

                    <div className="flex">
                        <input
                            {...register("vata.subdomain", {
                                required: "সাবডোমেইন দিন",
                                pattern: {
                                    value: /^[a-z0-9-]+$/,
                                    message:
                                        "শুধু ছোট হাতের অক্ষর, সংখ্যা ও - ব্যবহার করুন",
                                },
                            })}
                            type="text"
                            placeholder="hasan"
                            className="w-full rounded-l-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                        />

                        <span className="flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            .itvata.com
                        </span>
                    </div>

                    {errors.vata?.subdomain && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.subdomain.message}
                        </p>
                    )}
                </div>

                {/* English Name */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        ভাটার নাম (ইংরেজি)
                    </label>

                    <input
                        {...register("vata.nameEnglish", {
                            required: "ইংরেজি নাম দিন",
                        })}
                        type="text"
                        placeholder="Hasan Bricks"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.nameEnglish && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.nameEnglish.message}
                        </p>
                    )}
                </div>

                {/* Bangla Name */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        ভাটার নাম (বাংলায়)
                    </label>

                    <input
                        {...register("vata.nameBangla", {
                            required: "বাংলা নাম দিন",
                        })}
                        type="text"
                        placeholder="হাসান ব্রিকস"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.nameBangla && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.nameBangla.message}
                        </p>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        ভাটার ঠিকানা
                    </label>

                    <input
                        {...register("vata.address", {
                            required: "ঠিকানা দিন",
                        })}
                        type="text"
                        placeholder="ভাটার ঠিকানা"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.address && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.address.message}
                        </p>
                    )}
                </div>

                {/* Owner Name */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        মালিকের নাম
                    </label>

                    <input
                        {...register("vata.ownerName", {
                            required: "মালিকের নাম দিন",
                        })}
                        type="text"
                        placeholder="মালিকের নাম"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.ownerName && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.ownerName.message}
                        </p>
                    )}
                </div>

                {/* Owner Phone */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        মালিকের ফোন নম্বর
                    </label>

                    <input
                        {...register("vata.ownerPhoneNumber", {
                            required: "মালিকের ফোন নম্বর দিন",
                        })}
                        type="text"
                        placeholder="019XXXXXXXX"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.ownerPhoneNumber && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.ownerPhoneNumber.message}
                        </p>
                    )}
                </div>

                {/* Challans Phone */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        চালানের ফোন নম্বর
                    </label>

                    <input
                        {...register("vata.challansPhoneNumber", {
                            required: "চালানের ফোন নম্বর দিন",
                        })}
                        type="text"
                        placeholder="019XXXXXXXX"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.challansPhoneNumber && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.challansPhoneNumber.message}
                        </p>
                    )}
                </div>

                {/* SMS Rate */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        SMS Rate
                    </label>

                    <input
                        {...register("vata.smsRate", {
                            required: "SMS rate দিন",
                        })}
                        type="number"
                        step="0.01"
                        placeholder="0.35"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.smsRate && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.smsRate.message}
                        </p>
                    )}
                </div>

                {/* Software Fee */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Software Fee
                    </label>

                    <input
                        {...register("vata.softwareFee", {
                            required: "Software fee দিন",
                        })}
                        type="number"
                        step="0.01"
                        placeholder="1500"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.softwareFee && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.softwareFee.message}
                        </p>
                    )}
                </div>

                {/* Next Payment Date */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        পরবর্তী পেমেন্টের তারিখ
                    </label>

                    <input
                        {...register("vata.nextPaymentDate", {
                            required: "পরবর্তী পেমেন্টের তারিখ দিন",
                        })}
                        type="date"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.vata?.nextPaymentDate && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.vata.nextPaymentDate.message}
                        </p>
                    )}
                </div>

                {/* ==================== */}
                {/* Admin User Information */}
                {/* ==================== */}

                <div className="mt-3 border-t border-gray-200 pt-4 md:col-span-2">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                        অ্যাডমিন ইউজারের তথ্য
                    </h3>
                </div>

                {/* Admin Name */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        ইউজারের নাম
                    </label>

                    <input
                        {...register("owner.name", {
                            required: "ইউজারের নাম দিন",
                        })}
                        type="text"
                        placeholder="Mahbubul Hasan"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.owner?.name && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.owner.name.message}
                        </p>
                    )}
                </div>

                {/* Username */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        ইউজারনেম
                    </label>

                    <input
                        {...register("owner.username", {
                            required: "ইউজারনেম দিন",
                        })}
                        type="text"
                        placeholder="hasan"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.owner?.username && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.owner.username.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        পাসওয়ার্ড
                    </label>

                    <input
                        {...register("owner.password", {
                            required: "পাসওয়ার্ড দিন",
                            minLength: {
                                value: 6,
                                message:
                                    "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                            },
                        })}
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#039A63] focus:ring-1 focus:ring-[#039A63]"
                    />

                    {errors.owner?.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.owner.password.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-2 md:col-span-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="disabled:bg-gray-600 rounded-lg bg-[#039A63] px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-[#028653] active:scale-95"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VataInformation;