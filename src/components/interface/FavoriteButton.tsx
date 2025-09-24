import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ExtraButtonIcon } from '../../common/buttons';
import { favoritePost, unfavoritePost, selectCurrentSlideshowPost, selectCurrentSlideshowPostId } from '../../slices/postsSlice';
import { selectSetManagementButtonType } from '../../slices/settingsSlice';
import styles from './FavoriteButton.module.css';

export default function ManageSetButton() {
  const currentPost = useAppSelector(selectCurrentSlideshowPost);
  const currentPostId = useAppSelector(selectCurrentSlideshowPostId);
  const buttonType = useAppSelector(selectSetManagementButtonType);

  const [icon, setIcon] = useState<ExtraButtonIcon>('unfavorited');
  const [className, setClassName] = useState<string>(styles.manageSetButton);
  const [backgroundColor, setBackgroundColor] = useState('transparent')

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIcon(currentPost?.is_favorited ? 'favorited' : 'unfavorited');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPost]);

  useEffect(() => {
    switch (buttonType) {
      case 'mobile':
        setClassName(`${styles.favoriteButton} ${styles.mobile}`);
        break;
      case 'desktop':
      default:
        setClassName(styles.favoriteButton);
        break;
    }
  }, [buttonType]);

  const favorite = useCallback(() => {
    if (currentPostId === null || currentPost === null || currentPost.is_favorited) return;
    dispatch(favoritePost(currentPostId));
  }, [dispatch, currentPostId, currentPost]);

  const unfavorite = useCallback(() => {
    if (currentPostId === null || currentPost === null || !currentPost.is_favorited) return;
    dispatch(unfavoritePost(currentPostId));
  }, [dispatch, currentPostId, currentPost]);

  const toggleFavorite = useCallback(() => {
    if (currentPostId === null || currentPost === null) return;
    if (currentPost.is_favorited) {
      dispatch(unfavoritePost(currentPostId));
    } else {
      dispatch(favoritePost(currentPostId));
    }
  }, [dispatch, currentPostId, currentPost]);

  const keydownHandler = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;
    switch (e.code) {
      case 'KeyF':
        toggleFavorite();
        return;
      default: return;
    }
  }, [toggleFavorite]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler, true);
    return () => window.removeEventListener('keydown', keydownHandler, true);
  }, [keydownHandler]);

  const handleClick = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);
  
  if (currentPostId === null || currentPost === null) return null;

  return (
    <button className={className} onClick={handleClick} style={{backgroundImage: `url("${process.env.PUBLIC_URL}/buttons/${icon}.png")`, backgroundColor: backgroundColor}}>
    </button>
  );
}