import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { Checkbox, Table } from "flowbite-react";
import React from "react";

export default function DataTable({ data, columns }) {
  const sortedData = React.useMemo(() => [...data], [data]);
  const sortedColumns = React.useMemo(
    () => [
      {
        Header: "☑️",
        accessor: "",
        Cell: () => <Checkbox />,
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
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,

    setGlobalFilter,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    pageOptions,
    headerGroups,
    prepareRow,
    state,
  } = TableInstance;

  return (
    <div>
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
