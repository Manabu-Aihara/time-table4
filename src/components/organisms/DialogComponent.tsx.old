import { Box, Button, Text } from "@chakra-ui/react";

import { TitleInput } from './InputTitleDialog';
import { AuthInfoProp } from "../../lib/TimelineType";
import { useDialog } from '../../hooks/useDialog';
import { useAuthContext } from '../../hooks/useContextFamily';
import { useAuthQuery } from '../../resources/queries';

import { addButton } from "./AddButtonComponent.css";
import { ExcludeAxios, safeJsonParse, toJsonValue } from "../../lib/UtilityType";

export const TitleInputModal = () => {
  const { Dialog, open, close } = useDialog();

  const authContext = useAuthContext();  
  const tokenContext = authContext.type === 'token' ? authContext.accessToken : undefined;  
  const { data } = useAuthQuery(tokenContext!);

  const strData = JSON.stringify(data);
  // パターン 1
  const objValue = JSON.parse(strData);
  console.log(`Json type: ${typeof objValue.staff_id}, ${typeof objValue.group_id}`);
  const guard: AuthInfoProp = {
    authId: objValue.staff_id, group: objValue.group_id, type: 'auth'
  } as const;
  // パターン 2
  // 型安全だか、うまくいかない
  // const objValue = safeJsonParse(strData) as AuthInfoProp;
  // const guard: AuthInfoProp = objValue.type === 'auth' ? {
  //     authId: objValue.authId, group: objValue.group, type: 'auth' as const
  // } : objValue

  return (
    <Box>
      <button onClick={open} className={addButton}>Add Event</button>
      <Dialog>
        <Text>入力フォームコンテンツ</Text>
        <TitleInput {...guard} />
        {/* <TitleInput auth={jsonValue} /> */}
        <Button onClick={close}>close</Button>
      </Dialog>
    </Box>
  );
}
