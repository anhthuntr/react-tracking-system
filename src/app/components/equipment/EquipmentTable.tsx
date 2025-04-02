/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EquipmentForm from "./EquipmentForm";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Equipment } from "@/app/interface/equipment";
import { equipmentData } from "@/app/api/data";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function EquipmentTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [filtering, setFiltering] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableData, setTableData] = React.useState<Equipment[]>(equipmentData);
  const table = useReactTable({
    data: tableData as TData[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      globalFilter: filtering,
      rowSelection,
    },
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const updateStatus = (status: Equipment["status"]) => {
    setTableData((prevData) =>
      prevData.map((item) => {
        const equipmentItem = item as Equipment;
        return table
          .getSelectedRowModel()
          .rows.some(
            (row) => (row.original as Equipment).id === equipmentItem.id
          )
          ? { ...equipmentItem, status }
          : equipmentItem;
      })
    );
    setRowSelection({}); // reset selection
  };
  const STATUS_OPTIONS: Equipment["status"][] = [
    "Operational",
    "Down",
    "Maintenance",
    "Retired",
  ];
  //console.log(Object.values(table.getSelectedRowModel().rowsById).map(item => item.original))
  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Filter by Name, Location, Model,..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg"
        />
        <Button onClick={() => setOpen(true)} size="icon" className="ml-3">
          <Plus />
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new equipment</DialogTitle>{" "}
            </DialogHeader>
            <EquipmentForm onClose={handleClose} />
          </DialogContent>
        </Dialog>
        <div className="ml-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Update Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {STATUS_OPTIONS.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => updateStatus(status)}
                >
                  {" "}
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center">
        <div className="rounded-md border">
          <Table>
            {/* Table Header */}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex-1 text-sm text-muted-foreground py-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
