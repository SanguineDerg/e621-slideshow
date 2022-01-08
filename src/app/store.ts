import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../slices/postsSlice';
import settingsSlice, { getLocalStorageSettings } from '../slices/settingsSlice';
import setSlice, { getLocalStorageSets } from '../slices/setSlice';
import viewReducer from '../slices/viewSlice';
import tutorialSlice, { getLocalStorageTutorial } from '../slices/tutorialSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    view: viewReducer,
    settings: settingsSlice,
    sets: setSlice,
    tutorial: tutorialSlice,
  },
  preloadedState: {
    sets: getLocalStorageSets(),
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
