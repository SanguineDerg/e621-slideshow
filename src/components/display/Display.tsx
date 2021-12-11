import { useSelector } from 'react-redux';
import { Post } from '../../api/e621/interfaces/posts';
import { selectCurrentSlideshowPost } from '../../slices/postsSlice';
import styles from './Display.module.css';

type Filetype = 'image' | 'video' | 'flash';

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

export function Display() {
  const currentPost = useSelector(selectCurrentSlideshowPost);

  const currentFiletype = getFiletype(currentPost);

  return (
    <div className={styles.displayContainer}>
      {currentFiletype === 'image' && (
        <img className={styles.image} src={currentPost?.file.url} alt="" />
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