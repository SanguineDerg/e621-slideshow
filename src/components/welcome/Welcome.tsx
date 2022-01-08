import { useDispatch } from 'react-redux';
import { closeWelcome } from '../../slices/tutorialSlice';
import styles from './Welcome.module.css';

export function Welcome() {
  const dispatch = useDispatch();

  return (
    <div className={styles.welcomeContainer}>
      <h1>Welcome</h1>
      <div className={styles.welcomeBody}>
        <p>
          This is an e621.net slideshow I designed for use on mobile devices.
          <br/>
          I will eventually add a tutorial for the controls and features of the app.
          <br/>
          If you have any suggestions, I'd love to hear your feedback.
          <br/>
          <a href="https://e621.net/users/913613" target="_blank" rel="noopener noreferrer">My socials are on e621.</a>
        </p>
        <button onClick={() => dispatch(closeWelcome())}>Start</button>
      </div>
    </div>
  );
}