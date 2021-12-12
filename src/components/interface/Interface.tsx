import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextSlideAndPrefetch, previousSlideAndPrefetch, selectCurrentSlideshowPost } from '../../slices/postsSlice';
import { switchScreen } from '../../slices/viewSlice';
import styles from './Interface.module.css';
import ManageSetButton from './ManageSetButton';

export function Interface() {
  const dispatch = useAppDispatch();

  const currentPost = useAppSelector(selectCurrentSlideshowPost);

  return (
    <div className={styles.interfaceContainer}>
      <div className={styles.mainControls}>
        <div className={styles.nextSlide} onClick={() => dispatch(nextSlideAndPrefetch())}>Next</div>
        <div className={styles.previousSlide} onClick={() => dispatch(previousSlideAndPrefetch())}>Previous</div>
        <div className={styles.exitSlideshow} onClick={() => dispatch(switchScreen('search'))}>Close</div>
        <a className={styles.viewSource} target="_blank" rel="noopener noreferrer" {...(currentPost === null ? {onClick: () => {}} : {href: `https://e621.net/posts/${currentPost.id}`})}>Link</a>
      </div>
      <div className={styles.extraControls}>
        <ManageSetButton />
      </div>
    </div>
  );
}