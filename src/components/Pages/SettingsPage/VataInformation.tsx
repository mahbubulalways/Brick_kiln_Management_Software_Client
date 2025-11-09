import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import { SubmitHandler, useForm } from "react-hook-form";

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
      smsRate: "৳ 0.35",
      softwareFee: "৳ 1500",
      nextPaymentDate: "05-10-2033",
    },
  });

  const onSubmit: SubmitHandler<TVataInfo> = async (data) => {};
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 py-3">ভাটার তথ্য</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <CustomInputLabel
            name="vataId"
            label="ভাটার আইডি"
            error={errors.vataId!}
            placeholder=""
            register={register}
            readonly
            type="number"
          />
          <CustomInputLabel
            name="nameBn"
            label="ভাটার নাম (বাংলায়)"
            error={errors.nameBn!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="nameEn"
            label="ভাটার নাম (ইংরেজি)"
            error={errors.nameEn!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="address"
            label="ভাটার ঠিকানা (চালানে রয়েছে)"
            error={errors.address!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="mobileNumber"
            label="ফোন নম্বর (চালানে রয়েছে)"
            error={errors.mobileNumber!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="ownerName"
            label="মালিকের নাম"
            error={errors.ownerName!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="ownerPhoneNumber"
            label="মালিকের ফোন নম্বর"
            error={errors.ownerPhoneNumber!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="smsRate"
            label="এসএমএস রেট"
            error={errors.smsRate!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="softwareFee"
            label="সফটওয়্যারের ফি (মাসিক)"
            error={errors.softwareFee!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
          <CustomInputLabel
            name="nextPaymentDate"
            label="পরবর্তী ফি পেমেন্ট তারিখ"
            error={errors.softwareFee!}
            placeholder=""
            register={register}
            readonly
            type="text"
          />
        </div>
        <div className="flex items-center justify-between text-sm pt-5 pb-1 text-gray-600">
          <p>ফোন নম্বর (চালানে থাকবে)</p>
          <p>একটি নম্বর লেখার পর কমা (,) দিয়ে অন্য নম্বর লিখবেন</p>
          <p>সর্বোচ্চ্য ৪ টি নম্বর (ইংরেজিতে লিখবেন)</p>
        </div>
        <CustomInputLabel
          name="mobileNumber"
          label=""
          error={errors.mobileNumber!}
          placeholder=""
          register={register}
          readonly
          type="text"
        />

        <button className="px-8 bg-[#039A63] text-white py-1.5 rounded hover:bg-green-500 transition cursor-pointer w-max mt-2">
          সেভ করুন
        </button>
      </form>
    </div>
  );
};

export default VataInformation;
