import { readImageDisplaySize } from '../../slices/settingsSlice';
import { e621 } from './config';
import { Post } from './interfaces/posts';

const PostAPI = {
  // Fetch list of posts
  getPosts: (options: {
    limit?: number;
    tags?: string;
    page?: number | string;
  } = {}) => {
    return e621.get<{posts: Post[]}>('posts.json', {params: options});
  }
}

export const getPostMediaType = (post: Post) => {
  switch (post.file.ext) {
    case 'jpg':
    case 'png':
    case 'gif':
      return 'image';
    case 'webm':
      return 'video';
    case 'swf':
      return 'flash';
  }
}

const getPostImageURL = (post: Post) => {
  if (post.file.url === null) return getPostImageBypassURL(post);
  const imageDisplaySize = readImageDisplaySize();
  switch (imageDisplaySize) {
    case 'full':
      return post.file.url;
    case 'sample':
      return post.sample.url;
  }
}

const getPostImageBypassURL = (post: Post) => {
  const imageDisplaySize = readImageDisplaySize();
  const md5 = post.file.md5;
  switch (imageDisplaySize) {
    case 'full':
      return `https://static1.e621.net/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`;
    case 'sample':
      if (!post.sample.has) return `https://static1.e621.net/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`;
      return `https://static1.e621.net/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`;
  }
}

export const getPostMediaURL = (post: Post) => {
  // TODO add URLs for videos and flash
  switch (getPostMediaType(post)) {
    case 'image':
      return getPostImageURL(post);
    case 'video':
      return '';
    case 'flash':
      return '';
  }
}

export default PostAPI
