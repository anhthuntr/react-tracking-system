"use client";
import { MaintenanceRecord } from "@/app/interface/maintenanceRecord";
import { Equipment } from "@/app/interface/equipment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface MaintenanceTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  maintenanceData: MaintenanceRecord[];
  equipmentData: Equipment[];
}

export function MaintenanceActivities<TData, TValue>({
  columns,
  maintenanceData,
  equipmentData,
}: MaintenanceTableProps<TData, TValue>) {
  // get the 10 most recent activities
  const recent = maintenanceData
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);

  const table = useReactTable({
    data: recent as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w- full max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Recent Maintenance Activities</h2>
      <div className="flex items-center">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  // Get the record from the current row
                  const record = row.original as MaintenanceRecord;

                  // Find the corresponding equipment for this record
                  const equipment = equipmentData.find(
                    (e) => e.id === record.equipmentId
                  );

                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        // Custom logic for specific columns if needed
                        if (cell.column.id === "equipmentName") {
                          return (
                            <TableCell key={cell.id}>
                              {equipment?.name || "Unknown"}
                            </TableCell>
                          );
                        }

                        if (cell.column.id === "status") {
                          return (
                            <TableCell key={cell.id}>
                              {record.completionStatus}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                // No results found
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
    </div>
  );
}
