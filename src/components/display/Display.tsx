import { useSelector } from 'react-redux';
import { getPostMediaType, getPostMediaURL } from '../../api/e621/posts';
import { selectCurrentSlideshowPost, selectFetchStatus } from '../../slices/postsSlice';
import styles from './Display.module.css'

export function Display() {
  const currentPost = useSelector(selectCurrentSlideshowPost);
  const status = useSelector(selectFetchStatus);
  const error = useSelector(selectFetchError);

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
      {currentFiletype === null && status === 'loading' && (
        <div className={styles.text}><span>Loading</span></div>
      )}
      {currentFiletype === null && error !== null && (
        <div className={styles.text}><span>An error occurred: {error}</span></div>
      )}
    </div>
  );
}