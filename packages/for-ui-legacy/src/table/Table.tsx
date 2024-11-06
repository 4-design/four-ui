import {
  FC,
  forwardRef,
  Fragment,
  MouseEvent,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowData,
  RowSelectionState,
  Row as RowType,
  SortingState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { Checkbox } from '../checkbox';
import { Radio } from '../radio';
import { Skeleton } from '../skeleton';
import { fsx } from '../system/fsx';
import { Text } from '../text';
import { ColumnDef } from './ColumnDef';
import { SortableTableCellHead, TableCell } from './TableCell';
import { TablePagination } from './TablePagination';

export type TableProps<T extends RowData> = Pick<TableOptions<T>, 'columns' | 'getRowId'> & {
  disablePagination?: boolean | undefined;
  defaultSortColumn?: ColumnSort;
  /** onRowClick is called when each row is clicked regardless of the type of table (selectable or not) */
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: RowType<T>) => void;
  /** The component used to render reach row. By default, Row is used. */
  rowRenderer?: FC<RowProps<T>>;
  className?: string;
  page?: number;
  pageCount?: number;
  pageSize?: number;
  defaultPage?: number;
  onChangePage?: (page: number) => void;
} & (
    | {
        /** If wanting to use selectable table, specify _onSelectRow_ or _onSelectRows_ exclusively */
        onSelectRow?: ((id: string | undefined) => void) | undefined;
        defaultSelectedRow?: string;
        onSelectRows?: never;
        defaultSelectedRows?: never;
      }
    | {
        onSelectRow?: never;
        defaultSelectedRow?: never;
        /** If wanting to use selectable table, specify _onSelectRow_ or _onSelectRows_ exclusively */
        onSelectRows?: ((ids: string[]) => void) | undefined;
        defaultSelectedRows?: string[];
      }
  ) &
  (
    | {
        /**
         * 読み込み中であることを示す時に指定
         *
         * @default false
         */
        loading?: false | undefined;

        /**
         * 読み込み中であることを示す時にスケルトンローディングで表示する行数を指定
         *
         * @default 10
         */
        loadingRows?: never;
        data: TableOptions<T>['data'];
      }
    | {
        /**
         * 読み込み中であることを示す時に指定
         *
         * @default false
         */
        loading: true;

        /**
         * 読み込み中であることを示す時にスケルトンローディングで表示する行数を指定
         *
         * @default 10
         */
        loadingRows: number;
        data?: never;
      }
  );

