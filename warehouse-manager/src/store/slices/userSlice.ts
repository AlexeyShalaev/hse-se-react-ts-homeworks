import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  group: string;
  avatar?: string;
}

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    group: 'Student',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfile: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
});

export const { updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
