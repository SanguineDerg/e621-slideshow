import { PropsWithChildren } from 'react';
import styles from './View.module.css';

interface ViewProps {
  visible: boolean;
}

export default function View(props: PropsWithChildren<ViewProps>) {
  return (
    <div className={styles.view + ' ' + (props.visible ? styles.visible : styles.hidden)}>
      {props.children}
    </div>
  );
}