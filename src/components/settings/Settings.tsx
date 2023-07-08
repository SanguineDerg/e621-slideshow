import { useCallback, useState, ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clear } from '../../slices/postsSlice';
import { ImageDisplaySize, selectImageDisplaySize, selectSelectedAccount, selectSetManagementButtonType, setImageDisplaySize, SetManagementButtonType, setSetManagementButtonType, DEFAULT_SITE, addAccount, selectAccount, removeAccount, selectSelectedAccountId, selectAllAccounts, UserAccount, setAutoplayDelay, selectAutoplayLoop, selectAutoplayDelay, setAutoplayLoop } from '../../slices/settingsSlice';
import { fetchManagedSets, fetchWorkingSet, selectManagedSets, selectWorkingSetId, setWorkingSetId } from '../../slices/setSlice';
import { switchScreen } from '../../slices/viewSlice';
import styles from './Settings.module.css';
import { eventNames } from 'process';

export default function Settings() {
  const [site, setLocalSite] = useState(DEFAULT_SITE);
  const [username, setLocalUsername] = useState('');
  const [apiKey, setLocalAPIKey] = useState('');

  const allAccounts = useAppSelector(selectAllAccounts);
  const selectedAccountId = useAppSelector(selectSelectedAccountId);
  const currentImageDisplaySize = useAppSelector(selectImageDisplaySize);
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
      type="button" onClick={() => saveSelectAccount(uid)}
    >
      <span>{user.username} @ {user.site}</span>
    </button>
  );

  const saveAddAccount = useCallback(() => {
    dispatch(addAccount({
      site: site,
      username: username,
      apiKey: apiKey,
    }));
    setLocalSite(DEFAULT_SITE);
    setLocalUsername('');
    setLocalAPIKey('');
  }, [dispatch, username, apiKey]);

  const saveSelectAccount = useCallback((uid: string | null) => {
    dispatch(selectAccount(uid));
    dispatch(clear());
  }, [dispatch]);

  const removeSelectedAccount = useCallback(() => {
    if (selectedAccountId !== null) {
      dispatch(removeAccount(selectedAccountId));
    }
    dispatch(clear());
  }, [dispatch, selectedAccountId]);

  const close = useCallback(() => {
    dispatch(fetchWorkingSet());
    dispatch(switchScreen('search'));
  }, [dispatch]);

  const onAutoplayDelayChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLocalAutoplayDelay(event.target.value);
    const numberValue = Number(event.target.value);
    console.log(numberValue)
    if (!isNaN(numberValue) && numberValue >= 1) {
      console.log("good")
      dispatch(setAutoplayDelay(numberValue));
    }
  }, [dispatch, setLocalAutoplayDelay, setAutoplayDelay]);

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
        <label>
          Autoplay Delay
        </label>
        <input type="number" min="1" value={localAutoplayDelay} onChange={onAutoplayDelayChange}></input>
        <label>
          Autoplay Loop
        </label>
        <select value={autoplayLoop.toString()} onChange={e => dispatch(setAutoplayLoop(e.target.value == "true"))}>
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      </fieldset>

      <button onClick={close}>Close</button>
    </div>
  );
}