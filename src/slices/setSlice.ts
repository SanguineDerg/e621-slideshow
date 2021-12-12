import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { ManagedSets, Set } from '../api/e621/interfaces/sets';
import SetsAPI from '../api/e621/sets';
import { RootState } from '../app/store';
import { selectCurrentSlideshowPostId } from './postsSlice';

export interface SetState {
  managed_sets: ManagedSets | null;
  working_set_id: number | null;
  working_set: Set | null;
  update_set_status: 'idle' | 'working' | 'added' | 'removed' | 'failed';
}

const initialState: SetState = {
  managed_sets: null,
  working_set_id: null,
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

export const addCurrentPostToSet = createAsyncThunk<
  Set | null,
  void,
  {state: RootState}
>(
  'sets/addCurrentPostToSet',
  async (_, thunkAPI) => {
    const postId = selectCurrentSlideshowPostId(thunkAPI.getState());
    const setId = selectWorkingSetId(thunkAPI.getState());
    if (postId === null || setId === null) return null;
    const response = await SetsAPI.addPostToSet(postId, setId);
    return response.data;
  }
);

export const setSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    setWorkingSetId: (state, action: PayloadAction<number | null>) => {
      state.working_set_id = action.payload;
      state.working_set = null;
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
        state.working_set_id = null;
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
      });
  },
});

export const { setWorkingSetId } = setSlice.actions;

export const selectManagedSets = (state: RootState) => state.sets.managed_sets;
export const selectWorkingSetId = (state: RootState) => state.sets.working_set_id;
export const selectWorkingSet = (state: RootState) => state.sets.working_set;
export const selectUpdateSetStatus = (state: RootState) => state.sets.update_set_status;

export const selectIsCurrentPostInSet = createSelector([selectCurrentSlideshowPostId, selectWorkingSet], (postId, set) => {
  return (postId !== null && set !== null) ? set.post_ids.includes(postId) : false;
});

export default setSlice.reducer;
