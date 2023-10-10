"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  session?: Session;
  children: any;
};
export const Provider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
