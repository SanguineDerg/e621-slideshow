import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUsername, setLogin } from "../../slices/settingsSlice";
import { switchScreen } from "../../slices/viewSlice";

export default function Settings() {
  const [username, setLocalUsername] = useState('');
  const [apiKey, setLocalAPIKey] = useState('');

  const currentUsername = useAppSelector(selectUsername);
  
  const dispatch = useAppDispatch();

  const saveLogin = () => {
    dispatch(setLogin({username: username, apiKey: apiKey}));
  }

  const close = () => {
    dispatch(switchScreen('search'));
  }

  return (
    <div>
      <span>{currentUsername !== '' ? `Logged in as ${currentUsername}` : 'Not logged in'}</span><br/>
      <input value={username} onChange={e => setLocalUsername(e.target.value)} type="text" /><br/>
      <input value={apiKey} onChange={e => setLocalAPIKey(e.target.value)} type="password" /><br/>
      <button onClick={saveLogin}>Save Login</button><br/>
      <button onClick={close}>Close</button>
    </div>
  );
}