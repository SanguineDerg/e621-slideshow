import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ImageDisplaySize, selectImageDisplaySize, selectUsername, setImageDisplaySize, setLogin } from "../../slices/settingsSlice";
import { fetchManagedSets, fetchWorkingSet, selectManagedSets, selectWorkingSetId, setWorkingSetId } from "../../slices/setSlice";
import { switchScreen } from "../../slices/viewSlice";

export default function Settings() {
  const [username, setLocalUsername] = useState('');
  const [apiKey, setLocalAPIKey] = useState('');

  const currentUsername = useAppSelector(selectUsername);
  const currentImageDisplaySize = useAppSelector(selectImageDisplaySize);
  const managedSets = useAppSelector(selectManagedSets);
  const workingSetId = useAppSelector(selectWorkingSetId);
  
  const dispatch = useAppDispatch();

  const saveLogin = () => {
    dispatch(setLogin({username: username, apiKey: apiKey}));
  }

  const close = () => {
    dispatch(fetchWorkingSet());
    dispatch(switchScreen('search'));
  }

  return (
    <div>
      <span>{currentUsername !== '' ? `Logged in as ${currentUsername}` : 'Not logged in'}</span><br/>
      <input value={username} onChange={e => setLocalUsername(e.target.value)} type="text" /><br/>
      <input value={apiKey} onChange={e => setLocalAPIKey(e.target.value)} type="password" /><br/>
      <button onClick={saveLogin}>Save Login</button><hr/>
      <select value={currentImageDisplaySize} onChange={e => dispatch(setImageDisplaySize(e.target.value as ImageDisplaySize))}>
        <option value="full">Full Image</option>
        <option value="sample">Sample Image</option>
      </select><hr/>
      <button onClick={() => dispatch(fetchManagedSets())}>Get sets</button><br/>
      {managedSets !== null && (
        <>
          <select value={workingSetId !== null ? workingSetId : undefined} onChange={e => dispatch(setWorkingSetId(e.target.value !== "" ? parseInt(e.target.value) : null))}>
            <option>Select a set</option>
            <optgroup label="Owned">
              {managedSets.Owned.map(([setName, setId], index) => (
                <option value={setId} key={index}>{setName}</option>
              ))}
            </optgroup>
            <optgroup label="Owned">
              {managedSets.Maintained.map(([setName, setId], index) => (
                <option value={setId} key={index}>{setName}</option>
              ))}
            </optgroup>
          </select><hr/>
        </>
      )}
      <button onClick={close}>Close</button>
    </div>
  );
}