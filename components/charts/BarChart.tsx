import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  ImageSizeObjectKeyType,
  SizeBasedAnalysisData,
} from "@/utils/helpers/sizeBitsObject";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Size of video formed in MBs",
    },
  },
};
export function BarChart({
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
        label: "Max possible size",
        data: labels.map((label) => sizeBasedAnalysisData[label].max_size),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Min possible size",
        data: labels.map((label) => -1 * sizeBasedAnalysisData[label].min_size),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
