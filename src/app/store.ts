import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../slices/postsSlice';
import viewReducer from '../slices/viewSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    view: viewReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
