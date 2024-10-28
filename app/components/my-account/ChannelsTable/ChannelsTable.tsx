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
import { Box, IconButton, Tooltip, darken, lighten } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type Channel } from './types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  deleteChannelById,
  //   deleteUserById,
  getChannels,
  updateChannelById,
  //   setTeamLead,
  //   updateUserById,
} from './requests';
import RegisterChannel from './RegisterChannel';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9a56e3',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
});

const ChannelsTableWithoutProvider = ({
  role,
}: {
  role: string | undefined;
}) => {
  const columns = useMemo<MRT_ColumnDef<Channel>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 60,
        enableGrouping: false,
        enableColumnActions: false,
        enableSorting: false,
      },
      {
        accessorKey: 'title',
        header: 'Channel name',
        enableEditing: false,
      },
      {
        accessorKey: 'channelId',
        header: 'ID',
        enableEditing: false,
      },
      //   priceClick
      {
        header: 'priceClick',
        enableColumnActions: false,
        enableGrouping: false,
        enableEditing: false,
        size: 40,
      },

      {
        accessorKey: 'priceClick1',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-green-600 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-green-600 p-2 px-4 rounded-md">
              {row.original.priceClick1}
            </div>
          );
        },
      },
      {
        accessorKey: 'priceClick2',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-green-600/50 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-green-600/50 p-2 px-4 rounded-md">
              {row.original.priceClick2}
            </div>
          );
        },
      },
      {
        accessorKey: 'priceClick3',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-green-600/20 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-green-600/20 p-2 px-4 rounded-md">
              {row.original.priceClick3}
            </div>
          );
        },
      },
      {
        accessorKey: 'priceClick4',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-red-600/20 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-red-600/20 p-2 px-4 rounded-md">
              {row.original.priceClick4}
            </div>
          );
        },
      },
      {
        accessorKey: 'priceClick5',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-red-600/50 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-red-600/50 p-2 px-4 rounded-md">
              {row.original.priceClick5}
            </div>
          );
        },
      },
      {
        accessorKey: 'priceClick6',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-red-600 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-red-600 p-2 px-4 rounded-md">
              {row.original.priceClick6}
            </div>
          );
        },
      },
      {
        header: 'pricePDP',
        enableColumnActions: false,
        enableGrouping: false,
        enableEditing: false,
        size: 40,
      },

      {
        accessorKey: 'pricePDP1',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-green-600 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-green-600 p-2 px-4 rounded-md">
              {row.original.pricePDP1}
            </div>
          );
        },
      },
      {
        accessorKey: 'pricePDP2',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-green-600/50 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-green-600/50 p-2 px-4 rounded-md">
              {row.original.pricePDP2}
            </div>
          );
        },
      },
      {
        accessorKey: 'pricePDP3',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-green-600/20 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-green-600/20 p-2 px-4 rounded-md">
              {row.original.pricePDP3}
            </div>
          );
        },
      },
      {
        accessorKey: 'pricePDP4',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-red-600/20 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-red-600/20 p-2 px-4 rounded-md">
              {row.original.pricePDP4}
            </div>
          );
        },
      },
      {
        accessorKey: 'pricePDP5',
        header: '',
        muiEditTextFieldProps: {
          required: true,
          type: 'number',
          InputProps: {
            className:
              'bg-red-600/50 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-red-600/50 p-2 px-4 rounded-md">
              {row.original.pricePDP5}
            </div>
          );
        },
      },
      {
        accessorKey: 'pricePDP6',
        header: '',
        type: 'number',
        muiEditTextFieldProps: {
          required: true,
          InputProps: {
            className:
              'bg-red-600 py-1 pl-2 rounded-md w-[40px] text-white text-[11px]',
          },
        },
        enableColumnActions: false,
        enableGrouping: false,
        enableSorting: false,
        size: 40,
        Cell: ({ row }) => {
          //   const role = row.getValue('priceClick1');
          return (
            <div className="bg-red-600 p-2 px-4 rounded-md">
              {row.original.pricePDP6}
            </div>
          );
        },
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
  } = useGetChannels();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  const handleSaveUser: MRT_TableOptions<Channel>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Channel>) => {
    if (window.confirm('Are you sure you want to delete this channel?')) {
      deleteUser(row.original.id as any);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableColumnPinning: true,
    enableEditing: role == 'OWNER',
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
      sx: (theme) => ({
        td: {
          backgroundColor: darken(
            lighten(theme.palette.background.paper, 0.1),
            row.depth * (theme.palette.mode === 'dark' ? 0.2 : 0.1),
          ),
        },
      }),
    }),

    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, staticRowIndex, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    initialState: {
      columnPinning: { left: [], right: ['mrt-row-actions'] },
      expanded: true,
      pagination: { pageSize: 20, pageIndex: 0 },
    },
    state: {
      isLoading: isLoadingUsers,
      isSaving: isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

//READ hook (get users from api)
function useGetChannels() {
  return useQuery<Channel[]>({
    queryKey: ['channels'],
    queryFn: async () => {
      const response = await getChannels();
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}

//UPDATE hook (put user in api)
// function useUpdateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user: Channel | any) => {
//       await updateChannelById(user.id, user);
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (newUserInfo: any) => {
//       queryClient.setQueryData(['channels'], (prevUsers: any) => {
//         let user = findUserInTree(newUserInfo.id, prevUsers);
//         user = { ...user, ...newUserInfo };
//         return [...prevUsers];
//       });
//       return { newUserInfo }; // maybe fix
//     },
//     onSettled: () => queryClient.invalidateQueries({ queryKey: ['channels'] }), //refetch users after mutation, disabled for demo
//   });
// }
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Channel) => {
      await updateChannelById(user.id, user);
      return user;
    },
    onMutate: (newUserInfo) => {
      // Don't directly update state here; just prepare an optimistic update
      const previousChannels = queryClient.getQueryData<Channel[]>([
        'channels',
      ]);

      queryClient.setQueryData(['channels'], (oldData: any) => {
        return oldData?.map((channel: any) =>
          channel.id === newUserInfo.id
            ? { ...channel, ...newUserInfo }
            : channel,
        );
      });

      return { previousChannels };
    },
    onError: (error, newUserInfo, context) => {
      // If there was an error, roll back to the previous state
      if (context?.previousChannels) {
        queryClient.setQueryData(['channels'], context.previousChannels);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    },
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      console.log(userId);
      await deleteChannelById(userId);
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId: string) => {
      queryClient.setQueryData(['channels'], (prevUsers: any) => {
        const newUsers: Channel[] = JSON.parse(JSON.stringify(prevUsers));
        //remove user
        const user = findUserInTree(userId, newUsers);
        if (user) {
          return newUsers.filter((user) => user.id !== userId);
        }
        return [...newUsers];
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['channels'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ChannelsTable = ({ ROLE }: { ROLE: string | undefined }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterChannel />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> {/* Це забезпечить базовий темний стиль */}
        <ChannelsTableWithoutProvider role={ROLE} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default ChannelsTable;

const validateRequired = (value: string) => !!value.length;

function findUserInTree(
  managerId: string | null,
  users: Channel[],
): Channel | null {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === managerId) {
      return users[i];
    }
  }
  return null;
}
