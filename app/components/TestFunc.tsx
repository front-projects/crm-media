import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';

export const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        header: 'Nickname',
        accessorKey: 'nickname',
      },
      {
        header: 'Login',
        accessorKey: 'email',
      },
      {
        header: 'Role',
        accessorKey: 'role',
      },
      {
        header: 'ID',
        accessorKey: 'id',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableStickyHeader: true,
    initialState: {
      density: 'compact',
      expanded: true,
      // grouping: ['state'],
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: 'state', desc: false }],
    },
    muiToolbarAlertBannerChipProps: { color: 'primary' },
    muiTableContainerProps: { sx: { maxHeight: 700 } },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
