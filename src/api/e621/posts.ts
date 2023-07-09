import { DEFAULT_SITE, readUserAccount } from '../../slices/accountsSlice';
import { VideoDisplayType, readImageDisplaySize, readVideoDisplaySize, readVideoDisplayType } from '../../slices/settingsSlice';
import { e621 } from './config';
import { Post } from './interfaces/posts';

const PostAPI = {
  // Fetch list of posts
  getPosts: (options: {
    limit?: number;
    tags?: string;
    page?: number | string;
  } = {}) => {
    return e621.get<{posts: Post[]}>('/posts.json', {params: options});
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

const getCurrentImageSite = () => {
  // TODO: Find a better way to handle this translation
  const account = readUserAccount();
  return (account === null || account.site === DEFAULT_SITE) ? 'https://static1.e621.net' : account.site;
}

export const getPostImageUrl = (post: Post) => {
  if (post.file.url === null) return getPostImageBypassUrl(post);
  const imageDisplaySize = readImageDisplaySize();
  switch (imageDisplaySize) {
    case 'sample':
    default:
      return post.sample.url;
    case 'full':
      return post.file.url;
  }
}

const getPostImageBypassUrl = (post: Post) => {
  const imageDisplaySize = readImageDisplaySize();
  const md5 = post.file.md5;
  const imageSite = getCurrentImageSite();
  switch (imageDisplaySize) {
    case 'sample':
    default:
      if (post.sample.has) return `${imageSite}/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.jpg`;
      return `${imageSite}/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`; // Fallback to full
    case 'full':
      return `${imageSite}/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`;
  }
}

const getVideoTypeIndex = (type: VideoDisplayType) => {
  switch (type) {
    case 'webm':
      return 0;
    case 'mp4':
    default:
      return 1;
  }
}

export const getPostVideoUrl = (post: Post) => {
  if (post.file.url === null) return getPostVideoBypassUrl(post);
  const videoDisplaySize = readVideoDisplaySize();
  const videoTypeIndex = getVideoTypeIndex(readVideoDisplayType());
  switch (videoDisplaySize) {
    case '480p':
      if (!!post.sample.alternates['480p']) return post.sample.alternates['480p']?.urls[videoTypeIndex] as string;
      if (!!post.sample.alternates.original && videoTypeIndex !== 0) return post.sample.alternates.original?.urls[videoTypeIndex] as string;
      return post.file.url;
    case '720p':
    default:
      if (!!post.sample.alternates['720p']) return post.sample.alternates['720p']?.urls[videoTypeIndex] as string;
      if (!!post.sample.alternates.original && videoTypeIndex !== 0) return post.sample.alternates.original?.urls[videoTypeIndex] as string;
      return post.file.url;
    case 'full':
      if (!!post.sample.alternates.original && videoTypeIndex !== 0) return post.sample.alternates.original?.urls[videoTypeIndex] as string;
      return post.file.url;
  }
}

const getPostVideoBypassUrl = (post: Post) => {
  const videoDisplaySize = readVideoDisplaySize();
  const md5 = post.file.md5;
  const imageSite = getCurrentImageSite();
  const videoDisplayType = readVideoDisplayType();
  switch (videoDisplaySize) {
    case '480p':
      if (!!post.sample.alternates['480p']) return `${imageSite}/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}_480p.${videoDisplayType}`;
      return `${imageSite}/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${videoDisplayType}`;
    case '720p':
    default:
      if (!!post.sample.alternates['720p']) return `${imageSite}/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}_720p.${videoDisplayType}`;
      return `${imageSite}/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${videoDisplayType}`;
    case 'full':
      return `${imageSite}/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${videoDisplayType}`;
  }
}

export const getPostVideoPreviewUrl = (post: Post) => {
  if (post.sample.url === null) return getPostVideoPreviewBypassUrl(post);
  return post.sample.url;
}

const getPostVideoPreviewBypassUrl = (post: Post) => {
  const md5 = post.file.md5;
  const imageSite = getCurrentImageSite();
  return `${imageSite}/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.jpg`;
}

export default PostAPI
