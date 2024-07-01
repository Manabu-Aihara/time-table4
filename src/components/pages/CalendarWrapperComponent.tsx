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

export const CalendarWrapper = () => {

  return (
    <chakra.div className={flexXmandatory}>
      <chakra.div className={cx(gridArea, topWidth)} flexShrink="0" scrollSnapAlign="start">
        <button>
          <Link to="/timeline">サンプルタイムライン</Link>
        </button>
        {/* {event && <MyTimeline
          onShowFormView={targetEvent => setEvent(targetEvent)}
          targetEvent={event} />} */}
        <MyCalendar />
      </chakra.div>
    </chakra.div>
  );
}
