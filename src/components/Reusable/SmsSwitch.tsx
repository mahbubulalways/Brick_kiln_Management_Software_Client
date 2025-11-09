"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const SmsSwitch = ({
  showLabel,
  showBorder,
  title = "SMS",
}: {
  showLabel: boolean;
  showBorder: boolean;
  title: string;
}) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex flex-col ">
      {showLabel && (
        <p className="text-gray-600 text-xs font-medium ">এসএমএস</p>
      )}

      <div
        className={`${
          showBorder ? "border" : ""
        } border-gray-300 rounded-md px-4 py-2 flex items-center justify-center gap-3  bg-white w-full`}
      >
        <span className={` ${enabled ? "text-green-600" : "text-gray-600"}`}>
          {title}
        </span>
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SmsSwitch;
