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
import { darkTheme } from '../../UI/darkTheme';
import { useRouter, useSearchParams } from 'next/navigation';

const DashboardTableWithoutProvider = ({
  activeSection,
}: {
  activeSection: string;
}) => {
  console.log(activeSection);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
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
        accessorKey: 'campains',
        header: 'Campain',
      },
      {
        accessorKey: 'adsets',
        header: 'Ad set',
      },
      {
        accessorKey: 'ads',
        header: 'Ad',
      },
    ],
    [],
  );

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
        height: '60dvh',
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      //conditional styling based on row depth
      sx: (theme) => ({
        td: {
          backgroundColor: darken(
            lighten(theme.palette.background.paper, 0.1),
            row.depth * (theme.palette.mode === 'dark' ? 0.2 : 0.1),
          ),
        },
      }),
    }),
    initialState: {
      expanded: true,
      pagination: { pageSize: 20, pageIndex: 0 },
    },
    state: {
      columnPinning: { left: activeSection ? [activeSection] : [] },
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
  return useQuery<any[]>({
    queryKey: ['channels'],
    queryFn: async () => {
      //   const response = await getChannels();
      //   return response;
      return [{ name: 'Test', id: 1 }];
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}
const queryClient = new QueryClient();
const DashboardTable = ({ activeSection }: { activeSection: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> {/* Це забезпечить базовий темний стиль */}
        <DashboardTableWithoutProvider activeSection={activeSection} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default DashboardTable;
