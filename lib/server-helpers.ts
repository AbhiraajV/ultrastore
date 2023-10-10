import prisma from "./prisma";
export const ConnectToDB = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("Unable to connect to database");
  }
};
