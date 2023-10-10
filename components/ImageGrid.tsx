import { bitsToMbs } from "@/utils/helpers/sizeBitsObject";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import React from "react";
function ImageGrid({ blobs }: { blobs: Blob[] }) {
  if (blobs.length === 0) return <></>;
  return (
    <div className="flex flex-col gap-1 pt-2 md:pl-0 pl-5">
      <span className="text-[1rem] font-semibold pt-2">
        Generated Bitstream Maps
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[1]">
        {blobs &&
          blobs.map((blob, i) => (
            <div key={i} className="p-[-1] flex flex-col">
              <a
                href={URL.createObjectURL(blob)}
                download={`image_${i}.jpg`} // Set the desired filename here
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Image
                  src={URL.createObjectURL(blob)}
                  alt={"this is a blob"}
                  width={150}
                  height={150}
                />
              </a>
              <span className="font-semibold text-[0.8rem]">
                size: {parseFloat(bitsToMbs(blob.size).toFixed(3))} mbs
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

const MemoizedImageGrid = React.memo(ImageGrid);
export default MemoizedImageGrid;
