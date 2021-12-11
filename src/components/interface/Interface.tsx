import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentSlideshowPost } from '../../slices/postsSlice';
import { switchScreen } from '../../slices/viewSlice';
import styles from './Interface.module.css';

export function Interface() {
  const dispatch = useAppDispatch();

  const currentPost = useAppSelector(selectCurrentSlideshowPost);

  return (
    <div className={styles.interfaceContainer}>
      <div className={styles.mainControls}>
        <div className={styles.nextSlide}>Next</div>
        <div className={styles.previousSlide}>Previous</div>
        <div className={styles.exitSlideshow} onClick={() => dispatch(switchScreen('search'))}>Close</div>
        <a className={styles.viewSource} target="_blank" rel="noopener noreferrer" href={currentPost === null ? '#' : `https://e621.net/posts/${currentPost.id}`}>Link</a>
      </div>
    </div>
  );
}