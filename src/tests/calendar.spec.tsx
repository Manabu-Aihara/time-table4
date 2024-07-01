import { useState } from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';

import { MyCalendar } from "../components/pages/CalendarComponent";
import { exItems } from '../lib/SampleState';
import { TimelineEventProps } from '../lib/TimelineType';

let testHandleSelectEvent: (evt: TimelineEventProps) => void;
describe('Calendar', () => {
  beforeEach(() => {
    const [event, setEvent] = useState<TimelineEventProps>(exItems[0]);
    testHandleSelectEvent = (smplEvt: TimelineEventProps) => {
      setEvent(smplEvt);
    }    
  })
  test('まずはレンダリング', () => {
    // const screen = render(<MyCalendar handleSelectEvent={event => testHandleSelectEvent(event)} />);
    // expect(screen.container.classList.contains('rbc-toolbar')).toBe(true);
  })
});
