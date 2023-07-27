import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface CommentUser {
  id: number;
  name: string;
}

interface UserState {
  user: CommentUser | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

export const fetchCommentUser = createAsyncThunk<CommentUser, number, {}>(
  'user/fetchUser',
  async (userId, thunkAPI) => {
    try {
      userId = userId > 10 ? 1 : userId;
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(`Error: User not found`);
      }
      return response.data;
    } catch (err) {
      const error: Error = err as Error;
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);


export const CommentUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCommentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default CommentUserSlice.reducer;