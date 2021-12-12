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

export interface SettingsState {
  username: string;
  api_key: string;
}

const initialState: SettingsState = {
  username: '',
  api_key: '',
};

export const readUsername = () => readSetting('settings.username', initialState.username);
export const readAPIKey = () => readSetting('settings.api_key', initialState.api_key);

export const writeUsername = (username: string) => writeSetting('settings.username', username);
export const writeAPIKey = (apiKey: string) => writeSetting('settings.api_key', apiKey);

export const getLocalStorageSettings = () => {
  return {
    username: readUsername(),
    api_key: readAPIKey(),
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
    },
    setLogin: (state, action: PayloadAction<{username: string, apiKey: string}>) => {
      state.username = action.payload.username;
      state.api_key = action.payload.apiKey;
      writeUsername(action.payload.username);
      writeAPIKey(action.payload.apiKey);
    },
  },
});

export const { clear, setLogin, setImageDisplaySize, setVideoDisplaySize, setVideoDisplayType } = settingsSlice.actions;

export const selectUsername = (state: RootState) => state.settings.username;
export const selectAPIKey = (state: RootState) => state.settings.api_key;

export default settingsSlice.reducer;
