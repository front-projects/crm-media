'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import { darken, lighten } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Buyer } from './types';
import { darkTheme } from '../../UI/darkTheme';
import { useRouter, useSearchParams } from 'next/navigation';
import { getBuyers } from './requests';

const BuyersTableWithoutProvider = () => {
  const router = useRouter();
  const params = useSearchParams();

  const columns = useMemo<MRT_ColumnDef<Buyer>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableGrouping: false,
        enableColumnActions: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableGrouping: false,
        enableColumnActions: false,
        enableSorting: false,
      },
      {
        header: 'ROI',
        accessorKey: 'roi',
      },
      {
        header: 'Spend',
        accessorKey: 'spend',
      },
      {
        header: 'Budget',
        accessorKey: 'budget',
      },
      {
        header: 'Clicks amount',
        accessorKey: 'countClick',
      },
      {
        header: 'Click Price',
        accessorKey: 'priceClick',
      },
      {
        header: 'CRM',
        accessorKey: 'crm',
      },
      {
        header: 'FD Sum',
        accessorKey: 'sumFd',
      },
      {
        header: 'FD Count',
        accessorKey: 'countFd',
      },
      {
        header: 'RD Sum',
        accessorKey: 'sumRd',
      },
      {
        header: 'RD Count',
        accessorKey: 'countRd',
      },
    ],
    [],
  );

  const handleRowClick = (row: MRT_Row<Buyer>) => {
    const start = params.get('start');
    const end = params.get('end');

    const query = start && end ? `?start=${start}&end=${end}` : '';
    router.push(`/menu/dashboard/dashboards/${row.original.id}/${query}`);
  };

  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetBuyers();

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    enableColumnPinning: true,
    enableExpanding: false,
    enableGrouping: true,
    //index where new row is inserted before
    getRowId: (row) => String(row.id),
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        height: '70dvh',
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      //conditional styling based on row depth
      onClick: () => handleRowClick(row),
      sx: (theme) => ({
        td: {
          backgroundColor: darken(
            lighten(theme.palette.background.paper, 0.1),
            row.depth * (theme.palette.mode === 'dark' ? 0.2 : 0.1),
          ),
          cursor: 'pointer',
        },
      }),
    }),
    initialState: {
      columnPinning: { left: [] },
      expanded: true,
      pagination: { pageSize: 20, pageIndex: 0 },
    },
    state: {
      isLoading: isLoadingUsers,
      showAlertBanner: isLoadingUsersError,
      //   showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

//READ hook (get users from api)
function useGetBuyers() {
  return useQuery<Buyer[]>({
    queryKey: ['channels'],
    queryFn: async () => {
      const response = await getBuyers();
      return response;
      // return [
      //   { id: 1, name: 'Test' },
      //   { id: 2, name: 'Test2' },
      // ];
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}
const queryClient = new QueryClient();
const BuyersTable = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> {/* Це забезпечить базовий темний стиль */}
        <BuyersTableWithoutProvider />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default BuyersTable;
