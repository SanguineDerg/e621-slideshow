import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ManagedSets, Set } from '../api/e621/interfaces/sets';
import SetsAPI from '../api/e621/sets';
import { RootState } from '../app/store';
import { selectWorkingSetId } from './accountsSlice';

export interface SetState {
  managed_sets: ManagedSets | null;
  working_set: Set | null;
  update_set_status: 'idle' | 'working' | 'added' | 'removed' | 'failed';
}

const initialState: SetState = {
  managed_sets: null,
  working_set: null,
  update_set_status: 'idle',
};

export const fetchManagedSets = createAsyncThunk(
  'sets/fetchManagedSets',
  async () => {
    const response = await SetsAPI.getManagedSets();
    return response.data;
  }
);

export const fetchWorkingSet = createAsyncThunk<
  Set | null,
  void,
  {state: RootState}
>(
  'sets/fetchWorkingSet',
  async (_, thunkAPI) => {
    const setId = selectWorkingSetId(thunkAPI.getState());
    if (setId === null) return null;
    const response = await SetsAPI.getSetById(setId);
    return response.data;
  }
);

export const addCurrentPostToSet = createAsyncThunk<
  Set | null,
  number,
  {state: RootState}
>(
  'sets/addCurrentPostToSet',
  async (postId, thunkAPI) => {
    const setId = selectWorkingSetId(thunkAPI.getState());
    if (setId === null) return null;
    const response = await SetsAPI.addPostToSet(postId, setId);
    return response.data;
  }
);

export const removeCurrentPostFromSet = createAsyncThunk<
  Set | null,
  number,
  {state: RootState}
>(
  'sets/removeCurrentPostFromSet',
  async (postId, thunkAPI) => {
    const setId = selectWorkingSetId(thunkAPI.getState());
    if (setId === null) return null;
    const response = await SetsAPI.removePostFromSet(postId, setId);
    return response.data;
  }
);

export const setSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    clear: (state) => {
      state.managed_sets = null;
      state.working_set = null;
      state.update_set_status = 'idle';
    },
    resetUpdateSetStatus: (state) => {
      state.update_set_status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagedSets.fulfilled, (state, action) => {
        state.managed_sets = action.payload;
      })
      .addCase(fetchManagedSets.rejected, (state, action) => {
        // Sets could not be fetched, probably not logged in
        state.managed_sets = null;
        state.working_set = null;
      })
      .addCase(fetchWorkingSet.fulfilled, (state, action) => {
        state.working_set = action.payload;
      })
      .addCase(fetchWorkingSet.rejected, (state, action) => {
        state.working_set = null;
      })
      .addCase(addCurrentPostToSet.pending, (state, action) => {
        state.update_set_status = 'working';
      })
      .addCase(addCurrentPostToSet.fulfilled, (state, action) => {
        state.working_set = action.payload;
        if (action.payload === null) {
          state.update_set_status = 'failed';
        } else {
          state.update_set_status = 'added';
        }
      })
      .addCase(addCurrentPostToSet.rejected, (state, action) => {
        state.update_set_status = 'failed';
      })
      .addCase(removeCurrentPostFromSet.pending, (state, action) => {
        state.update_set_status = 'working';
      })
      .addCase(removeCurrentPostFromSet.fulfilled, (state, action) => {
        state.working_set = action.payload;
        if (action.payload === null) {
          state.update_set_status = 'failed';
        } else {
          state.update_set_status = 'removed';
        }
      })
      .addCase(removeCurrentPostFromSet.rejected, (state, action) => {
        state.update_set_status = 'failed';
      });
  },
});

export const { clear, resetUpdateSetStatus } = setSlice.actions;

export const selectManagedSets = (state: RootState) => state.sets.managed_sets;
export const selectWorkingSet = (state: RootState) => state.sets.working_set;
export const selectUpdateSetStatus = (state: RootState) => state.sets.update_set_status;

export default setSlice.reducer;
