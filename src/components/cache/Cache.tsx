import { useCallback } from 'react';
import PostUtils from '../../api/e621/utils/posts';
import { useAppSelector } from '../../app/hooks';
import { selectCachePosts, selectCurrentGalleryPosts } from '../../slices/postsSlice';
import { selectImageDisplaySize } from '../../slices/settingsSlice';
import styles from './Cache.module.css';

export default function Cache() {
  const cachePosts = useAppSelector(selectCachePosts);
  const galleryPosts = useAppSelector(selectCurrentGalleryPosts);

  const imageSizePreference = useAppSelector(selectImageDisplaySize);
  const md5Bypass = true;  // TODO add setting

  const getPostMedia = useCallback(
    (post) => {
      switch (PostUtils.getMediaType(post)) {
        case 'image':
          return PostUtils.getImageURL(post, imageSizePreference, md5Bypass);
        case 'video':
          return PostUtils.getVideoSampleImageURL(post, md5Bypass);
        case 'flash':
        default:
          return undefined;
      }
    },
    [imageSizePreference, md5Bypass]
  )

  return (
    <div className={styles.cache}>
      {cachePosts.map(post => 
        (<img key={post.id} src={getPostMedia(post)} alt="" />)
      )}
      {galleryPosts.map(post => 
        (<img key={post.id} src={PostUtils.getPreviewURL(post, md5Bypass)} alt="" />)
      )}
    </div>
  );
}
