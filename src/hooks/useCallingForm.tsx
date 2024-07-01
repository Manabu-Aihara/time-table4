import { useState, useRef, useCallback, useEffect, PropsWithChildren } from "react";
import { chakra } from "@chakra-ui/system";

import { TimelineEventProps, EventFormProps } from "../lib/TimelineType";

export const useCallingEditForm = ({onShowFormView, targetEvent}: EventFormProps) => {

  /**
   * Issue summary & progress
   */
  const [showModal, setShowModal] = useState(false);

  // TypeScriptでReactのイベントにどう型指定するか
  // https://komari.co.jp/blog/10724/
  const handleOuterFormBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!(e.target instanceof HTMLButtonElement)){
      return;
    }
    setShowModal(false);
  }

  const countRef = useRef<number | undefined>();
  const handleSelectEvent = useCallback(
    (callingEvent: TimelineEventProps, e?: React.SyntheticEvent<HTMLElement, Event>) =>
  {
    // console.log(`Event motion: ${e.type}`);
    onShowFormView(callingEvent);
    countRef.current = undefined;
    console.log('切り替わりました Handle: ', countRef.current);
    setShowModal(true);
  }, []);

	const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // console.log('Effect通りました', eventFlag);
    divRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [targetEvent]);

  const closeInputForm = () => {
    setShowModal(false);
  }

  const EditForm: React.FC<PropsWithChildren> = ({children}) => {
    return (
      <chakra.div flexShrink="0" scrollSnapAlign="start"
        onClick={handleOuterFormBubbling}>
          {children}
      </chakra.div>
    )
  }

  const modal = {showModal, closeInputForm};
  return {handleSelectEvent, EditForm, modal};
}
