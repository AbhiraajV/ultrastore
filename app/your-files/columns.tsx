"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useStore from "@/hooks/useStore";
import { bitsToMbs, image_size } from "@/utils/helpers/sizeBitsObject";
import { File } from "@prisma/client";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Crown,
  DollarSign,
  Download,
  Info,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const ActionRender = ({ row }: { row: Row<File> }) => {
  "use client";
  const {
    togglePaymentModalOpen,
    updatePaymentState,
    toggleDeleteFileModalOpen,
    updateDeleteFileState,
    isDeleteFileModalOpen,
  } = useStore();

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
            <Trash
              size={15}
              onClick={() => {
                toggleDeleteFileModalOpen();
                updateDeleteFileState({
                  fileId: row.original.firestoreZipUrl,
                  userId: row.original.id,
                });
                console.log({ isDeleteFileModalOpen });
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete File</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DollarSign
              size={15}
              onClick={() => {
                togglePaymentModalOpen();
                updatePaymentState({
                  fileId: row.original.id,
                  userId: row.original.profileId,
                });
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Fund to Prioritize this file</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const NameRender = ({ row }: { row: Row<File> }) => {
  const router = useRouter();
  if (!router) return <></>;
  return (
    <div
      onClick={() => {
        console.log(row.original.name);
        router.push("/your-files/" + row.original.id);
        router.refresh();
      }}
      className="cursor-pointer w-[200px] hover:transform hover:scale-105 hover:font-bold hover:text-blue-500 transition-transform transition-font"
    >
      <span className=" lg:w-[60%] w-[100%] relative">
        {row.original.priority && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Crown
                  size={15}
                  color="blue"
                  className="absolute top-[-5px] left-[-10px] rotate-[-45deg]"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>This file has been prioritized!!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {row.original.name}
      </span>
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
    cell: ({ row }) => <ActionRender row={row} />,
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
    cell: ({ row }) => <NameRender row={row} />,
  },

  {
    accessorKey: "youtubeUrl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-xs w-[150px] font-bold">
          {row.original.youtubeUrl?.includes("__FIREBASE__:")
            ? "encoded & encrypted🔥"
            : row.original.youtubeUrl?.includes("__YOUTUBE_URL__:")
            ? "video is on youtube! 🎥"
            : "your file is being processed!"}
          {row.original.youtubeUrl?.includes("__FIREBASE__:") && (
            <div className="text-xs font-light">
              click on the file name to view generated video!
            </div>
          )}
          {row.original.youtubeUrl?.includes("__YOUTUBE_URL__:") && (
            <a
              href={`https://www.youtube.com/watch?v=${row.original.youtubeUrl.replace(
                "__YOUTUBE_URL__:",
                ""
              )}`}
              className="text-xs text-blue-300 hover:text-indigo-600 font-bold"
            >
              View
            </a>
          )}
        </div>
      );
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <DescriptionRender description={row.original.description} />;
    },
  },
  {
    accessorKey: "decodedFileFirestoreUrl",
    header: "Decoded Status",
  },
];
