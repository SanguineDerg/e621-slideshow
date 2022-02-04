import { Post } from '../../api/e621/interfaces/posts';
import PostUtils from '../../api/e621/utils/posts';
import styles from './GalleryPreview.module.css';


interface GalleryPreviewProps {
  post: Post;
  selected: boolean;
  onClick: ()=>void;
}


export function GalleryPreview(props: GalleryPreviewProps) {
  return (
    <button onClick={props.onClick}
        className={props.selected ? `${styles.preview} ${styles.selected}` : styles.preview}>
      <img className={styles.previewImage} src={PostUtils.getPreviewURL(props.post)} alt="" />
    </button>
  );
}