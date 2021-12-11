import { configureStore, createAsyncThunk, ThunkAction, Action, AsyncThunkPayloadCreator, AsyncThunkOptions, AsyncThunk } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
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
export function createAsyncAppThunk<Returned, ThunkArg = void>(typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, {state: RootState}>, options?: AsyncThunkOptions<ThunkArg, {state: RootState}>): AsyncThunk<Returned, ThunkArg, {state: RootState}>
{
    return createAsyncThunk(typePrefix, payloadCreator, options)
}
