import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ImageDisplaySize, selectImageDisplaySize, selectSetManagementButtonType, selectUsername, setImageDisplaySize, setLogin, SetManagementButtonType, setSetManagementButtonType } from "../../slices/settingsSlice";
import { fetchManagedSets, fetchWorkingSet, selectManagedSets, selectWorkingSetId, setWorkingSetId } from "../../slices/setSlice";
import { switchScreen } from "../../slices/viewSlice";
import styles from "./Settings.module.css";

export default function Settings() {
  const [username, setLocalUsername] = useState('');
  const [apiKey, setLocalAPIKey] = useState('');

  const currentUsername = useAppSelector(selectUsername);
  const currentImageDisplaySize = useAppSelector(selectImageDisplaySize);
  const managedSets = useAppSelector(selectManagedSets);
  const workingSetId = useAppSelector(selectWorkingSetId);
  const currentSetManagementButtonType = useAppSelector(selectSetManagementButtonType);
  
  const dispatch = useAppDispatch();

  const saveLogin = useCallback(() => {
    dispatch(setLogin({username: username, apiKey: apiKey}));
    setLocalUsername('');
    setLocalAPIKey('');
  }, [username, apiKey]);

  const close = useCallback(() => {
    dispatch(fetchWorkingSet());
    dispatch(switchScreen('search'));
  }, []);

  return (
    <div className={styles.settingsContainer}>
      <h1>Settings</h1>

      <button onClick={close}>Close</button>

      <fieldset>
        <legend>Login</legend>
        <span>{currentUsername !== '' ? `Logged in as ${currentUsername}` : 'Not logged in'}</span>
        <input value={username} onChange={e => setLocalUsername(e.target.value)} type="text" />
        <input value={apiKey} onChange={e => setLocalAPIKey(e.target.value)} type="password" />
        <button type="button" onClick={saveLogin}>Save Login</button>
      </fieldset>
      
      <fieldset>
        <legend>Set Management</legend>
        <button onClick={() => dispatch(fetchManagedSets())}>Get sets</button>
        {managedSets !== null && (
          <>
            <select value={workingSetId !== null ? workingSetId : undefined} onChange={e => dispatch(setWorkingSetId(e.target.value !== "" ? parseInt(e.target.value) : null))}>
              <option>Select a set</option>
              <optgroup label="Owned">
                {managedSets.Owned.map(([setName, setId], index) => (
                  <option value={setId} key={index}>{setName}</option>
                ))}
              </optgroup>
              <optgroup label="Maintained">
                {managedSets.Maintained.map(([setName, setId], index) => (
                  <option value={setId} key={index}>{setName}</option>
                ))}
              </optgroup>
            </select>
          </>
        )}
      </fieldset>
      
      <fieldset>
        <legend>Display</legend>
        <label>
          Image size
        </label>
        <select value={currentImageDisplaySize} onChange={e => dispatch(setImageDisplaySize(e.target.value as ImageDisplaySize))}>
          <option value="full">Full Image</option>
          <option value="sample">Sample Image</option>
        </select>
        <label>
          Set Management Button Size
        </label>
        <select value={currentSetManagementButtonType} onChange={e => dispatch(setSetManagementButtonType(e.target.value as SetManagementButtonType))}>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>
      </fieldset>

      <button onClick={close}>Close</button>
    </div>
  );
}