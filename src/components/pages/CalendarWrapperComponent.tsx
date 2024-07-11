import { useState } from 'react';
import { Link } from 'react-router-dom';
import { chakra } from '@chakra-ui/system';

import { TimelineEventProps } from '../../lib/TimelineType';
import { TimesUpdateButton } from '../molecules/TimeUpdateButtonComponent';
import { MyCalendar } from './CalendarComponent';
import { MyTimeline } from './TLComponent';

import { flexXmandatory } from './CalendarComponent.css';
// import { eventData } from '../../lib/SampleState';

export const CalendarWrapper = () => {
  const [movedEvents, setMovedEvents] = useState<TimelineEventProps[]>([]);

  return (
    <chakra.div className={flexXmandatory}>
      {/* <button>
        <Link to="/timeline">サンプルタイムライン</Link>
      </button> */}
      {/* {event && <MyTimeline
        onShowFormView={targetEvent => setEvent(targetEvent)}
        targetEvent={event} />} */}
      <TimesUpdateButton timeChangeEvents={movedEvents} />
      <MyCalendar setTimeChangeEvents={childData => setMovedEvents(childData)} />
    </chakra.div>
  );
}
