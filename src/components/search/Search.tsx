import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { startSearchAndFetch } from "../../slices/postsSlice";
import { switchScreen } from "../../slices/viewSlice";

export default function Search() {
  const [tags, setTags] = useState('');
  const dispatch = useAppDispatch();

  const submit = () => {
    dispatch(startSearchAndFetch(tags));
    dispatch(switchScreen('slideshow'));
  }

  const openSettings = () => {
    dispatch(switchScreen('settings'));
  }

  const close = () => {
    dispatch(switchScreen('slideshow'));
  }

  return (
    <div>
      <input value={tags} onChange={e => setTags(e.target.value)} type="text" /><br/>
      <button onClick={submit}>Search</button><br/>
      <button onClick={close}>Close</button><br/>
      <button onClick={openSettings}>Settings</button>
    </div>
  );
}