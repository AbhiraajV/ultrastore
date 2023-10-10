import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  ImageSizeObjectKeyType,
  SizeBasedAnalysisData,
} from "@/utils/helpers/sizeBitsObject";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Number of images needed as per resolution",
    },
  },
};
export function LineChart({
  sizeBasedAnalysisData,
}: {
  sizeBasedAnalysisData: SizeBasedAnalysisData;
}) {
  const labels: ImageSizeObjectKeyType[] = Object.keys(
    sizeBasedAnalysisData
  ) as ImageSizeObjectKeyType[];

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Images Required",
        data: labels.map((label) => sizeBasedAnalysisData[label].imagesNeeded),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  console.log({ data });
  return <Line options={options} data={data} />;
}
