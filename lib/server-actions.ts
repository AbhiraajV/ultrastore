"use server";

import prisma from "./prisma";
export const deleteFiles = async (ids: string[] | undefined) => {
  const response = await prisma.file.deleteMany({
    where: { id: { in: ids } },
  });
  console.log({ response });
  return response;
};
export const reqDownload = async (ids: string[] | undefined) => {
  const response = prisma.file.updateMany({
    where: {
      id: { in: ids },
      AND: {
        youtubeUrl: { not: undefined },
      },
    },
    data: {
      decodedFileFirestoreUrl: "STARTED",
    },
  });

  console.log({ response });
  return response;
};
