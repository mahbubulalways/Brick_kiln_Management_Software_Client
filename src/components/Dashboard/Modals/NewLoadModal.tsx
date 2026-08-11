"use client";

import CustomModal from "@/components/Reusable/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/Reusable/CustomInput";
import { showToast } from "@/components/Toast/CustomToast";
import CustomSelect from "@/components/Reusable/CustomSelect";
import CustomDatePicker from "@/components/Reusable/CustomDatePicker";
import CustomSelectAdd from "@/components/Reusable/CustomSelectWithAdd";
import { useCreateLoadInfoMutation } from "@/redux/features/load.features";
import { SERVER_ERROR_MESSAGE } from "@/constant";
import { useGetAllClassAndRateQuery } from "@/redux/features/classAndRate.features";
import { TClassAndRate } from "@/types/types";

type TCustomModal = {
    isOpen: boolean;
    onClose: () => void;
};

export interface TLoadInfo {
    date: Date;
    round: number;
    quantity: number;
    loadType: string;
    classType?: string
}
const NewLoadModal = ({ isOpen, onClose }: TCustomModal) => {
    const [mutateAsync, { isLoading }] = useCreateLoadInfoMutation()
    const {
        register,
        handleSubmit, watch,
        reset, control,
    } = useForm<TLoadInfo>({
        defaultValues: {
            date: new Date(),

        },
    });
    const isPaka = watch("loadType") === "পাকা ইট লোড হয়েছে"
    const { isLoading: classLoading, data: fetchedData } =
        useGetAllClassAndRateQuery(undefined);

    const formatLabelValue = fetchedData?.data?.filter((dt: TClassAndRate) =>
        dt.classType !== "অন্যান্য")?.map((dt: TClassAndRate) =>
            ({ label: dt.className, value: dt.className }))
    
    const onSubmit: SubmitHandler<TLoadInfo> = async (data) => {
        console.log(data);
        try {
            const result = await mutateAsync(data).unwrap();
            showToast({
                title: result?.message,
                type: "success",
            });
            onClose();
        } catch (error: any) {
            showToast({
                title: error?.data?.message || SERVER_ERROR_MESSAGE,
                type: "error",
            });
        }
    };



    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title="নতুন লোড"
        >

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-2">
                    <CustomDatePicker control={control} name="date" label="তারিখ" />

                    <CustomSelectAdd
                        name="round"
                        label="রাউন্ড"
                        placeholder="রাউন্ড নির্বাচন করুন"
                        control={control}
                        clearable={false}
                        searchable={false}
                    />

                    <CustomSelect
                        name="loadType"
                        label="লোডের ধরণ"
                        placeholder="লোডের ধরণ"
                        control={control}
                        options={[
                            {
                                label: "মাঠ থেকে লোড হয়েছে",
                                value: "মাঠ থেকে লোড হয়েছে",
                            },
                            {
                                label: "স্টক থেকে লোড হয়েছে",
                                value: "স্টক থেকে লোড হয়েছে",
                            },
                            {
                                label: "পাকা ইট লোড হয়েছে",
                                value: "পাকা ইট লোড হয়েছে",
                            },
                        ]}

                    />

                    {
                        isPaka && <CustomSelect
                            name="classType"
                            label="শ্রেণি"
                            placeholder="শ্রেণি"
                            control={control}
                            isLoading={classLoading}
                            options={formatLabelValue || []}

                        />
                    }



                    <CustomInput
                        name="quantity"
                        label="পরিমান"
                        placeholder="লোডের পরিমাণ"
                        register={register}
                        type="text" />


                </div>

                <div className="flex items-center justify-between pt-5">
                    <div
                        onClick={() => reset()}
                        className="text-[14px] border border-gray-300 bg-white hover:border-[#039A63] px-10 py-1.5 text-gray-500 duration-500 hover:text-[#039A63] font-medium rounded cursor-pointer"
                    >
                        ক্লিয়ার
                    </div>
                    <button
                        type="submit"
                        className="text-[14px] bg-[#039A63] px-8 py-1.5 text-gray-100 font-medium rounded cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? "অ্যাড হচ্ছে..." : "অ্যাড করুন"}
                    </button>
                </div>

            </form>
        </CustomModal>
    );
};

export default NewLoadModal;