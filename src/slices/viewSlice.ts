import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type ViewScreen = 'search' | 'slideshow';

export interface ViewState {
  screen: ViewScreen;
}

const initialState: ViewState = {
  screen: 'search',
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    switchScreen: (state, action: PayloadAction<ViewScreen>) => {
      state.screen = action.payload;
    },
  },
});

export const { switchScreen } = viewSlice.actions;

export const selectScreen = (state: RootState) => state.view.screen;

export default viewSlice.reducer;
