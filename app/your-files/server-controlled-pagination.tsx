"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  count: number;
  curlen: number;
};

function ServerControlledPagination({ count, curlen }: Props) {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const pathname = usePathname();
  const [take, setTake] = useState(5);
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("take", take + "");
    params.set("skip", skip + "");
    router.push(pathname + "?" + params.toString());
  }, [take, skip, searchParams, router, pathname]);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {curlen} of {count} row(s).
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${take}`}
            onValueChange={(value) => {
              setTake(Number(value));
              setSkip(0);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={1} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {skip + 1} of {Math.ceil(count / take)}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setSkip(0)}
            disabled={skip === 0}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setSkip((prev) => prev - 1)}
            disabled={skip === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setSkip((prev) => prev + 1)}
            disabled={skip === Math.ceil(count / take)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setSkip((prev) => Math.ceil(count / take))}
            disabled={skip === Math.ceil(count / take)}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ServerControlledPagination;
