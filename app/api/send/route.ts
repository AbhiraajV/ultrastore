import EmailTemplate from "@/components/email-template/EmailTemplate";
import { status } from "@grpc/grpc-js";
import { NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function POST(req: Request) {
  const { profile, file, uploaded_id } = await req.json();
  console.log({ profile, file, uploaded_id });
  try {
    const data = await resend.emails.send({
      from: "Ultrastore <onboarding@resend.dev>",
      to: ["abhiraajverma@gmail.com"],
      subject: "Ultrastore has sent you an update! 🚀",
      react: EmailTemplate({ profile, file }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
