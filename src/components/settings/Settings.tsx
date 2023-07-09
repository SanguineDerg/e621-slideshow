import { useCallback, useState, ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ImageDisplaySize, selectImageDisplaySize, selectSetManagementButtonType, setImageDisplaySize, SetManagementButtonType, setSetManagementButtonType, setAutoplayDelay, selectAutoplayLoop, selectAutoplayDelay, setAutoplayLoop, setVideoDisplaySize, VideoDisplaySize, selectVideoDisplaySize, selectVideoDisplayType, setVideoDisplayType, VideoDisplayType, selectVideoDisplayMode, selectFlashDisplayMode, setImageDisplayMode, ImageDisplayMode, setVideoDisplayMode, VideoDisplayMode, FlashDisplayMode, setFlashDisplayMode, selectImageDisplayMode } from '../../slices/settingsSlice';
import { fetchManagedSets, fetchWorkingSet, selectManagedSets } from '../../slices/setSlice';
import { switchScreen } from '../../slices/viewSlice';
import styles from './Settings.module.css';
import { DEFAULT_SITE, UserAccount, addAccount, removeAccount, selectAccount, selectAllAccounts, selectSelectedAccountId, selectWorkingSetId, updateAccountWorkingSetId } from '../../slices/accountsSlice';
import { refreshAccountBasedState } from '../../app/store';

