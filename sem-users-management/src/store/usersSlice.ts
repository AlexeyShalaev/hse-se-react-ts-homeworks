import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface User {
  id: number;
  name: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    { id: 1, name: 'Алексей Шалаев' },
    { id: 2, name: 'Иван Иванов' },
    { id: 3, name: 'Петр Петров' },
  ],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const user = state.users.find((u) => u.id === action.payload.id);
      if (user) {
        user.name = action.payload.name;
      }
    },
  },
});

export const { updateUserName } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer;