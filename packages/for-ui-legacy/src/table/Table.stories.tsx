import React, { ReactNode, useState } from 'react';
import { MdMoreVert, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Badge } from '../badge';
import { Button } from '../button';
import { Menu, MenuItem } from '../menu';
import { Select } from '../select';
import { Text } from '../text';
import { PersonData, StaticPersonData } from '../utils/makeData';
import { ColumnDef } from './ColumnDef';
import { Table, TableBody, TableFrame, TableHead, TableRow } from './Table';
import { TableCell } from './TableCell';
import { Pagination } from './TablePagination';
import { TableScroller } from './TableScroller';

export default {
  title: 'Data Display / Table',
  component: Table,
} as Meta;

const columns: ColumnDef<PersonData, ReactNode>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    meta: {
      width: '16px',
    },
    cell: (cell) => <TableCell>{cell.renderValue()}</TableCell>,
  },
  {
    header: '名前',
    accessorKey: 'firstName',
    cell: (cell) => <TableCell>{cell.renderValue()}</TableCell>,
  },
  {
    header: '年齢',
    accessorKey: 'age',
    cell: (cell) => <TableCell>{cell.renderValue()}</TableCell>,
  },
  {
    header: '訪問',
    accessorKey: 'visits',
    cell: (cell) => <TableCell>{cell.renderValue()}</TableCell>,
  },
];

export const Base: Story = () => <Table<PersonData> columns={columns} data={StaticPersonData} />;

export const Loading: Story = () => <Table<PersonData> loading loadingRows={20} columns={columns} />;

export const LoadingWithSelect: Story = () => (
  <Table<PersonData>
    loading
    loadingRows={10}
    columns={columns}
    getRowId={(row) => row.id.toString()}
    onSelectRow={(row) => console.info('Selected row: ', row)}
  />
);

export const WithSelect: Story = () => (
  <Table<PersonData>
    columns={columns}
    data={StaticPersonData}
    getRowId={(row) => row.id.toString()}
    defaultSelectedRow="2"
    onSelectRow={(row) => console.info('Selected row: ', row)}
  />
);

export const WithSelectMultiple: Story = () => (
  <Table<PersonData>
    columns={columns}
    data={StaticPersonData}
    getRowId={(row) => row.id.toString()}
    defaultSelectedRows={['2', '3', '4']}
    onSelectRows={(rows) => console.info('Selected rows: ', rows)}
  />
);

export const WithDefaultSort: Story = () => (
  <Table<PersonData>
    columns={columns}
    data={StaticPersonData}
    defaultSortColumn={{
      id: 'id',
      desc: true,
    }}
  />
);

export const WithDisablePagination: Story = () => (
  <Table<PersonData> columns={columns} data={StaticPersonData} disablePagination />
);

export const WithTableScroller: Story = () => (
  <TableScroller height={500}>
    <Table<PersonData> columns={columns} data={StaticPersonData} disablePagination />
  </TableScroller>
);

export const WithTablePageSize: Story = () => (
  <Table<PersonData> columns={columns} data={StaticPersonData} pageSize={10} />
);

export const WithTablePage: Story = () => {
  const usePagination = (limit = 10) => {
    const [page, setPage] = useState(1);

    const offset = (page - 1) * limit;
    const next = () => setPage(page + 1);
    const prev = () => setPage(page - 1);
    const onChange = (p: number) => {
      if (p === page) return;

      setPage(p);
    };

    return {
      page,
      limit,
      offset,
      actions: {
        next,
        prev,
        onChange,
      },
    };
  };

  const { page, limit, offset, actions } = usePagination();
  const data = StaticPersonData.slice(offset, page * limit);
  const pageCount = Math.ceil(StaticPersonData.length / limit);

  return (
    <Table<PersonData>
      columns={columns}
      data={data}
      page={page}
      pageSize={limit}
      pageCount={pageCount}
      onChangePage={actions.onChange}
    />
  );
};

export const WithTablePageCount: Story = () => {
  return <Table<PersonData> columns={columns} data={StaticPersonData} pageSize={10} pageCount={2} />;
};

export const WithClickRow: Story = () => (
  <Table<PersonData>
    columns={columns}
    data={StaticPersonData}
    disablePagination
    onRowClick={(_, row) => {
      console.info(row);
    }}
  />
);

export const WithoutReactTable: Story = () => (
  <TableFrame className="">
    <TableHead>
      <TableRow>
        <TableCell as="th">出版社</TableCell>
        <TableCell as="th">本</TableCell>
        <TableCell as="th">状態</TableCell>
        <TableCell as="th" aria-label="アクション"></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>東京大学出版会</TableCell>
        <TableCell>記号と再帰</TableCell>
        <TableCell className="w-64">
          <Select
            name="state"
            size="medium"
            options={[
              { label: '在庫あり', inputValue: 'available' },
              { label: '貸出中', inputValue: 'unavailable' },
            ]}
            defaultValue={{ label: '貸出中', inputValue: 'unavailable' }}
          />
        </TableCell>
        <TableCell className="w-4">
          <Menu
            TriggerComponent={
              <Button intention="shade" size="small" variant="text">
                <MdMoreVert />
              </Button>
            }
          >
            <MenuItem icon={<MdOutlineEdit />}>編集</MenuItem>
            <MenuItem icon={<MdOutlineDelete />} intention="negative">
              削除
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell rowSpan={2}>技術評論社</TableCell>
        <TableCell>
          <Text className="flex gap-1">
            オブジェクト指向UIデザイン
            <Badge intention="primary" variant="outlined" label="必読" />
          </Text>
        </TableCell>
        <TableCell className="w-64">
          <Select
            name="state"
            size="medium"
            options={[
              { label: '在庫あり', inputValue: 'available' },
              { label: '貸出中', inputValue: 'unavailable' },
            ]}
            defaultValue={{ label: '貸出中', inputValue: 'unavailable' }}
          />
        </TableCell>
        <TableCell className="w-4">
          <Menu
            TriggerComponent={
              <Button intention="shade" size="small" variant="text">
                <MdMoreVert />
              </Button>
            }
          >
            <MenuItem icon={<MdOutlineEdit />}>編集</MenuItem>
            <MenuItem icon={<MdOutlineDelete />} intention="negative">
              削除
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Webアプリケーションアクセシビリティ</TableCell>
        <TableCell className="w-64">
          <Select
            name="state"
            size="medium"
            options={[
              { label: '在庫あり', inputValue: 'available' },
              { label: '貸出中', inputValue: 'unavailable' },
            ]}
            defaultValue={{ label: '在庫あり', inputValue: 'available' }}
          />
        </TableCell>
        <TableCell className="w-4">
          <Menu
            TriggerComponent={
              <Button intention="shade" size="small" variant="text">
                <MdMoreVert />
              </Button>
            }
          >
            <MenuItem icon={<MdOutlineEdit />}>編集</MenuItem>
            <MenuItem icon={<MdOutlineDelete />} intention="negative">
              削除
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    </TableBody>
  </TableFrame>
);

export const _Pagination: Story = () => <Pagination total={100} defaultPage={50} />;
