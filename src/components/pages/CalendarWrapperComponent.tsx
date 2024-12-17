import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlotInfo } from 'react-big-calendar';
import { chakra } from '@chakra-ui/system';

import { TimelineEventProps } from '../../lib/TimelineType';
import { TimesUpdateButton } from '../molecules/TimeUpdateButtonComponent';
import { MyCalendar } from './CalendarComponent';
import { DialogOnSlot } from '../organisms/DialogOnSlotComponent';

import { flexXmandatory } from './CalendarComponent.css';
// import { eventData } from '../../lib/SampleState';

export const CalendarWrapper = () => {
  // React コンポーネント間でデータ・イベントを受け渡す方法
  // :子コンポーネントから親コンポーネントにデータを受け渡す方法
  // https://www.freecodecamp.org/japanese/news/pass-data-between-components-in-react/
  const [movedEvents, setMovedEvents] = useState<TimelineEventProps[]>([]);
  const [slotInfo, setSlotInfo] = useState<SlotInfo>();

  return (
    <chakra.div className={flexXmandatory}>
      <button>
        <Link to="/timeline">タイムライン</Link>
      </button>
      <MyCalendar
        onTimeChangeEvents={childData => setMovedEvents(childData)}
        onSlotInfo={childSlotInfo => setSlotInfo(childSlotInfo)}
      />
      <TimesUpdateButton timeChangeEvents={movedEvents} />
      <DialogOnSlot slotInfo={slotInfo} />
    </chakra.div>
  );
}
