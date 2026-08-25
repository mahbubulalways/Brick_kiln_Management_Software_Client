import { Suspense } from "react";
import Khotiyan from "@/components/Pages/SettingsPage/Khotiyan";
import CustomLoader from "@/components/Reusable/CustomLoader";

export default function Page() {
  return (
    <Suspense
     fallback={<div><CustomLoader cls="h-[30vh]"/></div>}
    >
      <Khotiyan />
    </Suspense>
  );
} 