import { generateImagesFromBitstream } from "@/utils/toVideoFlow/GenerateImages";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { resolution, bitstream } = await request.json();
    const blobs = await generateImagesFromBitstream(bitstream, resolution);
    return NextResponse.json(blobs);
  } catch (error) {
    console.log("[BITSTREAM_IMAGES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
