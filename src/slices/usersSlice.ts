import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { selectSelectedAccount } from './accountsSlice';
import { FullUser, User } from '../api/e621/interfaces/users';
import UsersAPI from '../api/e621/users';
import { BlacklistEntry, parseBlacklistEntries } from '../api/e621/blacklists';

export interface UsersState {
  current_user: FullUser | null;
  current_blacklists: BlacklistEntry[] | null;
  current_user_status: 'idle' | 'working' | 'finished' | 'failed';
}

const initialState: UsersState = {
  current_user: null,
  current_blacklists: null,
  current_user_status: 'idle',
};

export const fetchCurrentUser = createAsyncThunk<
  User | null,
  void,
  {state: RootState}
>(
  'users/fetchCurrentUser',
  async (_, thunkAPI) => {
    const selectedAccount = selectSelectedAccount(thunkAPI.getState());
    if (selectedAccount === null) return null;
    const response = await UsersAPI.getUserByName(selectedAccount.username);
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clear: (state) => {
      state.current_user = null;
      state.current_blacklists = null;
      state.current_user_status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.current_user_status = 'working';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (action.payload !== null && action.payload.hasOwnProperty('email')) {
          state.current_user = action.payload as FullUser;
          state.current_blacklists = parseBlacklistEntries((action.payload as FullUser).blacklisted_tags.split(/\r\n|\r|\n/g));
        } else {
          state.current_user = null;
          state.current_blacklists = null;
        }
        state.current_user_status = 'finished';
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        // Sets could not be fetched, probably not logged in
        state.current_user = null;
        state.current_blacklists = null;
        state.current_user_status = 'failed';
      })
  },
});

export const { clear } = usersSlice.actions;

export const selectCurrentUser = (state: RootState) => state.users.current_user;
export const selectCurrentBlacklists = (state: RootState) => state.users.current_blacklists;
export const selectselectCurrentUserStatus = (state: RootState) => state.users.current_user_status;

export default usersSlice.reducer;
