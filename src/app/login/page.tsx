"use client";
import { useState } from "react";
import Image from "next/image";
import bgImage from "@/assets/login_bg.png";
import sideImage from "@/assets/login_side.png";
import MarqueeOneLine from "@/components/Marquee/Marguee";
import { FieldValues, useForm } from "react-hook-form";
import { userLogin } from "@/service/actions/userLogin";
import { storeUserInLocalStorage } from "@/service/auth.services";
import CustomInputLabel from "@/components/Reusable/CustomInputLabel";
import { useRouter } from "next/navigation";
type TLogin = {
  auth: string;
  password: string;
};
export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    defaultValues: {
      auth: "admin@gmail.com",
      password: "12345678",
    },
  });

  const onSubmt = async (data: FieldValues) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const result = await userLogin(data);
      console.log(result);
      setIsLoading(false);
      if (result?.success && result?.redirectPath) {
        storeUserInLocalStorage(result?.data?.token);
        router.push(result.redirectPath);
      } else {
        setErrorMsg(result?.message || "Something went wrong.");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error?.data?.message || "Something went wrong.");
      setIsLoading(false);
    }
  };
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="background"
          fill
          className="object-cover brightness-95"
        />
      </div>

      {/* Content */}
      <div className="w-[90%] max-w-[700px] z-10">
        {/* Marquee */}
        <div className="px-16">
          <MarqueeOneLine />
        </div>

        {/* Login Box */}
        <div className="flex flex-col md:flex-row items-center bg-white/90 rounded-2xl shadow-lg p-4 md:p-3 gap-6">
          {/* Left Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src={sideImage}
              alt="illustration"
              width={350}
              height={350}
              className="rounded-xl"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 md:pr-5">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-2 text-center">
              আপনাকে স্বাগতম!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              আপনার ব্যবসা পরিচালনার জন্য লগইন করুন
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmt)}>
              {errorMsg && (
                <p className="py-5 text-center text-red-500 text-sm">
                  {errorMsg}
                </p>
              )}
              <CustomInputLabel
                label="ইমেইল বা ফোন নম্বর"
                name="auth"
                placeholder="ইমেইল বা ফোন নম্বর লিখুন"
                register={register}
                errMsg="ইমেইল বা ফোন নম্বর আবশ্যক।"
                error={errors.auth}
                required
              />

              <CustomInputLabel
                label="পাসওয়ার্ড"
                name="password"
                type="password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                register={register}
                errMsg="পাসওয়ার্ড আবশ্যক।"
                error={errors.password}
                required
              />

              <button
                type="submit"
                className={`w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-500 transition cursor-pointer disabled:bg-gray-300`}
                disabled={isLoading}
              >
                লগইন করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
