import { e621 } from './config';
import { Post } from './interfaces/posts';

const PostAPI = {
  // Fetch list of posts
  getPosts: (options: {
    limit?: number;
    tags?: string;
    page?: number | string;
  } = {}) => {
    return e621.get<Post[]>('posts.json', {params: options});
  }
}

export default PostAPI
