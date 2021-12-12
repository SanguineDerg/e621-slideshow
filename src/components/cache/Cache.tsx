import { getPostMediaType, getPostMediaURL } from '../../api/e621/posts';
import { useAppSelector } from '../../app/hooks';
import { selectCachePosts } from '../../slices/postsSlice';
import styles from './Cache.module.css';

export default function Cache() {
  const cachePosts = useAppSelector(selectCachePosts);

  return (
    <div className={styles.cache}>
      {cachePosts.map(post => {
        return (getPostMediaType(post) === 'image') && (<img key={post.id} src={getPostMediaURL(post)} alt="" />);
      })}
    </div>
  );
}
