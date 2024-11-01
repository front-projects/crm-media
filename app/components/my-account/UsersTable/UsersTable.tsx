/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, IconButton, Tooltip, darken, lighten } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type User } from './types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  deleteUserById,
  getUsers,
  setTeamLead,
  updateUserById,
} from './requests';
import RegisterUser from '../RegisterUser';
import { useSearchParams } from 'next/navigation';
import { MenuItem } from '@mui/material';
import { darkTheme } from '../../UI/darkTheme';

const UsersTableWithoutProvider = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }, []);

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 40,
      },
      {
        accessorKey: 'nickname',
        header: 'Nickname',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.nickname,
          helperText: validationErrors?.nickname,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'email',
        header: 'Login',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'role',
        header: 'ROLE',

        muiEditTextFieldProps: {
          required: true,
          select: true,
          error: !!validationErrors?.role,
          helperText: validationErrors?.role,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              role: undefined,
            }),
          children: [
            <MenuItem key="Buyer" value="Buyer">
              Buyer
            </MenuItem>,
            <MenuItem key="Team Lead" value="TEAM_LEAD">
              Team Lead
            </MenuItem>,
          ],
        },
        Cell: ({ row }) => {
          const role = row.getValue('role');
          return role == 'Buyer' ? (
            <div className="text-green-600 p-2 border-2 border-green-600 text-center rounded-md w-max">
              Buyer
            </div>
          ) : (
            <div className="text-red-600 p-2 border-2 border-red-600 text-center rounded-md w-max">
              Team Lead
            </div>
          );
        },
      },
      {
        accessorKey: 'lead',
        enableGrouping: true,
        accessorFn: (row) => (row.lead ? row.lead.nickname : 'No team-lead'),
        header: 'TEAM LEAD',
        Cell: ({ row }) => {
          const lead = row.original.lead as {
            nickname: string;
            id: string;
          } | null;
          const role = row.original.role;

          return role === 'TEAM_LEAD' ? (
            <div></div>
          ) : lead ? (
            <div>{lead.nickname}</div>
          ) : (
            <div className="text-gray-400/60">No team-lead</div>
          );
        },
        muiEditTextFieldProps: ({ table, row }) => {
          const allUsers = table.getRowModel().rows.map((row) => row.original); // Отримуємо всіх користувачів з таблиці
          const teamLeads = filterTeamLeads(allUsers); // Фільтруємо тільки тих, хто має роль TEAM_LEAD
          const currentLeadId = row.original.lead
            ? row.original.lead.id
            : 'none';
          return {
            select: true,
            defaultValue: currentLeadId,
            children: [
              <MenuItem key="none" value={'none'}>
                None
              </MenuItem>,
              ...teamLeads.map((lead: any) => (
                <MenuItem key={lead.id} value={lead.id}>
                  {lead.nickname}
                </MenuItem>
              )),
            ],
          };
        },
      },
    ],
    [validationErrors],
  );

  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    // Знайти лідера команди за id та додати його дані (nickname, id)
    const leadId = values.lead;
    if (leadId && leadId !== 'none') {
      const lead = findUserInTree(leadId, fetchedUsers);
      if (lead) {
        values.lead = { nickname: lead.nickname, id: lead.id };
      }
    }

    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };
  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableColumnPinning: true,
    enableEditing: true,
    enableExpanding: false,
    enableGrouping: true,
    //index where new row is inserted before
    getRowId: (row) => row.id,
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
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

  return <MaterialReactTable table={table} />;
};

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await getUsers();
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User | any) => {
      console.log(user);
      await updateUserById(user.id, user);
      if (user.lead) {
        await setTeamLead(user.id, user.lead.id);
      }

      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(['users'], (prevUsers: any) => {
        let user = findUserInTree(newUserInfo.id, prevUsers);
        user = { ...user, ...newUserInfo };
        return [...prevUsers];
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      await deleteUserById(userId);
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId: string) => {
      queryClient.setQueryData(['users'], (prevUsers: any) => {
        const newUsers: User[] = JSON.parse(JSON.stringify(prevUsers));
        //remove user
        const user = findUserInTree(userId, newUsers);
        if (user) {
          return newUsers.filter((user) => user.id !== userId);
        }
        return [...newUsers];
      });
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const UsersTable = () => {
  const searchParams = useSearchParams();
  const register = searchParams.get('register');

  //Put this with your other react-query providers near root of your app
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> {/* Це забезпечить базовий темний стиль */}
        <UsersTableWithoutProvider />
      </ThemeProvider>
      {register && <RegisterUser />}
    </QueryClientProvider>
  );
};

export default UsersTable;

const validateRequired = (value: string) => !!value.length;

function validateUser(user: User) {
  return {
    nickname: !validateRequired(user.nickname) ? 'Nickname is Required' : '',
    email: !validateRequired(user.email) ? 'Email is Required' : '',
  };
}

function findUserInTree(managerId: string | null, users: User[]): User | null {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === managerId) {
      return users[i];
    }
    // if (users[i].subRows) {
    //   const found = findUserInTree(managerId, users[i].subRows!);
    //   if (found) return found;
    // }
  }
  return null;
}

function filterTeamLeads(users: User[]): User[] {
  return users.filter((user) => user.role === 'TEAM_LEAD');
}
