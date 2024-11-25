import { useAuthContext } from "../hooks/useContextFamily";
import { useAuthQuery } from '../resources/queries';
import { AuthInfoProp } from '../lib/TimelineType';

export const useAuthInfo = () => {
  const { data } = useAuthQuery();

  const strData = JSON.stringify(data);
  // パターン 1
  const objValue = JSON.parse(strData);
  // console.log(`Json type: ${typeof objValue.staff_id}, ${typeof objValue.group_id}`);
  const guard: AuthInfoProp = {
    authId: objValue.staff_id, group: objValue.group_id, type: 'auth'
  } as const;

  return guard;
}
