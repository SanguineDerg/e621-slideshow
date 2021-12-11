import { Post } from '../../api/e621/interfaces/posts';
import { useAppSelector } from '../../app/hooks';
import { selectCachePosts } from '../../slices/postsSlice';
import styles from './Cache.module.css';

function getBypassURL(post: Post) {
  const md5 = post.file.md5;
  return `https://static1.e621.net/data/${md5.substring(0, 2)}/${md5.substring(2, 4)}/${md5}.${post.file.ext}`;
}

export default function Cache() {
  const cachePosts = useAppSelector(selectCachePosts);

  return (
    <div className={styles.cache}>
      {cachePosts.map(post => {
        return ['jpg', 'png', 'gif'].includes(post.file.ext) && (<img key={post.id} src={post.file.url || getBypassURL(post)} alt="" />) 
      })}
    </div>
  );
}
