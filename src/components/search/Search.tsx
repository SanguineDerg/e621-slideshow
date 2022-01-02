import { FormEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { startSearchAndFetch } from "../../slices/postsSlice";
import { switchScreen } from "../../slices/viewSlice";
import styles from "./Search.module.css";

export default function Search() {
  const [tags, setTags] = useState('');
  const dispatch = useAppDispatch();

  const submit = useCallback((e: FormEvent) => {
    dispatch(startSearchAndFetch(tags));
    dispatch(switchScreen('slideshow'));
    e.preventDefault();
  }, [dispatch, tags]);

  const openSettings = useCallback(() => {
    dispatch(switchScreen('settings'));
  }, [dispatch]);

  const openAbout = useCallback(() => {
    dispatch(switchScreen('about'));
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch(switchScreen('slideshow'));
  }, [dispatch]);

  return (
    <div className={styles.searchContainer}>
      <h1>Search</h1>
      <form onSubmit={submit} className={styles.searchForm}>
        <input value={tags} onChange={e => setTags(e.target.value)} type="text" placeholder="rating:s ..." />
        <button type="submit">Search</button>
        <button type="button" onClick={close}>Close</button>
        <button type="button" onClick={openSettings}>Settings</button>
        <button type="button" onClick={openAbout}>About</button>
      </form>
    </div>
  );
}