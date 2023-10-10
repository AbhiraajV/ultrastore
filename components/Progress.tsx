"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";
import useStore from "@/hooks/useStore";
import { Steps } from "@/hooks/types/type";

export function ProgressBar() {
  const { progressObject } = useStore((state) => state);
  if (progressObject.justFinished == 0) return null;
  return (
    <>
      <Progress
        value={progressObject.progress}
        className="w-[100%] md:w-[40%]"
      />
      <span className="text-[0.8rem]">
        <span className="font-medium">on conversion step: </span>
        <span className="font-bold">{Steps[progressObject.justFinished]}</span>
      </span>
    </>
  );
}
