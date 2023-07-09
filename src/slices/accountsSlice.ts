import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const DEFAULT_SITE = "https://e621.net";

export type UserAccount = {
  site: string,
  username: string,
  apiKey: string,
  workingSetId: number | null,
}

export interface AccountsState {
  accounts: {[uid: string]: UserAccount};
  selectedAccount: string | null;
}

const initialState: AccountsState = {
  accounts: {},
  selectedAccount: null,
};

export const getLocalStorageAccounts = () => {
  // Accounts
  //   accounts.accounts = '["uid1"]'
  //   accounts.accounts.uid1.site = 'https://e621.net'
  //   accounts.accounts.uid1.username = 'username'
  //   accounts.accounts.uid1.api_key = 'api_key'
  //   accounts.accounts.uid1.working_set_id = '123'
  const loadedAccounts: {[uid: string]: UserAccount} = {}
  const jsonUidList = localStorage.getItem("accounts.accounts");
  if (jsonUidList !== null) {
    const uidList: string[] = JSON.parse(jsonUidList);
    for (const uid of uidList) {
      const site = localStorage.getItem(`accounts.accounts.${uid}.site`)
      const username = localStorage.getItem(`accounts.accounts.${uid}.username`);
      const apiKey = localStorage.getItem(`accounts.accounts.${uid}.api_key`);
      const jsonWorkingSetId = localStorage.getItem(`accounts.accounts.${uid}.working_set_id`);
      const workingSetId = jsonWorkingSetId !== null ? JSON.parse(jsonWorkingSetId) as number | null : null;
      if (site !== null && username !== null && apiKey !== null) {
        loadedAccounts[uid] = {
          site: site,
          username: username,
          apiKey: apiKey,
          workingSetId: workingSetId,
        }
      }
    }
  }
  // SelectedAccount
  //   accounts.selected_account = '"uid1"'
  const selectedAccount = localStorage.getItem("accounts.selected_account");
  const loadedSelectedAccount = selectedAccount !== null ? JSON.parse(selectedAccount) as string | null : null;

  const state = {
    accounts: loadedAccounts,
    selectedAccount: loadedSelectedAccount,
  } as AccountsState;

  saveState(state);
  return state;
}

function saveState(state: AccountsState) {
  // Accounts
  //   accounts.accounts = '["uid1"]'
  //   accounts.accounts.uid1.site = 'https://e621.net'
  //   accounts.accounts.uid1.username = 'username'
  //   accounts.accounts.uid1.api_key = 'api_key'
  //   accounts.accounts.uid1.working_set_id = '123'
  const uids = Object.keys(state.accounts);
  localStorage.setItem("accounts.accounts", JSON.stringify(uids));
  for (const [uid, account] of Object.entries(state.accounts)) {
    localStorage.setItem(`accounts.accounts.${uid}.site`, account.site);
    localStorage.setItem(`accounts.accounts.${uid}.username`, account.username);
    localStorage.setItem(`accounts.accounts.${uid}.api_key`, account.apiKey);
    localStorage.setItem(`accounts.accounts.${uid}.working_set_id`, JSON.stringify(account.workingSetId));
  }
  // SelectedAccount
  //   accounts.selected_account = '"uid1"'
  localStorage.setItem("accounts.selected_account", JSON.stringify(state.selectedAccount))
}

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
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
    updateAccountWorkingSetId: (state, action: PayloadAction<[string, number | null]>) => {
      const [uid, workingSetId] = action.payload;
      if (state.accounts.hasOwnProperty(uid)) {
        state.accounts[uid].workingSetId = workingSetId;
        saveState(state);
      }
    },
  },
});

export const { addAccount, selectAccount, removeAccount, updateAccountWorkingSetId } = accountsSlice.actions;

// Direct local storage accessors
export const readUserAccount = () => {
  const selectedAccount = localStorage.getItem("accounts.selected_account");
  if (selectedAccount === null) return null;
  const currentUid = JSON.parse(selectedAccount) as string | null;
  if (currentUid === null) return null;
  const site = localStorage.getItem(`accounts.accounts.${currentUid}.site`);
  const username = localStorage.getItem(`accounts.accounts.${currentUid}.username`);
  const apiKey = localStorage.getItem(`accounts.accounts.${currentUid}.api_key`);
  const jsonWorkingSetId = localStorage.getItem(`accounts.accounts.${currentUid}.working_set_id`);
  const workingSetId = jsonWorkingSetId !== null ? JSON.parse(jsonWorkingSetId) as number | null : null;
  if (site !== null && username !== null && apiKey !== null) {
    return {
      site: site,
      username: username,
      apiKey: apiKey,
      workingSetId: workingSetId,
    } as UserAccount;
  } else {
    return null;
  }
}

export const selectAllAccounts = (state: RootState) => state.accounts.accounts;
export const selectSelectedAccountId = (state: RootState) => state.accounts.selectedAccount;

export const selectSelectedAccount = createSelector([selectAllAccounts, selectSelectedAccountId], (accounts, uid) => (uid !== null && accounts.hasOwnProperty(uid)) ? accounts[uid] : null);
export const selectCurrentSite = createSelector([selectSelectedAccount], (account) => account !== null ? account.site : DEFAULT_SITE);
export const selectWorkingSetId = createSelector([selectSelectedAccount], (account) => account !== null ? account.workingSetId : null);

export default accountsSlice.reducer;
