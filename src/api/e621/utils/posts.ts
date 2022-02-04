import { ImageDisplaySize, VideoDisplaySize, VideoDisplayType } from '../../../slices/settingsSlice';
import { Post, PostFileExtension } from '../interfaces/posts';

export const getMediaType = (post: Post) => {
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

// MD5 component of URL
// Follows the format `01/23/0123456789abcdef0123456789abcdef`
const md5URL = (post: Post) => {
  const md5 = post.file.md5;
  return `${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}`;
}

const getBypassMediaURL = (
  post: Post, 
  type: 'data' | 'data/sample' | 'data/preview',
  extension:  PostFileExtension | VideoDisplayType,
  suffix: string = '',
) => {
  return `https://static1.e621.net/${type}/${md5URL(post)}${suffix}.${extension}`;
}

export const getRawPreviewURL = (post: Post) => {
  return post.preview.url;
}

export const getBypassPreviewURL = (post: Post) => {
  switch (getMediaType(post)) {
    case 'flash':
      return 'https://static1.e621.net/images/download-preview.png';
    case 'image':
    case 'video':
    default: 
      return getBypassMediaURL(post, 'data/preview', 'jpg');
  }
}

// This handles user settings
export const getPreviewURL = (post: Post, md5Bypass: boolean = true) => {
  let url = getRawPreviewURL(post);
  if (url === null && md5Bypass) { url = getBypassPreviewURL(post); }
  return url;
}

export const getRawImageURL = (post: Post, size: ImageDisplaySize) => {
  switch (size) {
    case 'full':
      return post.file.url;
    case 'sample':
      return post.sample.url;
  }
}

export const getBypassImageURL = (post: Post, size: ImageDisplaySize) => {
  if (size === 'sample' && post.sample.has) {
    return getBypassMediaURL(post, 'data/sample', 'jpg');
  }
  return getBypassMediaURL(post, 'data', post.file.ext);
}

// This handles user settings
export const getImageURL = (post: Post, size: ImageDisplaySize, md5Bypass: boolean = true) => {
  let url = getRawImageURL(post, size);
  if (url === null && md5Bypass) { url = getBypassImageURL(post, size); }
  return url;
}

const getDownsizedVideoSize = (post: Post, size: VideoDisplaySize): VideoDisplaySize => {
  return post.sample.alternates[size] !== undefined ? size : 'original';
}

const getVideoTypeIndex = (type: VideoDisplayType) => {
  switch (type) {
    case 'webm':
      return 0;
    case 'mp4':
      return 1;
  }
}

export const getRawVideoURL = (post: Post, size: VideoDisplaySize, type: VideoDisplayType) => {
  const downsampledSize = getDownsizedVideoSize(post, size);
  if (downsampledSize === 'original' && type === 'webm') return post.file.url;
  const typeIndex = getVideoTypeIndex(type);
  return post.sample.alternates[downsampledSize]?.urls[typeIndex];
}

export const getBypassVideoURL = (post: Post, size: VideoDisplaySize, type: VideoDisplayType) => {
  const downsampledSize = getDownsizedVideoSize(post, size);
  if (downsampledSize === 'original') return getBypassMediaURL(post, 'data', type);
  return getBypassMediaURL(post, 'data/sample', type, `_${downsampledSize}`);
}

// This handles user settings
export const getVideoURL = (post: Post, size: VideoDisplaySize, type: VideoDisplayType, md5Bypass: boolean = true) => {
  let url = getRawVideoURL(post, size, type);
  if (url === null && md5Bypass) { url = getBypassVideoURL(post, size, type); }
  return url;
}

export const getRawVideoSampleImageURL = (post: Post) => {
  return post.sample.url;
}

export const getBypassVideoSampleImageURL = (post: Post) => {
  return getBypassMediaURL(post, 'data/sample', 'jpg');
}

// This handles user settings
export const getVideoSampleImageURL = (post: Post, md5Bypass: boolean = true) => {
  let url = getRawVideoSampleImageURL(post);
  if (url === null && md5Bypass) { url = getBypassVideoSampleImageURL(post); }
  return url;
}

const PostUtils = {
  getMediaType,
  getRawPreviewURL,
  getBypassPreviewURL,
  getPreviewURL,
  getRawImageURL,
  getBypassImageURL,
  getImageURL,
  getRawVideoURL,
  getBypassVideoURL,
  getVideoURL,
  getRawVideoSampleImageURL,
  getBypassVideoSampleImageURL,
  getVideoSampleImageURL,
};

export default PostUtils;
