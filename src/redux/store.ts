import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import productReducer from './slices/product.slice'; 
import commentsReducer from './slices/comments.slice';
import commentUserReducer from './slices/commentUser.slice'

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