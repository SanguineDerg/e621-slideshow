import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer, { clear as clearPosts } from '../slices/postsSlice';
import settingsSlice, { getLocalStorageSettings } from '../slices/settingsSlice';
import accountsReducer, { getLocalStorageAccounts } from '../slices/accountsSlice';
import setSlice, { clear as clearSets } from '../slices/setSlice';
import viewReducer from '../slices/viewSlice';
import tutorialSlice, { getLocalStorageTutorial } from '../slices/tutorialSlice';
import usersSlice, { clear as clearUsers, fetchCurrentUser } from '../slices/usersSlice';
import { fetchManagedSets, fetchWorkingSet } from '../slices/setSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    posts: postsReducer,
    sets: setSlice,
    settings: settingsSlice,
    tutorial: tutorialSlice,
    users: usersSlice,
    view: viewReducer,
  },
  preloadedState: {
    accounts: getLocalStorageAccounts(),
    settings: getLocalStorageSettings(),
    tutorial: getLocalStorageTutorial(),
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

export const refreshAccountBasedState = (dispatch: AppDispatch) => {
  dispatch(clearPosts());
  dispatch(clearSets());
  dispatch(clearUsers());
  dispatch(fetchManagedSets());
  dispatch(fetchWorkingSet());
  dispatch(fetchCurrentUser());
}