export default function Settings() {
  const [site, setLocalSite] = useState(DEFAULT_SITE);
  const [username, setLocalUsername] = useState('');
  const [apiKey, setLocalAPIKey] = useState('');

  const allAccounts = useAppSelector(selectAllAccounts);
  const selectedAccountId = useAppSelector(selectSelectedAccountId);
  const currentImageDisplaySize = useAppSelector(selectImageDisplaySize);
  const currentImageDisplayMode = useAppSelector(selectImageDisplayMode);
  const currentVideoDisplaySize = useAppSelector(selectVideoDisplaySize);
  const currentVideoDisplayType = useAppSelector(selectVideoDisplayType);
  const currentVideoDisplayMode = useAppSelector(selectVideoDisplayMode);
  const currentFlashDisplayMode = useAppSelector(selectFlashDisplayMode);
  const managedSets = useAppSelector(selectManagedSets);
  const workingSetId = useAppSelector(selectWorkingSetId);
  const currentSetManagementButtonType = useAppSelector(selectSetManagementButtonType);
  const autoplayDelay = useAppSelector(selectAutoplayDelay);
  const autoplayLoop = useAppSelector(selectAutoplayLoop);
  
  const dispatch = useAppDispatch();

  const [localAutoplayDelay, setLocalAutoplayDelay] = useState(autoplayDelay.toString());
  useEffect(() => {
    setLocalAutoplayDelay(autoplayDelay.toString());
  }, [autoplayDelay, setLocalAutoplayDelay])

  const anonymousAccountButton = () => (
    <button
      className={selectedAccountId === null || !allAccounts.hasOwnProperty(selectedAccountId) ? [styles.account, styles.selectedAccount].join(" ") : styles.account}
      type="button" onClick={() => saveSelectAccount(null)}
    >
      <span>anonymous @ {DEFAULT_SITE}</span>
    </button>
  );
  const accountButton = (uid: string, user: UserAccount) => (
    <button
      className={selectedAccountId === uid ? [styles.account, styles.selectedAccount].join(" ") : styles.account}
      type="button" key={uid} onClick={() => saveSelectAccount(uid)}
    >
      <span>{user.username} @ {user.site}</span>
    </button>
  );

  const saveAddAccount = useCallback(() => {
    dispatch(addAccount({
      site: site,
      username: username,
      apiKey: apiKey,
      workingSetId: null,
    }));
    setLocalSite(DEFAULT_SITE);
    setLocalUsername('');
    setLocalAPIKey('');
    refreshAccountBasedState(dispatch);
  }, [dispatch, site, username, apiKey]);

  const saveSelectAccount = useCallback((uid: string | null) => {
    dispatch(selectAccount(uid));
    refreshAccountBasedState(dispatch);
  }, [dispatch]);

  const removeSelectedAccount = useCallback(() => {
    if (selectedAccountId !== null) {
      dispatch(removeAccount(selectedAccountId));
    }
    refreshAccountBasedState(dispatch);
  }, [dispatch, selectedAccountId]);

  const close = useCallback(() => {
    dispatch(fetchWorkingSet());
    dispatch(switchScreen('search'));
  }, [dispatch]);

  const onWorkingSetIdChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    if (selectedAccountId !== null) {
      dispatch(updateAccountWorkingSetId([selectedAccountId, event.target.value !== "" ? parseInt(event.target.value) : null]))
    }
  }, [dispatch, selectedAccountId]);

  const onAutoplayDelayChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLocalAutoplayDelay(event.target.value);
    const numberValue = Number(event.target.value);
    if (!isNaN(numberValue) && numberValue >= 1) {
      dispatch(setAutoplayDelay(numberValue));
    }
  }, [dispatch, setLocalAutoplayDelay]);

  return (
    <div className={styles.settingsContainer}>
      <h1>Settings</h1>

      <button onClick={close}>Close</button>

      <fieldset>
        <legend>Login</legend>
        {anonymousAccountButton()}
        {Object.entries(allAccounts).map(([uid, user]) => accountButton(uid, user))}
        <button type="button" onClick={removeSelectedAccount}>Remove Selected Account</button>
      </fieldset>

      <fieldset>
        <legend>Add Login</legend>
        <input value={site} onChange={e => setLocalSite(e.target.value)} type="text" />
        <input value={username} onChange={e => setLocalUsername(e.target.value)} type="text" />
        <input value={apiKey} onChange={e => setLocalAPIKey(e.target.value)} type="password" />
        <button type="button" onClick={saveAddAccount}>Save Login</button>
      </fieldset>
      
      <fieldset>
        <legend>Set Management</legend>
        <button onClick={() => dispatch(fetchManagedSets())}>Get sets</button>
        {managedSets !== null && (
          <>
            <select value={workingSetId !== null ? workingSetId : undefined} onChange={onWorkingSetIdChange}>
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
          Image Size
        </label>
        <select value={currentImageDisplaySize} onChange={e => dispatch(setImageDisplaySize(e.target.value as ImageDisplaySize))}>
          <option value="full">Full Image</option>
          <option value="sample">Sample Image</option>
        </select>
        <label>
          Image Display Mode
        </label>
        <select value={currentImageDisplayMode} onChange={e => dispatch(setImageDisplayMode(e.target.value as ImageDisplayMode))}>
          <option value="hide">Hide</option>
          <option value="embed">Embed</option>
        </select>
        <label>
          Video Size
        </label>
        <select value={currentVideoDisplaySize} onChange={e => dispatch(setVideoDisplaySize(e.target.value as VideoDisplaySize))}>
          <option value="480p">480p</option>
          <option value="720p">720p</option>
          <option value="full">Full</option>
        </select>
        <label>
          Video Type
        </label>
        <select value={currentVideoDisplayType} onChange={e => dispatch(setVideoDisplayType(e.target.value as VideoDisplayType))}>
          <option value="webm">WEBM</option>
          <option value="mp4">MP4</option>
        </select>
        <label>
          Video Display Mode
        </label>
        <select value={currentVideoDisplayMode} onChange={e => dispatch(setVideoDisplayMode(e.target.value as VideoDisplayMode))}>
          <option value="hide">Hide</option>
          <option value="preview">Preview</option>
          <option value="embed">Embed</option>
        </select>
        <label>
          Flash Display Mode
        </label>
        <select value={currentFlashDisplayMode} onChange={e => dispatch(setFlashDisplayMode(e.target.value as FlashDisplayMode))}>
          <option value="hide">Hide</option>
          <option value="preview">Preview</option>
        </select>
        <label>
          Set Management Button Size
        </label>
        <select value={currentSetManagementButtonType} onChange={e => dispatch(setSetManagementButtonType(e.target.value as SetManagementButtonType))}>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>
        <label>
          Autoplay Delay
        </label>
        <input type="number" min="1" value={localAutoplayDelay} onChange={onAutoplayDelayChange}></input>
        <label>
          Autoplay Loop
        </label>
        <select value={autoplayLoop.toString()} onChange={e => dispatch(setAutoplayLoop(e.target.value === "true"))}>
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      </fieldset>

      <button onClick={close}>Close</button>
    </div>
  );
}