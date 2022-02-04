import PostUtils from '../../api/e621/utils/posts';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentSlideshowPost, selectFetchError, selectFetchErrorHint, selectFetchStatus } from '../../slices/postsSlice';
import { selectImageDisplaySize } from '../../slices/settingsSlice';
import styles from './Display.module.css'

export function Display() {
  const currentPost = useAppSelector(selectCurrentSlideshowPost);

  const imageSizePreference = useAppSelector(selectImageDisplaySize);
  const md5Bypass = true;  // TODO add setting

  const status = useAppSelector(selectFetchStatus);
  const error = useAppSelector(selectFetchError);
  const errorHint = useAppSelector(selectFetchErrorHint);

  const currentFiletype = currentPost !== null ? PostUtils.getMediaType(currentPost) : null;

  return (
    <div className={styles.displayContainer}>
      {currentFiletype === 'image' && (
        <img className={styles.image} src={currentPost !== null ? (PostUtils.getImageURL(currentPost, imageSizePreference, md5Bypass)) : undefined} alt="" />
      )}
      {currentFiletype === 'video' && (
        <div className={styles.text}>
          <span>
            Video
          </span>
        </div>
      )}
      {currentFiletype === 'flash' && (
        <div className={styles.text}>
          <span>
            Flash
          </span>
        </div>
      )}
      {currentFiletype === null && status === 'loading' && (
        <div className={styles.text}>
          <span>
            Loading
          </span>
        </div>
      )}
      {currentFiletype === null && error !== null && (
        <div className={styles.text}>
          <span>
            An error occurred: {error}
          </span>
          <span>
            {errorHint}
          </span>
        </div>
      )}
    </div>
  );
}