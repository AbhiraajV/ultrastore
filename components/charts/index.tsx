import { SizeBasedAnalysisData } from "@/utils/helpers/sizeBitsObject";
import React from "react";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  sizeBasedAnalysis: SizeBasedAnalysisData | undefined;
};

function ChartForSizeBasedAnalysis({ sizeBasedAnalysis }: Props) {
  if (!sizeBasedAnalysis) return <></>;
  return (
    <>
      <span className="md:pl-0 pl-5  text-[1rem] font-semibold pt-2">
        Graphical Representation
      </span>
      <div className="pt-4 flex md:flex-row flex-col md:w-[50%] w-[100%] gap-2">
        <BarChart sizeBasedAnalysisData={sizeBasedAnalysis} />
        <LineChart sizeBasedAnalysisData={sizeBasedAnalysis} />
      </div>
    </>
  );
}

export default ChartForSizeBasedAnalysis;
