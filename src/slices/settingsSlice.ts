import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const DEFAULT_SITE = "https://e621.net";

export type ImageDisplaySize = 'full' | 'sample';
export type VideoDisplaySize = 'full' | '720p' | '480p';
export type VideoDisplayType = 'webm' | 'mp4';

export type SetManagementButtonType = 'desktop' | 'mobile';

export type UserAccount = {
  site: string,
  username: string,
  apiKey: string,
}

export interface SettingsState {
  accounts: {[uid: string]: UserAccount};
  selectedAccount: string | null;
  imageDisplaySize: ImageDisplaySize;
  videoDisplaySize: VideoDisplaySize;
  videoDisplayType: VideoDisplayType;
  setManagementButtonType: SetManagementButtonType;
}

const initialState: SettingsState = {
  accounts: {},
  selectedAccount: null,
  imageDisplaySize: 'sample',
  videoDisplaySize: '720p',
  videoDisplayType: 'mp4',
  setManagementButtonType: 'mobile',
};

export const getLocalStorageSettings = () => {
  // Accounts
  //   settings.accounts = '["uid1"]'
  //   settings.accounts.uid1.site = 'https://e621.net'
  //   settings.accounts.uid1.username = 'username'
  //   settings.accounts.uid1.api_key = 'api_key'
  const loadedAccounts: {[uid: string]: UserAccount} = {}
  const accounts = localStorage.getItem("settings.accounts")
  if (accounts !== null) {
    const uidList: string[] = JSON.parse(accounts)
    for (const uid of uidList) {
      const site = localStorage.getItem(`settings.accounts.${uid}.site`)
      const username = localStorage.getItem(`settings.accounts.${uid}.username`)
      const apiKey = localStorage.getItem(`settings.accounts.${uid}.api_key`)
      if (site !== null && username !== null && apiKey !== null) {
        loadedAccounts[uid] = {
          site: site,
          username: username,
          apiKey: apiKey,
        }
      }
    }
  }
  // SelectedAccount
  //   settings.selected_account = '"uid1"'
  const selectedAccount = localStorage.getItem("settings.selected_account");
  const loadedSelectedAccount = selectedAccount !== null ? JSON.parse(selectedAccount) as string | null : null;

  // Other state
  const imageDisplaySize = localStorage.getItem('settings.image_display_size') ?? initialState.imageDisplaySize;
  const videoDisplaySize = localStorage.getItem('settings.video_display_size') ?? initialState.videoDisplaySize;
  const videoDisplayType = localStorage.getItem('settings.video_display_type') ?? initialState.videoDisplayType;
  const setManagementButtonType = localStorage.getItem('settings.set_management_button_type') ?? initialState.setManagementButtonType;

  const state = {
    accounts: loadedAccounts,
    selectedAccount: loadedSelectedAccount,
    imageDisplaySize: imageDisplaySize,
    videoDisplaySize: videoDisplaySize,
    videoDisplayType: videoDisplayType,
    setManagementButtonType: setManagementButtonType,
  } as SettingsState;

  saveState(state);
  return state;
}

function saveState(state: SettingsState) {
  // Accounts
  //   settings.accounts = '["uid1"]'
  //   settings.accounts.uid1.site = 'https://e621.net'
  //   settings.accounts.uid1.username = 'username'
  //   settings.accounts.uid1.apiKey = 'api_key'
  const uids = Object.keys(state.accounts);
  localStorage.setItem("settings.accounts", JSON.stringify(uids));
  for (const [uid, account] of Object.entries(state.accounts)) {
    localStorage.setItem(`settings.accounts.${uid}.site`, account.site);
    localStorage.setItem(`settings.accounts.${uid}.username`, account.username);
    localStorage.setItem(`settings.accounts.${uid}.api_key`, account.apiKey);
  }
  // SelectedAccount
  //   settings.selected_account = '"uid1"'
  localStorage.setItem("settings.selected_account", JSON.stringify(state.selectedAccount))

  // Other state
  localStorage.setItem("settings.image_display_size", state.imageDisplaySize);
  localStorage.setItem("settings.video_display_size", state.videoDisplaySize);
  localStorage.setItem("settings.video_display_type", state.videoDisplayType);
  localStorage.setItem("settings.set_management_button_type", state.setManagementButtonType);
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
      saveState(state);
    },
    addAccount: (state, action: PayloadAction<UserAccount>) => {
      let uid: string;
      do {
        uid = (Math.random() + 1).toString(36).substring(7);
      } while (state.accounts.hasOwnProperty(uid))
      state.accounts[uid] = action.payload;
      state.selectedAccount = uid;
      saveState(state);
    },
    selectAccount: (state, action: PayloadAction<string | null>) => {
      state.selectedAccount = action.payload;
      saveState(state);
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      if (state.accounts.hasOwnProperty(action.payload)) {
        delete state.accounts[action.payload];
      }
      if (state.selectedAccount === action.payload) {
        state.selectedAccount = null;
      }
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
  },
});

export const { clear, addAccount, selectAccount, removeAccount, setImageDisplaySize, setVideoDisplaySize, setVideoDisplayType, setSetManagementButtonType } = settingsSlice.actions;

// Direct local storage accessors
export const readUser = () => {
  const selectedAccount = localStorage.getItem("settings.selected_account");
  if (selectedAccount === null) return null;
  const currentUid = JSON.parse(selectedAccount) as string | null;
  if (currentUid === null) return null;
  const site = localStorage.getItem(`settings.accounts.${currentUid}.site`)
  const username = localStorage.getItem(`settings.accounts.${currentUid}.username`)
  const apiKey = localStorage.getItem(`settings.accounts.${currentUid}.apiKey`)
  if (site !== null && username !== null && apiKey !== null) {
    return {
      site: site,
      username: username,
      apiKey: apiKey,
    } as UserAccount;
  } else {
    return null;
  }
}
export const readImageDisplaySize = () => localStorage.getItem('settings.image_display_size') ?? initialState.imageDisplaySize;
export const readVideoDisplaySize = () => localStorage.getItem('settings.video_display_size') ?? initialState.videoDisplaySize;
export const readVideoDisplayType = () => localStorage.getItem('settings.video_display_type') ?? initialState.videoDisplayType;
export const readSetManagementButtonType = () => localStorage.getItem('settings.set_management_button_type') ?? initialState.setManagementButtonType;

export const selectAllAccounts = (state: RootState) => state.settings.accounts;
export const selectSelectedAccountId = (state: RootState) => state.settings.selectedAccount;
export const selectImageDisplaySize = (state: RootState) => state.settings.imageDisplaySize;
export const selectVideoDisplaySize = (state: RootState) => state.settings.videoDisplaySize;
export const selectVideoDisplayType = (state: RootState) => state.settings.videoDisplayType;
export const selectSetManagementButtonType = (state: RootState) => state.settings.setManagementButtonType;

export const selectSelectedAccount = createSelector([selectAllAccounts, selectSelectedAccountId], (accounts, uid) => (uid !== null && accounts.hasOwnProperty(uid)) ? accounts[uid] : null);
export const selectCurrentSite = createSelector([selectSelectedAccount], (account) => account !== null ? account.site : DEFAULT_SITE);

export default settingsSlice.reducer;
