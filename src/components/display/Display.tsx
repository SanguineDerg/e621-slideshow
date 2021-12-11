import { useSelector } from 'react-redux';
import { Post } from '../../api/e621/interfaces/posts';
import { selectCurrentSlideshowPost } from '../../slices/postsSlice';
import styles from './Display.module.css';

function getFiletype(post: Post | null) {
  if (post === null) return null;
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

function getBypassURL(post: Post) {
  const md5 = post.file.md5;
  return `https://static1.e621.net/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`;
}

export function Display() {
  const currentPost = useSelector(selectCurrentSlideshowPost);

  const currentFiletype = getFiletype(currentPost);

  return (
    <div className={styles.displayContainer}>
      {currentFiletype === 'image' && (
        <img className={styles.image} src={currentPost !== null ? (currentPost.file.url || getBypassURL(currentPost)) : undefined} alt="" />
      )}
      {currentFiletype === 'video' && (
        <div className={styles.text}><span>Video</span></div>
      )}
      {currentFiletype === 'flash' && (
        <div className={styles.text}><span>Flash</span></div>
      )}
    </div>
  );
}