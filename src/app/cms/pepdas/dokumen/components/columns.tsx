"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PencilIcon, InfoIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dokumen } from "@/model/pepdas/Dokumen";
import Delete from "./delete";
import { mutate } from "swr";

export const columns: ColumnDef<Dokumen>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "No",
    id: "rowNumber",
    enableSorting: false,
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      const sortedRows = table.getSortedRowModel().rows;
      const indexInSortedData = sortedRows.findIndex((r) => r.id === row.id);
      const globalIndex = pageIndex * pageSize + indexInSortedData + 1;
      return <span>{globalIndex}</span>;
    },
  },
  {
    accessorKey: "namaDokumen",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        NAMA DOKUMEN <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "tipe",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        TIPE <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        STATUS <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rawStatus = row.getValue("status");
      const status = typeof rawStatus === "string" ? rawStatus : "Draft";

      const statusColor: Record<"Publikasi" | "Draft", string> = {
        Publikasi: "bg-secondary-green text-white",
        Draft: "bg-yellow-500 text-white",
      };

      const color = statusColor[status as "Publikasi" | "Draft"] ?? "bg-gray-300 text-gray-800";

      return <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${color}`}>{status}</span>;
    },
  },
  {
    id: "actions",
    header: "AKSI",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/cms/pepdas/dokumen/edit/${id}`}>
                <PencilIcon className="mr-2" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/cms/pepdas/dokumen/detail/${id}`}>
                <InfoIcon className="mr-2" /> Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Delete id={id} mutateDokumen={() => mutate("/dokumen")} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
