import { useAppDispatch } from '../../app/hooks';
import { switchScreen } from '../../features/view/viewSlice';
import styles from './Interface.module.css';

export function Interface() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.interfaceContainer}>
      <div className={styles.mainControls}>
        <div className={styles.nextSlide}>Next</div>
        <div className={styles.previousSlide}>Previous</div>
        <div className={styles.exitSlideshow} onClick={() => dispatch(switchScreen('search'))}>Close</div>
        <a className={styles.viewSource} target="_blank" rel="noopener noreferrer" href="https://e621.net/">Link</a>
      </div>
    </div>
  );
}