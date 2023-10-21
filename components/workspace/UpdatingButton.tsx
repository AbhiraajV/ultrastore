import React from "react";
import useStore from "@/hooks/useStore";
import { Steps } from "@/hooks/types/type";
import { SpinnerCircular } from "spinners-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Props = {
  handleClick: ({ decode }: { decode: boolean }) => void;
};

function UpdatingButton({ handleClick }: Props) {
  const { setProgressObject, progressObject } = useStore((state) => state);

  const loading =
    progressObject.justFinished !== Steps["Calculations Done"] &&
    progressObject.justFinished !== Steps["File Received"] &&
    progressObject.justFinished !== Steps["__"] &&
    progressObject.justFinished !== Steps["Zip File Generated"];

  const buttonDisplayText = () => {
    if (progressObject.justFinished === Steps["Calculations Done"])
      return "Generate Blobs";
    if (progressObject.justFinished === Steps["File Received"])
      return "Start Processing";
    if (progressObject.justFinished === Steps["__"]) return "Upload new File";
    if (progressObject.justFinished === Steps["Zip File Generated"])
      return "Upload 🚀";
  };
  return (
    <>
      {progressObject.justFinished === Steps["Zip File Generated"] && (
        <>
          <Button
            className="w-[190px] mt-auto"
            variant="default"
            onClick={() =>
              handleClick({
                decode: true,
              })
            }
            disabled={loading}
          >
            Attempt Decode
          </Button>
          <span className="text-[0.8rem] font-semibold">
            recommended! check if decoding the image-maps is working prior to
            uploading the file!
          </span>
        </>
      )}
      {progressObject.justFinished === Steps["Zip File Generated"] && (
        <Separator orientation="horizontal" className="w-[50%] pl-[25%]" />
      )}
      <div className="flex gap-1">
        <Button
          className="w-[190px] mt-auto"
          variant="default"
          onClick={() =>
            handleClick({
              decode: false,
            })
          }
          disabled={loading}
        >
          {buttonDisplayText()}
        </Button>
        <SpinnerCircular
          size={20}
          thickness={180}
          speed={120}
          still={false}
          color="rgba(57, 76, 172, 1)"
          secondaryColor="#394cac0"
          enabled={loading}
        />
      </div>
      {progressObject.justFinished === Steps["Zip File Generated"] && (
        <span className="text-[0.8rem] font-semibold">
          once it is successfully stitched and pushed to youtube, you will
          receive an email!
        </span>
      )}
    </>
  );
}

export default UpdatingButton;
