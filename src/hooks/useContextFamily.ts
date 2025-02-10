import { useContext } from "react";

import { AuthStateContext, EventsStateContext } from "../lib/ContextLibs";

export function useEventsState() {
  const state = useContext(EventsStateContext);
  if (!state) throw new Error('EventProvider not found');
  return state;
}

export function useAuthContext() {
  const auth = useContext(AuthStateContext);
  if (!auth) throw new Error('AuthProvider not found');
  return auth;
}
