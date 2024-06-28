import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { chakra } from '@chakra-ui/system';

import { TimelineEventProps } from '../../lib/TimelineType';
import { AddChildForm } from "../organisms/InputItem";
import { MyCalendar } from './CalendarComponent';
import { MyTimeline } from './TLComponent';

import cx from 'classnames';
import { topWidth } from '../sprinkles.responsive.css';
import { flexXmandatory, gridArea } from './CalendarComponent.css';
// import { eventData } from '../../lib/SampleState';

interface EventFormProps {
  targetEvent?: TimelineEventProps,
	onShowFormView: (targetEvent: TimelineEventProps) => void
}

export const CalendarWrapper = ({onShowFormView, targetEvent}: EventFormProps) => {

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
    (callingEvent: TimelineEventProps, e: React.SyntheticEvent<HTMLElement, Event>) =>
  {
    console.log(`Event motion: ${e.type}`);
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

  return (
    <chakra.div className={flexXmandatory}>
      <chakra.div className={cx(gridArea, topWidth)} flexShrink="0" scrollSnapAlign="start">
        <button>
          <Link to="/timeline">サンプルタイムライン</Link>
        </button>
        {/* {event && <MyTimeline
          onShowFormView={targetEvent => setEvent(targetEvent)}
          targetEvent={event} />} */}
        <MyCalendar handleSelectEvent={handleSelectEvent} />
      </chakra.div>
      <chakra.div flexShrink="0" scrollSnapAlign="start"
        className={topWidth}
        onClick={handleOuterFormBubbling}>
        {showModal &&
          <AddChildForm selectedEvent={targetEvent!}
          closeClick={closeInputForm} ref={divRef} />
        }
      </chakra.div>
    </chakra.div>
  );
}
