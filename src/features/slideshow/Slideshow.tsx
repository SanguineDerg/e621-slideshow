import { Display } from '../display/Display';
import { Interface } from '../interface/Interface';
import styles from './Slideshow.module.css';

export function Slideshow() {
  return (
    <div className={styles.slideshowContainer}>
      <Display />
      <Interface />
    </div>
  );
}