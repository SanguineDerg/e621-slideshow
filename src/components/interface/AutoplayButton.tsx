import { useCallback, useEffect, useState } from 'react';
import { useAnimationFrame, useAppDispatch, useAppSelector } from '../../app/hooks';
import { firstSlide, nextSlideAndPrefetch, selectSlideshowIndex, selectSlideshowLength } from '../../slices/postsSlice';
import { selectAutoplayDelay, selectAutoplayLoop, selectSetManagementButtonType } from '../../slices/settingsSlice';
import styles from './AutoplayButton.module.css';

export default function AutoplayButton() {
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector(selectSlideshowIndex);
  const slideshowLength = useAppSelector(selectSlideshowLength);
  const buttonType = useAppSelector(selectSetManagementButtonType);
  const autoplayDelay = useAppSelector(selectAutoplayDelay) * 1000;
  const autoplayLoop = useAppSelector(selectAutoplayLoop);

  const className = buttonType === 'mobile' ? `${styles.autoplayButton} ${styles.mobile}` : styles.autoplayButton;

  const [enableAutoplay, setEnableAutoplay] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  
  const restartSlideshow = useCallback(() => {
    dispatch(firstSlide());
  }, [dispatch]);

  const nextSlide = useCallback(() => {
    dispatch(nextSlideAndPrefetch());
  }, [dispatch]);

  useEffect(() => {
    if (!enableAutoplay) return;
    if (currentIndex + 1 >= slideshowLength && !autoplayLoop) {
      setEnableAutoplay(false);
      return;
    }
    setAutoplayProgress(0);
    const timeout = setTimeout(() => {
      if (currentIndex + 1 >= slideshowLength && autoplayLoop) {
        restartSlideshow();
      } else {
        nextSlide();
      }
    }, autoplayDelay);
    return () => clearTimeout(timeout);
  }, [enableAutoplay, nextSlide, autoplayDelay, currentIndex, autoplayLoop, restartSlideshow]);

  const toggleAutoplay = useCallback(() => {
    setEnableAutoplay(!enableAutoplay);
  }, [enableAutoplay, setEnableAutoplay]);

  useAnimationFrame((deltaTime) => {
    setAutoplayProgress(prevProgress => prevProgress + deltaTime);
  });

  const keydownHandler = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;
    switch (e.code) {
      case 'ControlRight':
      case 'Numpad0':
      case 'Space':
        toggleAutoplay();
        return;
      default: return;
    }
  }, [toggleAutoplay]);
  
  useEffect(() => {
    window.addEventListener('keydown', keydownHandler, true);
    return () => window.removeEventListener('keydown', keydownHandler, true);
  }, [keydownHandler]);

  return (
    <button className={className} onClick={toggleAutoplay}>
      {enableAutoplay && autoplayProgress >= autoplayDelay && (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className={styles.autoplayProgress}
        >
          <circle transform="rotate(-90) translate(-100)"
            r="25%" cx="50%" cy="50%" style={{strokeDasharray: `158 158`}}></circle>
        </svg>
      )}
      {enableAutoplay && autoplayProgress > 0 && autoplayProgress < autoplayDelay && (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className={styles.autoplayProgress}
        >
          <circle transform="rotate(-90) translate(-100)"
            r="25%" cx="50%" cy="50%" style={{strokeDasharray: `${autoplayProgress / autoplayDelay * 158} 158`}}></circle>
        </svg>
      )}
    </button>
  );
}