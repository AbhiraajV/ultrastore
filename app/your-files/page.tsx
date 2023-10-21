import React from "react";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ServerControlledPagination from "./server-controlled-pagination";
import PaymentFormModalDialogue from "@/components/modal/PaymentFormModalDialogue";
import DeleteFileFormModalDialogue from "@/components/modal/DeleteFileModal";
type Props = {
  searchParams: any;
};

async function YourFiles({ searchParams }: Props) {
  let count = undefined;
  let profile = undefined;
  profile = !profile ? await currentProfile() : profile;
  count =
    count === undefined
      ? await prisma.file.count({
          where: {
            profileId: profile?.id,
          },
        })
      : count;
  let skip = parseInt(searchParams["skip"] as string, 10);
  let take = parseInt(searchParams["take"] as string, 10);
  let filter_name = searchParams["filter_name"];

  const files = await prisma.file.findMany({
    where: {
      profileId: profile?.id,
      name: {
        contains: filter_name,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    skip: !skip || !take ? 0 : skip * take,
    take: !take ? 5 : take,
  });
  return (
    <>
      <PaymentFormModalDialogue />
      <DeleteFileFormModalDialogue />
      <DataTable columns={columns} data={files} />
      <ServerControlledPagination count={count} curlen={files.length} />
    </>
  );
}

export default YourFiles;
