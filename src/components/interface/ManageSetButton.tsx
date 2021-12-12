import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCurrentPostToSet, selectIsCurrentPostInSet } from "../../slices/setSlice";
import styles from './ManageSetButton.module.css';

export default function ManageSetButton() {
  const dispatch = useAppDispatch();

  const isPostInSet = useAppSelector(selectIsCurrentPostInSet);

  return (
    <button className={styles.manageSetButton} onClick={() => dispatch(addCurrentPostToSet())}>{isPostInSet ? '➖' : '➕'}</button>
  );
}