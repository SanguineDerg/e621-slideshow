import styles from './Display.module.css';

export function Display() {
  return (
    <div className={styles.displayContainer}>
      <img className={styles.image} src="https://static1.e621.net/data/mascot_bg/esix2.jpg" alt="" />
    </div>
  );
}