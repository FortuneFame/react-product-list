import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice'; 
import commentsReducer from './slices/commentsSlice';
import commentUserReducer from './slices/commentUserSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer, 
    comments: commentsReducer,
    commentUser: commentUserReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;