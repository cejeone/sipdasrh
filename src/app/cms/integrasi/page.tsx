"use client";

import { useMemo, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import { columns } from "./components/columns";

import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, ChevronDown, Settings2Icon, Plus, Trash2Icon, Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Integrasi, IntegrasiResponse } from "@/model/admin/integrasi/Integrasi";
import { ApiResponse } from "@/model/ApiResponse";
import useSWR from "swr";
import { fetcherPepdas } from "lib/fetcher";
import { deleteIntegrasi } from "./lib/action";
import { toast } from "sonner";

export default function IntegrasiPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchBy, setSearchBy] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState("");

  const swrKey = useMemo(() => {
    const params = new URLSearchParams({ page: pageIndex.toString(), size: pageSize.toString() });
    if (searchBy && searchValue) {
      params.set(searchBy, searchValue);
    }
    return `/integrasi?${params.toString()}`;
  }, [pageIndex, pageSize, searchBy, searchValue]);

  const { data: currentData, isLoading, mutate } = useSWR<ApiResponse<IntegrasiResponse>>(swrKey, fetcherPepdas);

  const integrasiList: Integrasi[] = currentData?._embedded?.integrasiList ?? [];
  const totalPages = currentData?.page?.totalPages ?? 1;
  const totalElements = currentData?.page?.totalElements ?? 0;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedRowIds, setSelectedRowIds] = useState<Record<string, boolean>>({});
  const table = useReactTable({
    data: integrasiList,
    columns,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      columnFilters,
      columnVisibility,
      rowSelection: selectedRowIds,
    },
    manualPagination: true,
    onRowSelectionChange: setSelectedRowIds,
    getRowId: (row) => row.id,
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleDeleteSelected = async () => {
    try {
      const idsToDelete = selectedRows.map((row) => row.original.id);
      await Promise.all(idsToDelete.map((id) => deleteIntegrasi(id)));
      await mutate();
      setSelectedRowIds({});
      toast.success("Data berhasil dihapus");
    } catch (err) {
      console.error("Gagal menghapus dokumen:", err);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Breadcrumbs items={[]} />
              <div className="flex items-center gap-2 text-secondary-green">
                <Link2 />
                <h1 className="text-2xl font-bold ">Integrasi</h1>
              </div>
              <p className="text-sm text-base-gray">Informasi terkait data integrasi</p>
            </div>
            <Link href="integrasi/create">
              <Button variant="green">
                <Plus />
                Tambah Data
              </Button>
            </Link>
          </div>
        </div>
        <hr />

        {/* Table Content */}
        <main className="overflow-auto">
          <div className="w-full">
            <div className="flex items-center justify-between py-4">
              <div className="flex gap-3 items-center">
                {/* filtering */}
                <Select key={searchBy ?? "empty"} value={searchBy ?? undefined} onValueChange={(val) => setSearchBy(val)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cari berdasarkan" />
                  </SelectTrigger>
                  <SelectContent>
                    {table
                      .getAllColumns()
                      .filter((col) => col.getCanHide() && col.id !== "actions")
                      .map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.id}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Input placeholder="Cari..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="max-w-sm" />

                {(searchBy || searchValue) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchBy(undefined);
                      setSearchValue("");
                    }}>
                    Reset
                  </Button>
                )}
              </div>

              <div className="menu-right flex gap-3">
                {selectedRows.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="text-white text-left">
                        <Trash2Icon className="text-white mr-2" /> Hapus
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Yakin ingin menghapus {selectedRows.length} data?</AlertDialogTitle>
                        <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction className="bg-base-destructive text-white hover:bg-destructive/90" onClick={handleDeleteSelected}>
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                <Button variant="outline" className="icon ">
                  <Settings2Icon /> Status
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Settings2Icon /> View <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <small className="font-bold">Tampilkan Kolom</small>
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center h-24">
                        Loading data...
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center h-24">
                        Tidak ditemukan data terkait.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} dari {table.getFilteredRowModel().rows.length} baris dipilih.
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <span>Baris per halaman</span>
                  <Select value={table.getState().pagination.pageSize.toString()} onValueChange={(v) => table.setPageSize(Number(v))}>
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 30, 40, 50].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <span>
                  Halaman {pageIndex + 1} dari {totalPages}
                </span>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="icon" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
