import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUsername, setLogin } from "../../slices/settingsSlice";
import { switchScreen } from "../../slices/viewSlice";

export default function Settings() {
  const [username, setLocalUsername] = useState(useAppSelector(selectUsername));
  const [apiKey, setLocalAPIKey] = useState(useAppSelector(selectUsername));
  
  const dispatch = useAppDispatch();

  const saveLogin = () => {
    dispatch(setLogin({username: username, apiKey: apiKey}));
  }

  const close = () => {
    dispatch(switchScreen('search'));
  }

  return (
    <div>
      <input value={username} onChange={e => setLocalUsername(e.target.value)} type="text" />
      <input value={apiKey} onChange={e => setLocalAPIKey(e.target.value)} type="text" />
      <button onClick={saveLogin}>Save Login</button>
      <button onClick={close}>Close</button>
    </div>
  );
}