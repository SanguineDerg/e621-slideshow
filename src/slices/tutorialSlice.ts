import { createSlice } from '@reduxjs/toolkit';
import { readLocalStorage, writeLocalStorage } from '../app/localStorage';
import { RootState } from '../app/store';

// true = show, false = hide
export interface TutorialState {
  welcome: boolean;
}

const initialState: TutorialState = {
  welcome: true,
};

export const readWelcomeTutorial = () => readLocalStorage('tutorial.welcome', initialState.welcome);

export const writeWelcomeTutorial = (enabled: boolean) => writeLocalStorage('tutorial.welcome', enabled);

export const getLocalStorageTutorial = () => {
  return {
    welcome: readWelcomeTutorial(),
  } as TutorialState;
}

export const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    enableAll: (state) => {
      state = {...initialState};
      writeWelcomeTutorial(true);
    },
    closeWelcome: (state) => {
      state.welcome = false;
      writeWelcomeTutorial(false);
    },
  },
});

export const { enableAll, closeWelcome } = tutorialSlice.actions;

export const selectWelcomeTutorial = (state: RootState) => state.tutorial.welcome;

export default tutorialSlice.reducer;
