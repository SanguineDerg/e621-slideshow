import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { startSearch, tryFetchPosts } from "../../slices/postsSlice";
import { switchScreen } from "../../slices/viewSlice";

export default function Search() {
  const [tags, setTags] = useState('');
  const dispatch = useAppDispatch();

  const submit = () => {
    dispatch(startSearch(tags));
    dispatch(tryFetchPosts());
    dispatch(switchScreen('slideshow'));
  }

  return (
    <div>
      <input value={tags} onChange={e => setTags(e.target.value)} type="text" />
      <button onClick={submit}>Search</button>
    </div>
  );
}