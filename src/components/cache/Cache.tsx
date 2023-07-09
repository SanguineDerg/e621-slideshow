import { getPostMediaType, getPostImageUrl, getPostVideoPreviewUrl } from '../../api/e621/posts';
import { useAppSelector } from '../../app/hooks';
import { selectCachePosts } from '../../slices/postsSlice';
import styles from './Cache.module.css';

export default function Cache() {
  const cachePosts = useAppSelector(selectCachePosts);

  return (
    <div className={styles.cache}>
      {cachePosts.map(post => {
        switch (getPostMediaType(post)) {
          case 'image':
            return (<img key={post.id} src={getPostImageUrl(post)} alt="" />);
          case 'video':
            return (<img key={post.id} src={getPostVideoPreviewUrl(post)} alt="" />);
          default:
            return null;
        }
      })}
    </div>
  );
}
