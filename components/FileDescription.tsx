"use client";
import useStore from "@/hooks/useStore";
import { bitsToMbs } from "@/utils/helpers/sizeBitsObject";
import React from "react";
import { ProgressBar } from "./Progress";
import UpdatingButton from "./UpdatingButton";
import { delay } from "@/utils/toVideoFlow/GenerateBitstream";

type Props = {
  handleClick: ({ decode }: { decode: boolean }) => Promise<void>;
};

function FileDescription({ handleClick }: Props) {
  const { fileData } = useStore();

  return (
    <div className="lg:w-[70%] w-[100%] flex flex-col justify-between mr-1 gap-[0.5rem] h-full">
      <span className="text-[2rem] font-bold lg:w-[60%] w-[100%]">
        {fileData.name}
      </span>
      <span className="text-[0.8rem] text-muted-foreground lg:w-[60%] w-[100%]">
        {fileData.description}
      </span>
      <div className="flex flex-col">
        {fileData.fileSize !== 0 && (
          <span className="text-[0.6rem] text-muted-foreground font-bold lg:w-[60%] w-[100%]">
            {"size: " + bitsToMbs(fileData.fileSize) + " MBs"}
          </span>
        )}
        {fileData.fileType !== "" && (
          <span className="text-[0.6rem] text-muted-foreground font-bold lg:w-[60%] w-[100%]">
            {"type: " + fileData.fileType}
          </span>
        )}
        {fileData.resolution !== null && (
          <span className="text-[0.6rem] text-muted-foreground font-bold lg:w-[60%] w-[100%]">
            {"ideal resolution: " + fileData.resolution.split("_")[1]}
          </span>
        )}
      </div>
      <div className="pt-4">
        <ProgressBar />
      </div>
      <UpdatingButton handleClick={handleClick} />
    </div>
  );
}

export default FileDescription;
