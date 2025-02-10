import { ReactNode } from "react";
import { useLocation } from 'react-router-dom';

import { AuthStateContext } from "../../lib/ContextLibs";
import { AuthInfoProp } from "../../lib/TimelineType";
import { useSearchQuery } from "../../resources/queries";

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
      {children}
    </AuthStateContext.Provider>
  );
};

// export default AuthProvider;
