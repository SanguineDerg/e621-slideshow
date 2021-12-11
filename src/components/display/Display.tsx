import { useSelector } from 'react-redux';
import { selectCurrentSlideshowPost } from '../../slices/postsSlice';
import styles from './Display.module.css';

export function Display() {
  const currentPost = useSelector(selectCurrentSlideshowPost);

  return (
    <div className={styles.displayContainer}>
      <img className={styles.image} src={currentPost?.file.url} alt="" />
    </div>
  );
}