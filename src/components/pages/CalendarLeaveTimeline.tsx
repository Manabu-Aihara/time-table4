import { useNavigate } from "react-router-dom";

import { useAuthContext, useEventsState } from "../../hooks/useContextFamily";
import { useAuthQuery } from "../../resources/queries";

const CalendarLeavePage = () => {
  const authState = useAuthContext();
  const tokenContext = authState.type === 'token' ? authState.accessToken : undefined;
  
  const { data, isPending } = useAuthQuery(tokenContext!);
  const groupCode = data?.data.type === 'auth' ? data.data.code : undefined;

  const navigate = useNavigate();
  {
    data && navigate(`/timeline?team_code=${groupCode}`);
  }

  return (
    <>
    {isPending && <p>タイムラインを表示します…</p>}
    </>
  );
}