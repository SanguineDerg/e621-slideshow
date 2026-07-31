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
    case 'webp':
      return 'image';
    case 'webm':
    case 'mp4':
      return 'video';
    case 'swf':
      return 'flash';
    default:
      return 'unsupported';
  }
}

const getCurrentImageSite = () => {
  // TODO: Find a better way to handle this translation
  const account = readUserAccount();
  return (account === null || account.site === DEFAULT_SITE) ? 'https://static1.e621.net' : account.site;
}

/**
 * Converts a possibly relative URL from the API to an absolute URL.
 */
const absoluteUrlForCurrentSite = (relativeUrl: string) => {
  const imageSite = getCurrentImageSite();
  return new URL(relativeUrl, imageSite).href;
}

export const getPostImageUrl = (post: Post) => {
  const imageDisplaySize = readImageDisplaySize();
  switch (imageDisplaySize) {
    case 'sample':
    default:
      return absoluteUrlForCurrentSite(post.sample.url || getPostImageBypassUrl(post));
    case 'full':
      return absoluteUrlForCurrentSite(post.file.url || getPostImageBypassUrl(post));
  }
}

const getPostImageBypassUrl = (post: Post) => {
  const imageDisplaySize = readImageDisplaySize();
  const md5 = post.file.md5;
  switch (imageDisplaySize) {
    case 'sample':
    default:
      if (post.sample.has) return `/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.jpg`;
      return `/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`; // Fallback to full
    case 'full':
      return `/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`;
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
  if (post.file.url === null) return absoluteUrlForCurrentSite(getPostVideoBypassUrl(post));
  const videoDisplaySize = readVideoDisplaySize();
  const videoTypeIndex = getVideoTypeIndex(readVideoDisplayType());
  switch (videoDisplaySize) {
    case '480p':
      if (!!post.sample.alternates['480p']) {
        return absoluteUrlForCurrentSite(post.sample.alternates['480p']?.urls[videoTypeIndex] as string);
      }
      if (!!post.sample.alternates.original && videoTypeIndex !== 0) {
        return absoluteUrlForCurrentSite(post.sample.alternates.original?.urls[videoTypeIndex] as string);
      }
      return absoluteUrlForCurrentSite(post.file.url);
    case '720p':
    default:
      if (!!post.sample.alternates['720p']) {
        return absoluteUrlForCurrentSite(post.sample.alternates['720p']?.urls[videoTypeIndex] as string);
      }
      if (!!post.sample.alternates.original && videoTypeIndex !== 0) {
        return absoluteUrlForCurrentSite(post.sample.alternates.original?.urls[videoTypeIndex] as string);
      }
      return absoluteUrlForCurrentSite(post.file.url);
    case 'full':
      if (!!post.sample.alternates.original && videoTypeIndex !== 0) {
        return absoluteUrlForCurrentSite(post.sample.alternates.original?.urls[videoTypeIndex] as string);
      }
      return absoluteUrlForCurrentSite(post.file.url);
  }
}

const getPostVideoBypassUrl = (post: Post) => {
  const videoDisplaySize = readVideoDisplaySize();
  const md5 = post.file.md5;
  const videoDisplayType = readVideoDisplayType();
  switch (videoDisplaySize) {
    case '480p':
      if (!!post.sample.alternates['480p']) return `/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}_480p.${videoDisplayType}`;
      return `/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${videoDisplayType}`;
    case '720p':
    default:
      if (!!post.sample.alternates['720p']) return `/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}_720p.${videoDisplayType}`;
      return `/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${videoDisplayType}`;
    case 'full':
      return `/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${videoDisplayType}`;
  }
}

export const getPostVideoPreviewUrl = (post: Post) => {
  if (post.sample.url === null) return absoluteUrlForCurrentSite(getPostVideoPreviewBypassUrl(post));
  return absoluteUrlForCurrentSite(post.sample.url);
}

const getPostVideoPreviewBypassUrl = (post: Post) => {
  const md5 = post.file.md5;
  return `/data/sample/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.jpg`;
}

export default PostAPI
