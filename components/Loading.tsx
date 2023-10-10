"use client";
import { Steps } from "@/hooks/types/type";
import useStore from "@/hooks/useStore";
import React from "react";
import { SpinnerRoundFilled } from "spinners-react";

type Props = {};

function Loading({}: Props) {
  const { isLoading } = useStore((state) => state);
  if (!isLoading) return <></>;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-white bg-opacity-40 backdrop-blur-sm shadow-lg">
      <div className="text-center">
        <SpinnerRoundFilled
          size={90}
          thickness={180}
          speed={97}
          still={false}
          color="rgba(57, 76, 172, 1)"
        />
      </div>
    </div>
  );
}

export default Loading;
