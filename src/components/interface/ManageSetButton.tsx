import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrentSlideshowPostId, selectIsCurrentPostInSet } from "../../slices/postsSlice";
import { addCurrentPostToSet, removeCurrentPostFromSet, selectUpdateSetStatus, selectWorkingSet } from "../../slices/setSlice";
import styles from './ManageSetButton.module.css';

export default function ManageSetButton() {
  const updateSetState = useAppSelector(selectUpdateSetStatus);
  const currentPostId = useAppSelector(selectCurrentSlideshowPostId);
  const isPostInSet = useAppSelector(selectIsCurrentPostInSet);
  const workingSet = useAppSelector(selectWorkingSet);

  const [icon, setIcon] = useState('🗑️');
  const [timeout, setTimeoutVar] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const cancelTimeout = () => {
      if (timeout !== null) {
        clearTimeout(timeout);
        setTimeoutVar(null);
      }
    };
    switch (updateSetState) {
      case 'idle':
      case 'added':
      case 'removed':
        cancelTimeout();
        setIcon(isPostInSet ? '➖' : '➕');
        break;
      case 'working':
        cancelTimeout();
        setIcon('🔄');
        break;
      case 'failed':
        cancelTimeout();
        setIcon('❌');
        setTimeoutVar(setTimeout(() => {
          setIcon(isPostInSet ? '➖' : '➕');
        }, 2000));
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSetState, isPostInSet]);

  const tryAddToSet = useCallback(() => {
    if (currentPostId === null || updateSetState === 'working' || isPostInSet) return;
    dispatch(addCurrentPostToSet(currentPostId));
  }, [dispatch, currentPostId, updateSetState, isPostInSet]);

  const tryRemoveFromSet = useCallback(() => {
    if (currentPostId === null || updateSetState === 'working' || !isPostInSet) return;
    dispatch(removeCurrentPostFromSet(currentPostId));
  }, [dispatch, currentPostId, updateSetState, isPostInSet]);

  const keydownHandler = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;
    switch (e.key) {
      case "ArrowUp":
        tryAddToSet();
        return;
      case "ArrowDown":
        tryRemoveFromSet();
        return;
      default: return;
    }
  }, [tryAddToSet, tryRemoveFromSet]);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler, true);
    return () => window.removeEventListener("keydown", keydownHandler, true);
  }, [keydownHandler]);
  
  if (currentPostId === null || workingSet === null) return null;

  const handleClick = () => {
    if (updateSetState === 'working') return;
    if (isPostInSet) {
      dispatch(removeCurrentPostFromSet(currentPostId));
    } else {
      dispatch(addCurrentPostToSet(currentPostId));
    }
  }

  return (
    <button className={styles.manageSetButton} onClick={handleClick}>{icon}</button>
  );
}