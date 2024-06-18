import { forwardRef, Ref } from "react";
import { ChakraProvider, Box, Button, Text } from "@chakra-ui/react";

import { useUpdateDateListMutation } from "../../hooks/useEventMutation";
import { TimelineEventProps } from "../../lib/TimelineType";
import { updateButtonArea } from "./TimeUpdateButtonComponent.css";

type ChangingProp = {
  timeChangeEvents: TimelineEventProps[]
}

export const TimesUpdateButton = forwardRef(
  ({timeChangeEvents}: ChangingProp, buttonRef: Ref<HTMLDivElement>) => {
  console.log(`Event list =: `, timeChangeEvents);

  // idのだけの配列
  const timeChangeEventIds = timeChangeEvents.map(
    timeChangeEvent => timeChangeEvent.id.toString()
  );

  const updateEvents = useUpdateDateListMutation(timeChangeEventIds);
  const resetMutate = async () => {
    updateEvents.mutate([]);
    // const data = await updateEvents.mutateAsync([]);
    // console.log('DnD event: ', timeChangeEvents);
    // return data;
  }
  const handleUpdateAction = () => {
    updateEvents.mutate(timeChangeEvents);
    console.log('Updateしたつもり');
    setTimeout(() => {
      timeChangeEvents.splice(0);
      console.log('Inner setTimeout');
    }, 250);
    console.log('Outer setTimeout');
    // resetAction().then(() => {
    //   timeChangeEvents.splice(0);
    // }).catch(() => {
    //   throw new Error('Reset error!');
    // });
  }

  return (
    <ChakraProvider>
      {timeChangeEvents.length > 0 &&
        <Box className={updateButtonArea.container} ref={buttonRef}>
          <Button onClick={handleUpdateAction}>変更する</Button>
          <Text className={updateButtonArea.countText}>変更回数: {timeChangeEvents.length}</Text>
          {/* <Button onClick={resetAction}>リセット</Button> */}
        </Box>
      }
    </ChakraProvider>
  );
});
