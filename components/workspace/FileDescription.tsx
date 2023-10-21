"use client";
import useStore from "@/hooks/useStore";
import { bitsToMbs } from "@/utils/helpers/sizeBitsObject";
import React from "react";
import UpdatingButton from "./UpdatingButton";
import { File } from "@prisma/client";
import { Crown, CrownIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProgressBar } from "../Progress";
import { TypeWriter } from "./Typewritter";

type Props = {
  handleClick?: ({ decode }: { decode: boolean }) => Promise<void>;
  onlyDescription?: boolean;
  fileData?: File | undefined | null;
};

function FileDescription({
  handleClick,
  onlyDescription = false,
  fileData: fileDataProp,
}: Props) {
  const { fileData } = useStore();
  if (!fileDataProp) fileDataProp = fileData;

  return (
    <div className="lg:w-[70%] w-[100%] flex flex-col justify-between mr-1 gap-[0.5rem] h-full">
      <span className="text-[2rem] font-bold lg:w-[60%] w-[100%] relative">
        {fileDataProp.priority && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Crown
                  size={25}
                  color="blue"
                  className="absolute top-[-5px] left-[-15px] rotate-[-45deg]"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>This file has been prioritized!!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {fileDataProp.name}
      </span>
      <span className="text-[0.8rem] text-muted-foreground lg:w-[60%] w-[100%]">
        {fileDataProp.description}
        {!(fileDataProp.fileType !== "") && (
          <div>
            <span className="font-bold text-xl">
              Welcome to <span className="text-indigo-600">Ultrastore🚀</span>
              <br />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-md">
                  🔐 Your Data your Privacy{" "}
                </span>
                <span className="text-sm font-md">🏃 Always Up!</span>
                <span className="text-sm font-md">🧶 Complex yet Simple! </span>

                <span className="text-sm font-md">💸 Free of Charge! </span>
              </div>
            </span>
          </div>
        )}
      </span>
      <div className="flex flex-col">
        {fileDataProp.fileSize !== 0 && (
          <span className="text-[0.6rem] text-muted-foreground font-bold lg:w-[60%] w-[100%]">
            {"size: " + bitsToMbs(fileDataProp.fileSize) + " MBs"}
          </span>
        )}
        {fileDataProp.fileType !== "" && fileDataProp.fileSize !== 0 && (
          <span className="text-[0.6rem] text-muted-foreground font-bold lg:w-[60%] w-[100%]">
            {"type: " + fileDataProp.fileType}
          </span>
        )}
        {fileDataProp.fileType !== "" && fileDataProp.resolution !== null && (
          <span className="text-[0.6rem] text-muted-foreground font-bold lg:w-[60%] w-[100%]">
            {"ideal resolution: " + fileDataProp.resolution.split("_")[1]}
          </span>
        )}
      </div>
      {!onlyDescription && (
        <>
          <div className="pt-4">
            <ProgressBar />
          </div>
          {handleClick && <UpdatingButton handleClick={handleClick} />}
        </>
      )}
    </div>
  );
}

export default FileDescription;
