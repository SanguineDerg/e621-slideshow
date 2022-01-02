import { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { switchScreen } from "../../slices/viewSlice";
import styles from "./About.module.css";

export default function About() {
  const dispatch = useAppDispatch();

  const close = useCallback(() => {
    dispatch(switchScreen('search'));
  }, [dispatch]);

  return (
    <div className={styles.aboutContainer}>
      <h1>About</h1>
      <div className={styles.aboutBody}>
        <p>
          This is a slideshow web app for <a href="https://e621.net/">e621.net</a> designed with mobile compatability in mind.
        </p>
        <p>
          <a href="https://github.com/SanguineDerg/e621-slideshow">Source Code</a>
        </p>
        <button type="button" onClick={close}>Close</button>
      </div>
    </div>
  );
}