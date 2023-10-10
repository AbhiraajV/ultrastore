import React from "react";

type Props = {
  fileDisplayBlob: Blob | undefined | null;
  decoded: boolean;
};

function DisplayBlob({ fileDisplayBlob, decoded }: Props) {
  const c = !fileDisplayBlob;
  console.log({ fileDisplayBlob, c });
  if (!fileDisplayBlob) return <></>;
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
          href={URL.createObjectURL(fileDisplayBlob)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-[0.8rem] font-bold italic underline">
            click here to open
          </span>
        </a>
      </span>
      <object
        data={URL.createObjectURL(fileDisplayBlob)}
        type={fileDisplayBlob.type}
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
