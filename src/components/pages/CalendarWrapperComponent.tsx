import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlotInfo } from 'react-big-calendar';
import { chakra } from '@chakra-ui/system';

import { TimelineEventProps } from '../../lib/TimelineType';
import { TimesUpdateButton } from '../molecules/TimeUpdateButtonComponent';
import { MyCalendar } from './CalendarComponent';
import { DialogOnSlot } from '../organisms/DialogOnSlotComponent';
import { MyTimeline } from './TLComponent';

import { flexXmandatory } from './CalendarComponent.css';
// import { eventData } from '../../lib/SampleState';

export const CalendarWrapper = () => {
  const [movedEvents, setMovedEvents] = useState<TimelineEventProps[]>([]);
  const [slotInfo, setSlotInfo] = useState<SlotInfo>();

  return (
    <chakra.div className={flexXmandatory}>
      {/* <button>
        <Link to="/timeline">サンプルタイムライン</Link>
      </button> */}
      {/* {event && <MyTimeline
        onShowFormView={targetEvent => setEvent(targetEvent)}
        targetEvent={event} />} */}
      <MyCalendar
        onTimeChangeEvents={childData => setMovedEvents(childData)}
        onSlotInfo={childSlotInfo => setSlotInfo(childSlotInfo)}
      />
      <TimesUpdateButton timeChangeEvents={movedEvents} />
      <DialogOnSlot slotInfo={slotInfo} />
    </chakra.div>
  );
}
