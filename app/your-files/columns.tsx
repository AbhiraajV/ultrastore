"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteFiles } from "@/lib/server-actions";
import { bitsToMbs, image_size } from "@/utils/helpers/sizeBitsObject";
import { File } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Delete,
  DollarSign,
  Download,
  Info,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useState } from "react";
const DescriptionRender = ({ description }: { description: string }) => {
  const [toggleShorten, setToggleShorten] = useState(true);
  return (
    <div
      className="w-[300px] fon cursor-pointer"
      onClick={() => setToggleShorten(!toggleShorten)}
    >
      {toggleShorten ? description.slice(0, 80) + "..." : description}
    </div>
  );
};
export const columns: ColumnDef<File>[] = [
  {
    id: "select",
    header: () => (
      <div className="flex justify-center items-center gap-1">
        Action
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info size={15} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Hover on action buttons for more info</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px] flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Download size={15} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Request Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Trash size={15} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DollarSign size={15} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Fund to Prioritize this file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="w-[200px] fon">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <DescriptionRender description={row.original.description} />;
    },
  },
  {
    accessorKey: "fileSize",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Details
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-xs w-[150px]">
          {row.original.fileType} <br />
          {bitsToMbs(row.original.fileSize)} MBs
          <br />
          {image_size[row.original.resolution].common_name}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdDate: string = new Date(
        row.original.createdAt.toISOString()
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const updatedDate: string = new Date(
        row.original.updatedAt.toISOString()
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return (
        <div className="text-xs w-[150px]">
          {"Created On: " + createdDate} <br /> {"Updated On: " + updatedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "youtubeUrl",
    header: "Youtube Upload Status",
  },
  {
    accessorKey: "decodedFileFirestoreUrl",
    header: "Decoded Status",
  },
];
