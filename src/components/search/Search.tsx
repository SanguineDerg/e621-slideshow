import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { startSearchAndFetch } from "../../slices/postsSlice";
import { switchScreen } from "../../slices/viewSlice";

export default function Search() {
  const [tags, setTags] = useState('');
  const dispatch = useAppDispatch();

  const submit = (e: FormEvent) => {
    dispatch(startSearchAndFetch(tags));
    dispatch(switchScreen('slideshow'));
    e.preventDefault();
  }

  const openSettings = () => {
    dispatch(switchScreen('settings'));
  }

  const close = () => {
    dispatch(switchScreen('slideshow'));
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={tags} onChange={e => setTags(e.target.value)} type="text" /><br/>
        <button type="submit">Search</button><br/>
        <button type="button" onClick={close}>Close</button><br/>
        <button type="button" onClick={openSettings}>Settings</button>
      </form>
    </div>
  );
}