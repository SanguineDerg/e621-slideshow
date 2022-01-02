import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

function readSetting<SettingType>(name: string, fallback: SettingType): SettingType {
  const store = localStorage.getItem(name);
  if (store === null) return fallback;
  try {
    const setting: SettingType = JSON.parse(store);
    return setting;
  } catch {
    return fallback;
  }
}

function writeSetting<SettingType>(name: string, setting: SettingType): boolean {
  try {
    localStorage.setItem(name, JSON.stringify(setting));
    return true;
  } catch {
    return false;
  }
}

export type ImageDisplaySize = 'full' | 'sample';
export type VideoDisplaySize = 'full' | '720p' | '480p';
export type VideoDisplayType = 'webm' | 'mp4';

export type SetManagementButtonType = 'desktop' | 'mobile';

export interface SettingsState {
  username: string;
  api_key: string;
  image_display_size: ImageDisplaySize;
  video_display_size: VideoDisplaySize;
  video_display_type: VideoDisplayType;
  set_management_button_type: SetManagementButtonType;
}

const initialState: SettingsState = {
  username: '',
  api_key: '',
  image_display_size: 'sample',
  video_display_size: '720p',
  video_display_type: 'mp4',
  set_management_button_type: 'mobile',
};

export const readUsername = () => readSetting('settings.username', initialState.username);
export const readAPIKey = () => readSetting('settings.api_key', initialState.api_key);
export const readImageDisplaySize = () => readSetting('settings.image_display_size', initialState.image_display_size);
export const readVideoDisplaySize = () => readSetting('settings.video_display_size', initialState.video_display_size);
export const readVideoDisplayType = () => readSetting('settings.video_display_type', initialState.video_display_type);
export const readSetManagementButtonType = () => readSetting('settings.set_management_button_type', initialState.set_management_button_type);

export const writeUsername = (username: string) => writeSetting('settings.username', username);
export const writeAPIKey = (apiKey: string) => writeSetting('settings.api_key', apiKey);
export const writeImageDisplaySize = (imageDisplaySize: ImageDisplaySize) => writeSetting('settings.image_display_size', imageDisplaySize);
export const writeVideoDisplaySize = (videoDisplaySize: VideoDisplaySize) => writeSetting('settings.video_display_size', videoDisplaySize);
export const writeVideoDisplayType = (videoDisplayType: VideoDisplayType) => writeSetting('settings.video_display_type', videoDisplayType);
export const writeSetManagementButtonType = (setManagementButtonType: SetManagementButtonType) => writeSetting('settings.set_management_button_type', setManagementButtonType);

export const getLocalStorageSettings = () => {
  return {
    username: readUsername(),
    api_key: readAPIKey(),
    image_display_size: readImageDisplaySize(),
    video_display_size: readVideoDisplaySize(),
    video_display_type: readVideoDisplayType(),
    set_management_button_type: readSetManagementButtonType(),
  } as SettingsState;
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
      writeUsername(initialState.username);
      writeAPIKey(initialState.api_key);
      writeImageDisplaySize(initialState.image_display_size);
      writeVideoDisplaySize(initialState.video_display_size);
      writeVideoDisplayType(initialState.video_display_type);
      writeSetManagementButtonType(initialState.set_management_button_type);
    },
    setLogin: (state, action: PayloadAction<{username: string, apiKey: string}>) => {
      state.username = action.payload.username;
      state.api_key = action.payload.apiKey;
      writeUsername(action.payload.username);
      writeAPIKey(action.payload.apiKey);
    },
    setImageDisplaySize: (state, action: PayloadAction<ImageDisplaySize>) => {
      state.image_display_size = action.payload;
      writeImageDisplaySize(action.payload);
    },
    setVideoDisplaySize: (state, action: PayloadAction<VideoDisplaySize>) => {
      state.video_display_size = action.payload;
      writeVideoDisplaySize(action.payload);
    },
    setVideoDisplayType: (state, action: PayloadAction<VideoDisplayType>) => {
      state.video_display_type = action.payload;
      writeVideoDisplayType(action.payload);
    },
    setSetManagementButtonType: (state, action: PayloadAction<SetManagementButtonType>) => {
      state.set_management_button_type = action.payload;
      writeSetManagementButtonType(action.payload);
    },
  },
});

export const { clear, setLogin, setImageDisplaySize, setVideoDisplaySize, setVideoDisplayType, setSetManagementButtonType } = settingsSlice.actions;

export const selectUsername = (state: RootState) => state.settings.username;
export const selectAPIKey = (state: RootState) => state.settings.api_key;
export const selectImageDisplaySize = (state: RootState) => state.settings.image_display_size;
export const selectVideoDisplaySize = (state: RootState) => state.settings.video_display_size;
export const selectVideoDisplayType = (state: RootState) => state.settings.video_display_type;
export const selectSetManagementButtonType = (state: RootState) => state.settings.set_management_button_type;

export default settingsSlice.reducer;
