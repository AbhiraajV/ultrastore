"use client";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function Navbar({}: Props) {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div className="w-full md:h-70px md:py-8 py-3 pl-5 md:px-0 flex items-center text-sm font-semibold">
      <div className="flex-1 flex gap-5">
        <div
          className=" font-semibold cursor-pointer"
          onClick={() => router.push("/")}
        >
          New Upload
        </div>
        <div
          className=" font-semibold cursor-pointer"
          onClick={() => router.push("/your-files")}
        >
          Your Files
        </div>
      </div>
      <div className="flex-none ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar;
