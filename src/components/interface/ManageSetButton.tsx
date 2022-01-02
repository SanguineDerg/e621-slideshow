import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ButtonIcon } from '../../common/buttons';
import { selectCurrentSlideshowPostId, selectIsCurrentPostInSet } from '../../slices/postsSlice';
import { addCurrentPostToSet, removeCurrentPostFromSet, selectUpdateSetStatus, selectWorkingSet } from '../../slices/setSlice';
import { selectSetManagementButtonType } from '../../slices/settingsSlice';
import styles from './ManageSetButton.module.css';

export default function ManageSetButton() {
  const updateSetState = useAppSelector(selectUpdateSetStatus);
  const currentPostId = useAppSelector(selectCurrentSlideshowPostId);
  const isPostInSet = useAppSelector(selectIsCurrentPostInSet);
  const workingSet = useAppSelector(selectWorkingSet);
  const buttonType = useAppSelector(selectSetManagementButtonType);

  const [icon, setIcon] = useState<ButtonIcon>('empty');
  const [className, setClassName] = useState<string>(styles.manageSetButton);
  const [backgroundColor, setBackgroundColor] = useState('transparent')

  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (updateSetState) {
      case 'idle':
      case 'added':
      case 'removed':
        setBackgroundColor('transparent');
        setIcon(isPostInSet ? 'remove' : 'add');
        break;
      case 'working':
        setBackgroundColor('transparent');
        setIcon('working');
        break;
      case 'failed':
        setBackgroundColor('rgba(255,0,0,0.1)');
        setIcon(isPostInSet ? 'remove' : 'add');
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSetState, isPostInSet]);

  useEffect(() => {
    switch (buttonType) {
      case 'mobile':
        setClassName(`${styles.manageSetButton} ${styles.mobile}`);
        break;
      case 'desktop':
      default:
        setClassName(styles.manageSetButton);
        break;
    }
  }, [buttonType]);

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
      case 'ArrowUp':
        tryAddToSet();
        return;
      case 'ArrowDown':
        tryRemoveFromSet();
        return;
      default: return;
    }
  }, [tryAddToSet, tryRemoveFromSet]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler, true);
    return () => window.removeEventListener('keydown', keydownHandler, true);
  }, [keydownHandler]);

  const handleClick = useCallback(() => {
    if (updateSetState === 'working' || currentPostId === null) return;
    if (isPostInSet) {
      dispatch(removeCurrentPostFromSet(currentPostId));
    } else {
      dispatch(addCurrentPostToSet(currentPostId));
    }
  }, [dispatch, currentPostId, isPostInSet, updateSetState]);
  
  if (currentPostId === null || workingSet === null) return null;

  return (
    <button className={className} onClick={handleClick} style={{backgroundImage: `url("${process.env.PUBLIC_URL}/buttons/${icon}.svg")`, backgroundColor: backgroundColor}}>
    </button>
  );
}