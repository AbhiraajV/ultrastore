import React from "react";
import prisma from "@/lib/prisma";
type Props = {
  conditions: { where: any };
  currentCount: number;
};

function TotalRowCount({ conditions, currentCount }: Props) {
  const count = prisma.file.count(conditions);
  return (
    <div className="flex-1 text-sm text-muted-foreground">
      {currentCount} of {count} row(s).
    </div>
  );
}

export default TotalRowCount;
