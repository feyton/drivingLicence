import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { Table } from "flowbite-react";
import React from "react";

export default function DataTable({ data, columns }) {
  const sortedData = React.useMemo(() => [...data], [data]);
  const sortedColumns = React.useMemo(
    () => [
      {
        Header: "SN",
        accessor: "",
        Cell: ({ row }) => <>{row.index + 1}</>,
        sortable: false,
      },
      ...columns,
    ],
    [columns]
  );
  const TableInstance = useTable(
    {
      data: sortedData,
      columns: sortedColumns,
      initialState: { pageSize: 100 },
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    page,
    headerGroups,
    prepareRow,
    state,
  } = TableInstance;

  return (
    <div className="overflow-y-scroll w-full">
      <Table
        striped={true}
        hoverable={true}
        className="px-4 mb-5 w-full"
        {...getTableProps()}
      >
        {headerGroups.map((headerGroup) => (
          <Table.Head {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Table.HeadCell
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
              </Table.HeadCell>
            ))}
          </Table.Head>
        ))}
        <Table.Body {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Table.Row {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Table.Cell className="text-xs" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
