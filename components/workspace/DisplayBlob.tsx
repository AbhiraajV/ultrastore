"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { simpleFirestoreZipToFile } from "@/utils/fromVideoFlow/simpleFirestoreZipToFile";
import { File } from "@prisma/client";

type Props = {
  fileDisplayBlob: Blob | undefined | null;
  decoded: boolean;
  causeDecode?: boolean;
  file?: File;
};

function DisplayBlob({
  fileDisplayBlob,
  decoded,
  causeDecode = false,
  file = undefined,
}: Props) {
  const [decodedBlob, setDecodedBlob] = useState<Blob | undefined>(undefined);

  useEffect(() => {
    setDecodedBlob(fileDisplayBlob ? fileDisplayBlob : undefined);
  }, [fileDisplayBlob]);

  if (causeDecode && file && !decodedBlob) {
    return (
      <Button
        onClick={async () => {
          const blob = await simpleFirestoreZipToFile({ file });
          setDecodedBlob(blob);
        }}
      >
        Decode & Download
      </Button>
    );
  }
  if (!decodedBlob) return <></>;
  return (
    <div className="overflow-y-hidden">
      <span className="text-[0.8rem] font-medium">
        note: this is the{" "}
        <span className="text-blue-500 font-extrabold">
          {" "}
          {decoded ? "decoded file" : "original file"}
        </span>
        <br />
        <a
          href={URL.createObjectURL(decodedBlob)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-[0.8rem] font-bold italic underline">
            click here to open
          </span>
        </a>
      </span>
      <object
        data={URL.createObjectURL(decodedBlob)}
        type={decodedBlob.type}
        className="w-full h-full"
      >
        <span className="text-[0.8rem] font-medium">
          browser does not support displaying this file type.
        </span>
      </object>
    </div>
  );
}

export default React.memo(DisplayBlob);
