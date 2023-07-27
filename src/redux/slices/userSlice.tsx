import { createAsyncThunk, createSlice   } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  status: 'idle',
};

export const loginUser = createAsyncThunk('user/loginUser', async ({ name, email }: { name: string, email: string }) => {
  const response = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users`);
  const user = response.data.find((user) => (user.name === name || user.username === name) && user.email === email);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  return user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: { payload: User | undefined }) => {
  state.status = 'idle';
  state.user = action.payload ?? null;
});
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
