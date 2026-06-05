import { useSelector } from 'react-redux';
import { getPostImageUrl, getPostMediaType, getPostVideoPreviewUrl } from '../../api/e621/posts';
import { selectCurrentSlideshowPost, selectFetchError, selectFetchErrorHint, selectFetchStatus } from '../../slices/postsSlice';
import styles from './Display.module.css'

export function Display() {
  const currentPost = useSelector(selectCurrentSlideshowPost);
  const status = useSelector(selectFetchStatus);
  const error = useSelector(selectFetchError);
  const errorHint = useSelector(selectFetchErrorHint);

  const currentFiletype = currentPost !== null ? getPostMediaType(currentPost) : null;
  // const videoDisplayMode = useSelector(selectVideoDisplayMode);
  // TODO: support embedded video

  return (
    <div className={styles.displayContainer}>
      {currentPost !== null && currentFiletype === 'image' && (
        <img className={styles.image} src={getPostImageUrl(currentPost)} alt="" />
      )}
      {currentPost !== null && currentFiletype === 'video' && (
        <div className={styles.text} style={{backgroundImage: `url("${getPostVideoPreviewUrl(currentPost)}")`}}>
          <span>
            Video
          </span>
        </div>
      )}
      {currentFiletype === 'flash' && (
        <div className={styles.text}>
          <span>
            Flash (unsupported)
          </span>
        </div>
      )}
      {currentFiletype === 'unsupported' && (
        <div className={styles.text}>
          <span>
            Unsupported file extension, report this issue on github.
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
      {/* This condition only applies when a search has no results */}
      {currentFiletype === null && status === 'finished' && (
        <div className={styles.text}>
          <span>
            No results
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