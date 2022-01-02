export function readLocalStorage<Type>(key: string, fallback: Type): Type {
  const store = localStorage.getItem(key);
  if (store === null) return fallback;
  try {
    const value: Type = JSON.parse(store);
    return value;
  } catch {
    return fallback;
  }
}

export function writeLocalStorage<Type>(key: string, value: Type): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}