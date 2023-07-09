import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type ImageDisplaySize = 'full' | 'sample';
export type ImageDisplayMode = 'hide' | 'embed';
export type VideoDisplaySize = 'full' | '720p' | '480p';
export type VideoDisplayType = 'webm' | 'mp4';
export type VideoDisplayMode = 'hide' | 'preview' | 'embed';
export type FlashDisplayMode = 'hide' | 'preview';

export type SetManagementButtonType = 'desktop' | 'mobile';

export interface SettingsState {
  imageDisplaySize: ImageDisplaySize;
  imageDisplayMode: ImageDisplayMode;
  videoDisplaySize: VideoDisplaySize;
  videoDisplayType: VideoDisplayType;
  videoDisplayMode: VideoDisplayMode;
  flashDisplayMode: FlashDisplayMode;
  setManagementButtonType: SetManagementButtonType;
  autoplayDelay: number;
  autoplayLoop: boolean;
}

const initialState: SettingsState = {
  imageDisplaySize: 'sample',
  imageDisplayMode: 'embed',
  videoDisplaySize: '720p',
  videoDisplayType: 'mp4',
  videoDisplayMode: 'preview',
  flashDisplayMode: 'hide',
  setManagementButtonType: 'mobile',
  autoplayDelay: 5,
  autoplayLoop: true,
};

export const getLocalStorageSettings = () => {
  const imageDisplaySize = localStorage.getItem('settings.image_display_size') ?? initialState.imageDisplaySize;
  const imageDisplayMode = localStorage.getItem('settings.image_display_mode') ?? initialState.imageDisplayMode;
  const videoDisplaySize = localStorage.getItem('settings.video_display_size') ?? initialState.videoDisplaySize;
  const videoDisplayType = localStorage.getItem('settings.video_display_type') ?? initialState.videoDisplayType;
  const videoDisplayMode = localStorage.getItem('settings.video_display_mode') ?? initialState.videoDisplayMode;
  const flashDisplayMode = localStorage.getItem('settings.flash_display_mode') ?? initialState.flashDisplayMode;
  const setManagementButtonType = localStorage.getItem('settings.set_management_button_type') ?? initialState.setManagementButtonType;
  const autoplayDelay = localStorage.getItem('settings.autoplay_delay');
  const loadedAutoplayDelay = autoplayDelay !== null ? JSON.parse(autoplayDelay) as number : initialState.autoplayDelay;
  const autoplayLoop = localStorage.getItem('settings.autoplay_loop');
  const loadedAutoplayLoop = autoplayLoop !== null ? JSON.parse(autoplayLoop) as boolean : initialState.autoplayLoop;

  const state = {
    imageDisplaySize: imageDisplaySize,
    imageDisplayMode: imageDisplayMode,
    videoDisplaySize: videoDisplaySize,
    videoDisplayType: videoDisplayType,
    videoDisplayMode: videoDisplayMode,
    flashDisplayMode: flashDisplayMode,
    setManagementButtonType: setManagementButtonType,
    autoplayDelay: loadedAutoplayDelay,
    autoplayLoop: loadedAutoplayLoop,
  } as SettingsState;

  saveState(state);
  return state;
}

function saveState(state: SettingsState) {
  localStorage.setItem("settings.image_display_size", state.imageDisplaySize);
  localStorage.setItem("settings.image_display_mode", state.imageDisplayMode);
  localStorage.setItem("settings.video_display_size", state.videoDisplaySize);
  localStorage.setItem("settings.video_display_type", state.videoDisplayType);
  localStorage.setItem("settings.video_display_mode", state.videoDisplayMode);
  localStorage.setItem("settings.flash_display_mode", state.flashDisplayMode);
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
    setImageDisplayMode: (state, action: PayloadAction<ImageDisplayMode>) => {
      state.imageDisplayMode = action.payload;
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
    setVideoDisplayMode: (state, action: PayloadAction<VideoDisplayMode>) => {
      state.videoDisplayMode = action.payload;
      saveState(state);
    },
    setFlashDisplayMode: (state, action: PayloadAction<FlashDisplayMode>) => {
      state.flashDisplayMode = action.payload;
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

export const { clear, setImageDisplaySize, setImageDisplayMode, setVideoDisplaySize, setVideoDisplayType, setVideoDisplayMode, setFlashDisplayMode, setSetManagementButtonType, setAutoplayDelay, setAutoplayLoop } = settingsSlice.actions;

// Direct local storage accessors
export const readImageDisplaySize = () => localStorage.getItem('settings.image_display_size') as ImageDisplaySize ?? initialState.imageDisplaySize;
export const readImageDisplayMode = () => localStorage.getItem('settings.image_display_mode') as ImageDisplayMode ?? initialState.imageDisplayMode;
export const readVideoDisplaySize = () => localStorage.getItem('settings.video_display_size') as VideoDisplaySize ?? initialState.videoDisplaySize;
export const readVideoDisplayType = () => localStorage.getItem('settings.video_display_type') as VideoDisplayType ?? initialState.videoDisplayType;
export const readVideoDisplayMode = () => localStorage.getItem('settings.video_display_mode') as VideoDisplayMode ?? initialState.videoDisplayMode;
export const readFlashDisplayMode = () => localStorage.getItem('settings.flash_display_mode') as FlashDisplayMode ?? initialState.flashDisplayMode;
export const readSetManagementButtonType = () => localStorage.getItem('settings.set_management_button_type') as SetManagementButtonType ?? initialState.setManagementButtonType;
export const readAutoplayDelay = () => {
  const autoplayDelay = localStorage.getItem('settings.autoplay_delay')
  if (autoplayDelay === null) return initialState.autoplayDelay;
  return JSON.parse(autoplayDelay) as number;
}
export const readAutoplayLoop = () => {
  const autoplayLoop = localStorage.getItem('settings.autoplay_loop')
  if (autoplayLoop === null) return initialState.autoplayLoop;
  return JSON.parse(autoplayLoop) as boolean;
}

export const selectImageDisplaySize = (state: RootState) => state.settings.imageDisplaySize;
export const selectImageDisplayMode = (state: RootState) => state.settings.imageDisplayMode;
export const selectVideoDisplaySize = (state: RootState) => state.settings.videoDisplaySize;
export const selectVideoDisplayType = (state: RootState) => state.settings.videoDisplayType;
export const selectVideoDisplayMode = (state: RootState) => state.settings.videoDisplayMode;
export const selectFlashDisplayMode = (state: RootState) => state.settings.flashDisplayMode;
export const selectSetManagementButtonType = (state: RootState) => state.settings.setManagementButtonType;
export const selectAutoplayDelay = (state: RootState) => state.settings.autoplayDelay;
export const selectAutoplayLoop = (state: RootState) => state.settings.autoplayLoop;

export default settingsSlice.reducer;
