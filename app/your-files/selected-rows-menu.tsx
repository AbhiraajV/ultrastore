import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

interface SelectedRowActionsProps<TData> {
  table: Table<TData>;
}
export function SelectedRowActions<TData>({
  table,
}: SelectedRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>
          Action {table.getFilteredSelectedRowModel().rows.length} file(s)
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-sm">Delete all</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">
          {" "}
          Request Download
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