const getSelectColumn = <T extends RowData>({
  id,
  multiple,
  loading,
  onSelectRow,
}: {
  id: string;
  multiple?: boolean;
  loading?: boolean;
  onSelectRow?: (row: RowType<T>) => void;
}): ColumnDef<T> => {
  return {
    id,
    meta: {
      minWidth: '20px',
      width: '20px',
      maxWidth: '20px',
    },
    header: ({ table }) => (
      <Fragment>
        {multiple && (
          <Checkbox
            label={
              <Text aria-hidden={false} className={fsx(`hidden`)}>
                すべての行を選択
              </Text>
            }
            disabled={loading}
            className={fsx(`flex`)}
            checked={table.getIsAllRowsSelected()}
            indeterminate={!table.getIsAllRowsSelected() && table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        )}
      </Fragment>
    ),
    cell: ({ row }) => (
      <TableCell as="th" scope="row">
        {multiple ? (
          <Checkbox
            label={
              <Text aria-hidden={false} className={fsx(`hidden`)}>
                行を選択
              </Text>
            }
            disabled={loading}
            className={fsx(`flex`)}
            checked={row.getIsSelected()}
            onClick={(e) => {
              onSelectRow?.(row);
              e.stopPropagation();
            }}
          />
        ) : (
          <Radio
            label={
              <Text aria-hidden={false} className={fsx(`hidden`)}>
                行を選択
              </Text>
            }
            disabled={loading}
            className={fsx(`flex`)}
            checked={row.getIsSelected()}
            onClick={(e) => {
              onSelectRow?.(row);
              e.stopPropagation();
            }}
          />
        )}
      </TableCell>
    ),
  };
};

const makeColumnsLoading = <T extends RowData>(columns: ColumnDef<T>[]) =>
  columns.map((column) => ({
    ...column,
    cell: () => (
      <TableCell>
        <Skeleton variant="rounded" loading className="flex h-6 w-full" />
      </TableCell>
    ),
  }));

export const Table = <T extends RowData>({
  data,
  disablePagination,
  defaultSortColumn,
  defaultSelectedRow,
  defaultSelectedRows,
  onSelectRow,
  onSelectRows,
  onRowClick,
  rowRenderer,
  getRowId,
  columns: passedColumns,
  pageCount,
  pageSize = 20,
  className,
  page,
  defaultPage = 1,
  onChangePage,
  loading,
  loadingRows = 10,
}: TableProps<T>) => {
  const tableId = useId();
  const [sorting, setSorting] = useState<SortingState>(defaultSortColumn ? [defaultSortColumn] : []);

  const defaultRowSelection = defaultSelectedRow
    ? { [defaultSelectedRow]: true }
    : (defaultSelectedRows || []).reduce((acc, id) => ({ ...acc, [id]: true }), {});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(defaultRowSelection);
  const prevRowSelection = useRef<RowSelectionState>({});

  const selectable = !!(onSelectRow || onSelectRows);

  const onRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(
    (updater) => {
      // updater is designed to be passed to setState like `setState((prev) => updater(prev))`
      // However, due to the React "state is snapshot" design, it is hard to get current selection without using rowSelection.
      // This may lead to some bugs if setting state several times in 1 rendering.
      const row: RowSelectionState = typeof updater === 'function' ? updater(rowSelection) : updater;
      // If the same row is selected (when single selectable table), skip it
      if (prevRowSelection.current === row) {
        return;
      }
      setRowSelection(row);
      prevRowSelection.current = row;
      const selectedIds = Object.keys(row);
      onSelectRow?.(selectedIds[0]);
      onSelectRows?.(selectedIds);
    },
    [rowSelection, onSelectRow, onSelectRows],
  );

  const selectRow = useCallback(
    (row: RowType<T>) => {
      // If multiple seletable table, using toggle. Otherwise (singly selectable table) not using toggle.
      row.toggleSelected(onSelectRows ? undefined : true);
    },
    [onSelectRows],
  );

  const RowComponent: FC<RowProps<T>> = rowRenderer || Row;

  const loadingDummyData = Array(loadingRows).fill(
    Object.fromEntries(
      passedColumns.map((column) => [column.id || ('accessorKey' in column && column.accessorKey), '']),
    ),
  );

  const columns = useMemo(() => {
    if (!selectable && !loading) {
      return passedColumns;
    }
    const cols = loading ? makeColumnsLoading(passedColumns) : passedColumns;
    if (!selectable) {
      return cols;
    }
    const selectColumn = getSelectColumn({
      id: `${tableId}-select`,
      multiple: !!onSelectRows,
      loading,
      onSelectRow: selectRow,
    });
    return [selectColumn, ...cols];
  }, [tableId, onSelectRows, loading, selectRow, passedColumns, selectable]);

  const table = useReactTable({
    data: loading ? loadingDummyData : data,
    columns,
    pageCount: disablePagination ? undefined : pageCount,
    state: {
      sorting,
      rowSelection,
    },
    getRowId,
    onRowSelectionChange: loading ? undefined : onRowSelectionChange,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: !disablePagination ? getPaginationRowModel() : undefined,
    enableRowSelection: selectable,
    enableMultiRowSelection: !!onSelectRows,
  });

  useLayoutEffect(() => {
    table.setPageSize(pageSize);
  }, [table, pageSize]);

  return (
    <div className={fsx(`flex flex-col gap-2`, className)}>
      <TableFrame id={tableId} aria-busy={loading}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="table-row">
              {headerGroup.headers.map((header) => (
                <SortableTableCellHead
                  key={header.id}
                  scope="col"
                  disabled={loading}
                  nextSortingOrder={header.column.getNextSortingOrder()}
                  sortable={header.column.getCanSort()}
                  sorted={header.column.getIsSorted()}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    width: header.column.columnDef.meta?.width,
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </SortableTableCellHead>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <RowComponent
              key={row.id}
              row={row}
              selectable={selectable}
              onClick={
                (onSelectRow || onSelectRows || onRowClick) &&
                ((e, row) => {
                  selectRow(row);
                  onRowClick?.(e, row);
                })
              }
            />
          ))}
        </TableBody>
      </TableFrame>
      {!disablePagination && (
        <div className={fsx(`flex w-full justify-center`)}>
          <TablePagination
            disabled={loading}
            page={page}
            defaultPage={defaultPage}
            onChangePage={onChangePage}
            table={table}
            aria-controls={tableId}
          />
        </div>
      )}
    </div>
  );
};

export const TableFrame = forwardRef<HTMLTableElement, JSX.IntrinsicElements['table']>(
  ({ className, ...props }, ref) => (
    <div className={fsx(`border-shade-light-default h-full w-full overflow-auto rounded border`, className)}>
      <table
        className={fsx(
          `ring-shade-light-default w-full border-separate border-spacing-0 ring-1 aria-[busy=true]:pointer-events-none`,
        )}
        ref={ref}
        {...props}
      />
    </div>
  ),
);

export const TableBody = forwardRef<HTMLTableSectionElement, JSX.IntrinsicElements['tbody']>(
  ({ className, ...props }, ref) => (
    <tbody className={fsx(`text-shade-dark-default bg-shade-white-default`, className)} ref={ref} {...props} />
  ),
);

export const TableHead = forwardRef<HTMLTableSectionElement, JSX.IntrinsicElements['thead']>(
  ({ className, ...props }, ref) => (
    <thead
      className={fsx(
        `bg-shade-light-default border-shade-light-default z-table sticky top-0 table-header-group border-b`,
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

export const TableRow = forwardRef<HTMLTableRowElement, JSX.IntrinsicElements['tr']>(({ className, ...props }, ref) => (
  <tr
    className={fsx(
      `table-row [&:first-of-type>td]:border-t-0 [&:first-of-type>th]:border-t-0 [thead>&:last-of-type>td]:border-b [thead>&:last-of-type>th]:border-b`,
      className,
    )}
    ref={ref}
    {...props}
  />
));

export type RowProps<T extends RowData> = {
  row: RowType<T>;
  selectable: boolean;
  clickable?: boolean;
  onClick?: (e: MouseEvent<HTMLTableRowElement>, row: RowType<T>) => void;
  className?: string;
};

export const Row = <T extends RowData>({ row, selectable, onClick, className }: RowProps<T>) => (
  <TableRow
    key={row.id}
    className={fsx([
      `transition-[background] duration-100`,
      (selectable || onClick) && 'hover:bg-shade-light-default cursor-pointer',
      className,
    ])}
    onClick={(e) => onClick?.(e, row)}
  >
    {row.getVisibleCells().map((cell) => (
      <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>
    ))}
  </TableRow>
);

export { createColumnHelper } from '@tanstack/react-table';
