"use client";
import React, { useEffect, useState } from "react";
import MemoizedImageGrid from "./ImageGrid";
import { FromVideo } from "@/utils/fromVideoFlow/FromVideoFlow";
import {
  getEarlyBitstream,
  preBitstreamToVideoFlow,
} from "@/utils/toVideoFlow/ToVideoFlow";
import {
  ImageSizeObjectKeyType,
  SizeBasedAnalysisData,
  bitsToMbs,
  findSmallestResolution,
  getSizeBasedAnalysis,
  image_size,
} from "@/utils/helpers/sizeBitsObject";
import { useToast } from "../ui/use-toast";
import ChartForSizeBasedAnalysis from "../charts";
import DisplayBlob from "./DisplayBlob";
import useStore from "@/hooks/useStore";
import { ProgressBar } from "../Progress";
import { Steps } from "@/hooks/types/type";
import { delay } from "@/utils/toVideoFlow/GenerateBitstream";
import { Separator } from "../ui/separator";
import UpdatingButton from "./UpdatingButton";
import { uploadZipFunction } from "@/utils/firebase/firebase";
import { Profile } from "@prisma/client";
import FileDescription from "./FileDescription";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Workspace({ profile }: { profile: Profile }) {
  const [decodedBlob, setDecodedBlob] = useState<Blob | null>(null);
  const [preBitstream, setPreBitstream] = useState<string | undefined>(
    undefined
  );
  const [ultrastoreReadableBitstreamMaps, setUltrastoreReadableBitstreamMaps] =
    useState<Blob[]>([]);
  const [sizeBasedAnalysis, setSizeBasedAnalysis] = useState<
    SizeBasedAnalysisData | undefined
  >(undefined);
  const [fileType, setFileType] = useState<string>("");
  const [zipBlob, setZipBlob] = useState<Blob | undefined>(undefined);
  const [optimalResolution, setOptimalResolution] =
    useState<ImageSizeObjectKeyType>();
  const { toast } = useToast();
  const {
    setProgressObject,
    progressObject,
    setFileData,
    fileData,
    toggle,
    isLoading,
    toggleLoading,
  } = useStore((state) => state);
  const BeginConversion = async () => {
    console.log({ fileData });
    if (!fileData.file) {
      toast({
        title: "File not found!",
        description:
          "Something went wrong, we couldnt detect a file. Please try again",
      });
      return;
    }
    const { file } = fileData;
    setFileType(file.type);
    const { bitstream } = await getEarlyBitstream(file, setProgressObject);
    setPreBitstream(bitstream);
    toast({
      title: "Bitstream Generated!",
      description:
        "Bitstream of length: " +
        bitstream.length +
        ".\n Generated from ArrayBuffers and Blobs",
    });
    const { data } = getSizeBasedAnalysis(bitstream.length);
    setSizeBasedAnalysis(data);
    const { idealResolution } = findSmallestResolution(data);
    console.log({ idealResolution });
    setFileData({ ...fileData, resolution: idealResolution });
    setOptimalResolution(idealResolution);
    toast({
      title: "Ideal Resolution Calculated",
      description:
        "optimal resolution: " +
        image_size[idealResolution].common_name +
        " (" +
        idealResolution +
        ") " +
        ". \n Depends on the bitstream length file type and other factors",
    });
    setProgressObject("Calculations Done");
  };

  const EducatedGuessBasedConvertor = async () => {
    toast({
      title: "Generating Bitstream Map Image Blobs!",
      description: "This process can take some time! Please be patient",
    });
    await delay(500);
    console.log("Starting");
    if (preBitstream === undefined) return;
    console.log({ optimalResolution });
    const result = await preBitstreamToVideoFlow(
      preBitstream,
      setProgressObject,
      optimalResolution
    );
    if (result === undefined) {
      console.log("something went wrong RETRYING!");
      return;
    }
    const { bitstreamLength, zip, blobs } = result;
    setZipBlob(zip);
    setUltrastoreReadableBitstreamMaps(blobs);
  };

  const attemptDecode = async () => {
    const decoded_blob = await FromVideo(
      ultrastoreReadableBitstreamMaps,
      fileType,
      optimalResolution
    );
    setDecodedBlob(decoded_blob);
  };

  const handleClick = async ({ decode }: { decode: boolean }) => {
    if (decode) {
      toggleLoading();
      await delay(200);
      await attemptDecode();
      toggleLoading();
    } else {
      switch (progressObject.justFinished) {
        case Steps["Calculations Done"]:
          toggleLoading();
          await delay(200);
          await EducatedGuessBasedConvertor();
          toggleLoading();
          break;
        case Steps["File Received"]:
          await BeginConversion();
          break;
        case Steps["__"]:
          toggle();
          break;
        case Steps["Zip File Generated"]:
          toggleLoading();
          const out = await uploadZipFunction(zipBlob, fileData, profile);
          console.log({ uploadResult: out });
          setProgressObject("Upload Started");
          toggleLoading();
          break;
        default:
          console.log("Unknown Step, skipping conversion");
          // Handle other cases if needed
          break;
      }
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (progressObject.justFinished === Steps["Upload Started"]) {
      router.refresh();
      router.push("/your-files");
      // router.push("http://localhost:3000/api/auth");
    }
  }, [progressObject, router]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="flex flex-col lg:flex-row justify-start lg:p-0 p-4 lg:gap-0 gap-3">
        <FileDescription handleClick={handleClick} />
        <div className="flex flex-col">
          {!fileData.file && (
            <Image
              width={500}
              height={400}
              src="/hero.png"
              alt=""
              className="transform translate-x-[3.1rem] -translate-y-[2.6rem] md:block hidden"
            />
          )}
          <DisplayBlob fileDisplayBlob={fileData.file} decoded={false} />
          <Separator
            orientation="horizontal"
            className="mt-2"
            hidden={decodedBlob === null}
          />
          <DisplayBlob fileDisplayBlob={decodedBlob} decoded={true} />
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="mt-2"
        hidden={!sizeBasedAnalysis}
      />
      <ChartForSizeBasedAnalysis sizeBasedAnalysis={sizeBasedAnalysis} />
      <Separator
        orientation="horizontal"
        className="mt-2"
        hidden={ultrastoreReadableBitstreamMaps.length === 0}
      />
      <MemoizedImageGrid blobs={ultrastoreReadableBitstreamMaps} />
    </div>
  );
}
