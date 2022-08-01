import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextSlideAndPrefetch, previousSlideAndPrefetch, selectCurrentSlideshowPost } from '../../slices/postsSlice';
import { switchScreen } from '../../slices/viewSlice';
import styles from './Interface.module.css';
import ManageSetButton from './ManageSetButton';

export function Interface() {
  const dispatch = useAppDispatch();

  const currentPost = useAppSelector(selectCurrentSlideshowPost);
  
  const nextSlide = useCallback(() => {
    dispatch(nextSlideAndPrefetch());
  }, [dispatch]);
  
  const prevSlide = useCallback(() => {
    dispatch(previousSlideAndPrefetch());
  }, [dispatch]);

  const keydownHandler = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;
    switch (e.key) {
      case 'ArrowLeft':
        prevSlide();
        return;
      case 'ArrowRight':
        nextSlide();
        return;
      default: return;
    }
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler, true);
    return () => window.removeEventListener('keydown', keydownHandler, true);
  }, [keydownHandler]);

  return (
    <div className={styles.interfaceContainer}>
      <div className={styles.mainControls}>
        <div className={styles.nextSlide} onClick={nextSlide}>Next</div>
        <div className={styles.previousSlide} onClick={prevSlide}>Previous</div>
        <div className={styles.exitSlideshow} onClick={() => dispatch(switchScreen('search'))}>Close</div>
        <a className={styles.viewSource} target="_blank" rel="noopener noreferrer" {...(currentPost === null ? {onClick: () => {}} : {href: `https://e621.net/posts/${currentPost.id}`})}>Link</a>
      </div>
      <div className={styles.extraControls}>
        <ManageSetButton />
      </div>
    </div>
  );
}