import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <SignIn />
    </div>
  );
}
