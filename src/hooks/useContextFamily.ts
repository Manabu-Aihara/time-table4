import { useContext } from "react";

import { EventsStateContext, EventsDispatchContext } from "../components/templates/EventsParent";
import { AuthStateContext, AuthDispatchContext } from "../components/templates/AuthParent";

export function useEventsState() {
  const state = useContext(EventsStateContext);
  if (!state) throw new Error('EventProvider not found');
  return state;
}
  
function useEventsDispatch() {
  const dispatch = useContext(EventsDispatchContext);
  if (!dispatch) throw new Error('EventProvider not found');
  return dispatch;
}

export function useAuthContext() {
  const auth = useContext(AuthStateContext);
  if (!auth) throw new Error('AuthProvider not found');
  return auth;
}

function useAuthDispatch() {
  const auth = useContext(AuthDispatchContext);
  if (!auth) throw new Error('AuthProvider not found');
  return auth;
}
