import { PropsWithChildren } from 'react';
import styles from './View.module.css';

interface ViewProps {
  visible?: boolean;
  disabled?: boolean;
}

export default function View({visible = true, disabled = false, children}: PropsWithChildren<ViewProps>) {
  return (
    <div className={styles.view + ' ' + (visible ? styles.visible : styles.hidden)}>
      {!disabled && children}
    </div>
  );
}