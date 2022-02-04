import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { nextPage, previousPage, selectCurrentGalleryPosts, selectFetchError, selectFetchErrorHint, selectFetchStatus, selectGalleryIndexOffset, selectSlideshowIndex, jumpToSlide } from '../../slices/postsSlice';
import { switchScreen } from '../../slices/viewSlice';
import styles from './Gallery.module.css';
import { GalleryPreview } from './GalleryPreview';

export function Gallery() {
  const dispatch = useAppDispatch();
  const currentGallery = useAppSelector(selectCurrentGalleryPosts);
  const galleryOffset = useAppSelector(selectGalleryIndexOffset);
  const currentSlideshowIndex = useAppSelector(selectSlideshowIndex);

  const status = useAppSelector(selectFetchStatus);
  const error = useAppSelector(selectFetchError);
  const errorHint = useAppSelector(selectFetchErrorHint);

  const goNextPage = useCallback(() => {
    dispatch(nextPage());
  }, [dispatch]);

  const goPrevPage = useCallback(() => {
    dispatch(previousPage());
  }, [dispatch]);

  const openSlideshowTo = useCallback((postIndex: number) => {
    dispatch(jumpToSlide(postIndex));
    dispatch(switchScreen('slideshow'));
  }, [dispatch]);

  return (
    <div className={styles.galleryContainer}>
      Gallery
      <button onClickCapture={goPrevPage}>Prev Page</button>
      <button onClickCapture={goNextPage}>Next Page</button>
      <div className={styles.galleryPreviews}>
        {currentGallery.map((post, index) => (
          <GalleryPreview post={post} selected={galleryOffset + index === currentSlideshowIndex}
           onClick={() => openSlideshowTo(galleryOffset + index)} key={post.id} />
        ))}
      </div>
      <button onClickCapture={goPrevPage}>Prev Page</button>
      <button onClickCapture={goNextPage}>Next Page</button>
    </div>
  );
}