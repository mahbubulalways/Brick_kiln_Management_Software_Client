"use client";
import { useState } from "react";
import Image from "next/image";
import bgImage from "@/assets/login_bg.png";
import sideImage from "@/assets/login_side.png";
import MarqueeOneLine from "@/components/Marquee/Marguee";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

            <form className="space-y-4">
              {/* Username */}
              <div className="flex flex-col w-full">
                <label className="text-gray-700 mb-1   font-semibold">
                  ইউজারনেম
                </label>
                <input
                  type="text"
                  placeholder="demo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col w-full">
                {/* Label + Icon */}
                <div className="flex justify-between items-center mb-1">
                  <label className="text-gray-700   font-semibold">
                    পাসওয়ার্ড
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 flex items-center"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>

                {/* Input */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                />
              </div>

              {/* Submit Button */}
              <Link href={"/"}>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-500 transition cursor-pointer"
                >
                  লগইন
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
