import { useEffect, useState } from 'react';

export function useSessionStorageState<State>(
  initialState: State,
  key: string
) {
  const [state, setState] = useState(() => {
    const stringState = sessionStorage.getItem(key);
    if (!stringState) return initialState;
    return JSON.parse(stringState) as State;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}
