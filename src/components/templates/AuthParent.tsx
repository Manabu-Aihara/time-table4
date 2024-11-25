import { ReactNode, createContext, useReducer, Dispatch, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { AuthInfoProp } from "../../lib/TimelineType";
import { useSearchQuery } from "../../resources/queries";

export const AuthStateContext = createContext<AuthInfoProp | undefined>(undefined);

export type Action = {
  type: 'UPDATE';
  payload: {
    token: string
  };
}

type AuthDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const AuthDispatchContext = createContext<AuthDispatch | undefined>(
  undefined
);

const useAuthReducer = (token: AuthInfoProp, action: Action): AuthInfoProp => {
  switch(action.type){
    case 'UPDATE':
      return {...token, type: 'token', accessToken: action.payload.token}
    default:
      throw new Error('Invalid action');
  }
}

export const AuthProvider = ({children}: {children: ReactNode}) => {

  // const [token, setToken] = useState<TokenProp>({
  //   accessToken: '0123456789abcdef'
  // });
  // const [auth, dispatch] = useReducer(useAuthReducer, '');
  // 状態保持ができません！
  // const search = useLocation().search;
  // const query = new URLSearchParams(search);
  const { data } = useSearchQuery('token');
  console.log(`Parent context token: ${data}`);
  const _auth: AuthInfoProp = { accessToken: data!, type: 'token' }

  return (
    <AuthStateContext.Provider value={_auth}>
      {/* <AuthDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </AuthDispatchContext.Provider> */}
    </AuthStateContext.Provider>
  );
};

// export default AuthProvider;
