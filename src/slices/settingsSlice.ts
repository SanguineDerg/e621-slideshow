import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type ImageDisplaySize = 'full' | 'sample';
export type VideoDisplaySize = 'full' | '720p' | '480p';
export type VideoDisplayType = 'webm' | 'mp4';

export type SetManagementButtonType = 'desktop' | 'mobile';

export interface SettingsState {
  imageDisplaySize: ImageDisplaySize;
  videoDisplaySize: VideoDisplaySize;
  videoDisplayType: VideoDisplayType;
  setManagementButtonType: SetManagementButtonType;
  autoplayDelay: number;
  autoplayLoop: boolean;
}

const initialState: SettingsState = {
  imageDisplaySize: 'sample',
  videoDisplaySize: '720p',
  videoDisplayType: 'mp4',
  setManagementButtonType: 'mobile',
  autoplayDelay: 5,
  autoplayLoop: true,
};

export const getLocalStorageSettings = () => {
  const imageDisplaySize = localStorage.getItem('settings.image_display_size') ?? initialState.imageDisplaySize;
  const videoDisplaySize = localStorage.getItem('settings.video_display_size') ?? initialState.videoDisplaySize;
  const videoDisplayType = localStorage.getItem('settings.video_display_type') ?? initialState.videoDisplayType;
  const setManagementButtonType = localStorage.getItem('settings.set_management_button_type') ?? initialState.setManagementButtonType;
  const autoplayDelay = localStorage.getItem('settings.autoplay_delay');
  const loadedAutoplayDelay = autoplayDelay !== null ? JSON.parse(autoplayDelay) as number : initialState.autoplayDelay;
  const autoplayLoop = localStorage.getItem('settings.autoplay_loop');
  const loadedAutoplayLoop = autoplayLoop !== null ? JSON.parse(autoplayLoop) as boolean : initialState.autoplayLoop;

  const state = {
    imageDisplaySize: imageDisplaySize,
    videoDisplaySize: videoDisplaySize,
    videoDisplayType: videoDisplayType,
    setManagementButtonType: setManagementButtonType,
    autoplayDelay: loadedAutoplayDelay,
    autoplayLoop: loadedAutoplayLoop,
  } as SettingsState;

  saveState(state);
  return state;
}

function saveState(state: SettingsState) {
  localStorage.setItem("settings.image_display_size", state.imageDisplaySize);
  localStorage.setItem("settings.video_display_size", state.videoDisplaySize);
  localStorage.setItem("settings.video_display_type", state.videoDisplayType);
  localStorage.setItem("settings.set_management_button_type", state.setManagementButtonType);
  localStorage.setItem("settings.autoplay_delay", JSON.stringify(state.autoplayDelay));
  localStorage.setItem("settings.autoplay_loop", JSON.stringify(state.autoplayLoop));
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
      saveState(state);
    },
    setImageDisplaySize: (state, action: PayloadAction<ImageDisplaySize>) => {
      state.imageDisplaySize = action.payload;
      saveState(state);
    },
    setVideoDisplaySize: (state, action: PayloadAction<VideoDisplaySize>) => {
      state.videoDisplaySize = action.payload;
      saveState(state);
    },
    setVideoDisplayType: (state, action: PayloadAction<VideoDisplayType>) => {
      state.videoDisplayType = action.payload;
      saveState(state);
    },
    setSetManagementButtonType: (state, action: PayloadAction<SetManagementButtonType>) => {
      state.setManagementButtonType = action.payload;
      saveState(state);
    },
    setAutoplayDelay: (state, action: PayloadAction<number>) => {
      state.autoplayDelay = action.payload;
      saveState(state);
    },
    setAutoplayLoop: (state, action: PayloadAction<boolean>) => {
      state.autoplayLoop = action.payload;
      saveState(state);
    },
  },
});

export const { clear, setImageDisplaySize, setVideoDisplaySize, setVideoDisplayType, setSetManagementButtonType, setAutoplayDelay, setAutoplayLoop } = settingsSlice.actions;

// Direct local storage accessors
export const readImageDisplaySize = () => localStorage.getItem('settings.image_display_size') ?? initialState.imageDisplaySize;
export const readVideoDisplaySize = () => localStorage.getItem('settings.video_display_size') ?? initialState.videoDisplaySize;
export const readVideoDisplayType = () => localStorage.getItem('settings.video_display_type') ?? initialState.videoDisplayType;
export const readSetManagementButtonType = () => localStorage.getItem('settings.set_management_button_type') ?? initialState.setManagementButtonType;
export const readAutoplayDelay = () => {
  const autoplayDelay = localStorage.getItem('settings.autoplay_delay')
  if (autoplayDelay === null) return initialState.autoplayDelay;
  return JSON.parse(autoplayDelay) as number;
}
export const readAutoplayLoop = () => {
  const autoplayLoop = localStorage.getItem('settings.autoplay_loop')
  if (autoplayLoop === null) return initialState.autoplayLoop;
  return JSON.parse(autoplayLoop) as number;
}

export const selectImageDisplaySize = (state: RootState) => state.settings.imageDisplaySize;
export const selectVideoDisplaySize = (state: RootState) => state.settings.videoDisplaySize;
export const selectVideoDisplayType = (state: RootState) => state.settings.videoDisplayType;
export const selectSetManagementButtonType = (state: RootState) => state.settings.setManagementButtonType;
export const selectAutoplayDelay = (state: RootState) => state.settings.autoplayDelay;
export const selectAutoplayLoop = (state: RootState) => state.settings.autoplayLoop;

export default settingsSlice.reducer;
