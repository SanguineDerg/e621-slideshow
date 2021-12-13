import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { Post } from '../api/e621/interfaces/posts';
import PostAPI from '../api/e621/posts';
import { RootState, AppThunk } from '../app/store';
import { resetUpdateSetStatus, selectWorkingSet } from './setSlice';

export interface PostsState {
  posts: {[key: number]: Post};
  fetch_order: number[];
  fetch_tags: string;
  fetch_page: number;
  fetch_status: 'idle' | 'loading' | 'failed' | 'finished';
  fetch_id: string;
  slideshow_index: number;
}

const initialState: PostsState = {
  posts: {},
  fetch_order: [],
  fetch_tags: '',
  fetch_page: 1,
  fetch_status: 'idle',
  fetch_id: '',
  slideshow_index: 0,
};

const fetchPosts = createAsyncThunk<
  Post[],
  void,
  {state: RootState}
>(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    const response = await PostAPI.getPosts({
      tags: selectTags(thunkAPI.getState()),
      page: selectPage(thunkAPI.getState()),
    });
    return response.data.posts;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.fetch_order = [];
      state.fetch_tags = '';
      state.fetch_page = 1;
      state.fetch_status = 'idle';
      state.fetch_id = '';
      state.slideshow_index = 0;
    },
    startSearch: (state, action: PayloadAction<string>) => {
      state.fetch_order = [];
      state.fetch_tags = action.payload;
      state.fetch_page = 1;
      state.fetch_status = 'idle';
      state.fetch_id = '';
      state.slideshow_index = 0;
    },
    previousSlide: (state) => {
      if (state.slideshow_index !== 0) {
        state.slideshow_index -= 1;
      }
    },
    nextSlide: (state) => {
      if (state.slideshow_index < state.fetch_order.length - 1) {
        state.slideshow_index += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.fetch_status = 'loading';
        state.fetch_id = action.meta.requestId;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // Check if the fetch was cancelled
        if (action.meta.requestId !== state.fetch_id) return;
        const posts = action.payload;
        if (posts.length === 0) {
          state.fetch_status = 'finished';
          state.fetch_page = 0;
          state.fetch_id = '';
        } else {
          state.fetch_status = 'idle';
          state.fetch_page = state.fetch_page && state.fetch_page + 1;
          state.fetch_id = '';
          posts.forEach(post => {
            state.posts[post.id] = post;
            state.fetch_order.push(post.id);
          });
        }
      });
  },
});

export const { clear, startSearch, previousSlide, nextSlide } = postsSlice.actions;

export const selectTags = (state: RootState) => state.posts.fetch_tags;
export const selectPage = (state: RootState) => state.posts.fetch_page;
export const selectFetchStatus = (state: RootState) => state.posts.fetch_status;
export const selectFetchOrder = (state: RootState) => state.posts.fetch_order;
export const selectPosts = (state: RootState) => state.posts.posts;

export const selectSlideshowIndex = (state: RootState) => state.posts.slideshow_index;

export const selectCacheIndices = createSelector([selectSlideshowIndex, selectFetchOrder], (index, order) => {
  // TODO add settings for cache size
  const indices = Array.from({length: 6}, (_, i) => i + index - 2);
  return indices.filter((i) => i >= 0 && i < order.length);
});

export const selectCurrentSlideshowPost = createSelector([selectPosts, selectFetchOrder, selectSlideshowIndex], (posts, order, index) => {
  if (order.length === 0) return null;
  return posts[order[index]];
});

export const selectCurrentSlideshowPostId = createSelector([selectCurrentSlideshowPost], (post) => {
  return post !== null ? post.id : null;
});

export const selectIsCurrentPostInSet = createSelector([selectCurrentSlideshowPostId, selectWorkingSet], (postId, set) => {
  return (postId !== null && set !== null) ? set.post_ids.includes(postId) : false;
});

export const selectCachePosts = createSelector([selectPosts, selectFetchOrder, selectCacheIndices], (posts, order, indices) => {
  if (order.length === 0) return [];
  return indices.map(index => posts[order[index]]);
});

export const tryFetchPosts = (): AppThunk => (
  dispatch,
  getState
) => {
  const status = selectFetchStatus(getState());
  if (status === 'idle') {
    dispatch(fetchPosts());
  }
};

export const startSearchAndFetch = (tags: string): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(startSearch(tags));
  dispatch(fetchPosts());
  dispatch(resetUpdateSetStatus());
};

export const nextSlideAndPrefetch = (): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(nextSlide());
  dispatch(resetUpdateSetStatus());
  const index = selectSlideshowIndex(getState());
  const order = selectFetchOrder(getState());
  if (index >= order.length - 5) {
    dispatch(tryFetchPosts());
  }
};

export const previousSlideAndPrefetch = (): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(previousSlide());
  dispatch(resetUpdateSetStatus());
  const index = selectSlideshowIndex(getState());
  const order = selectFetchOrder(getState());
  if (index >= order.length - 5) {
    dispatch(tryFetchPosts());
  }
};

export default postsSlice.reducer;
