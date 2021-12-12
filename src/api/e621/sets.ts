import { e621 } from './config';
import { ManagedSets, Set } from './interfaces/sets';

const SetsAPI = {
  // Fetch sets owned or maintained by the current user
  getManagedSets: () => {
    return e621.get<ManagedSets>('post_sets/for_select.json');
  },
  addPostToSet: (postId: number, setId: number) => {
    const formData = new FormData();
    formData.append('post_ids[]', postId.toString());
    return e621.post<Set>(`post_sets/${setId}/add_posts.json`, formData);
  },
}

export default SetsAPI
