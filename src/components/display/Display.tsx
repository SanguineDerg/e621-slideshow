import { useSelector } from 'react-redux';
import { getPostMediaType, getPostMediaURL } from '../../api/e621/posts';
import { selectCurrentSlideshowPost } from '../../slices/postsSlice';
import styles from './Display.module.css'

export function Display() {
  const currentPost = useSelector(selectCurrentSlideshowPost);

  const currentFiletype = currentPost !== null ? getPostMediaType(currentPost) : null;

  return (
    <div className={styles.displayContainer}>
      {currentFiletype === 'image' && (
        <img className={styles.image} src={currentPost !== null ? (getPostMediaURL(currentPost)) : undefined} alt="" />
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