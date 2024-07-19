import { render, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import { Calendar } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { TimelineEventProps } from "../lib/TimelineType";
import localizer from "../lib/Localization";
import { exEvents } from "../lib/SampleState";
import * as stories from '../stories/Calendar.stories';

const DnDCalendar = withDragAndDrop(Calendar<TimelineEventProps>);
describe('Calendar', () => {
  const { Standard, Primary } = composeStories(stories);
  it('通常のレンダー', () => {
    const screen = render(
      <DnDCalendar
        localizer={localizer}
        events={exEvents}
        defaultView='day'
      />);
    const buttonElements = screen.getAllByRole('button');
    const expectElms = buttonElements.filter(value => {
      if(value.className == 'rbc-event'){
        return value;
      }
    });
    // console.log('Role button: ', buttonElements);
    expect(expectElms.length).toBe(3);
  });
  it('通常のレンダー from story', () => {
    const screen = render(Standard());
    const buttonElements = screen.getAllByRole('button');
    const expectElms = buttonElements.filter(value => {
      if(value.className == 'rbc-event'){
        return value;
      }
    });
    // console.log('Role button: ', buttonElements);
    expect(expectElms.length).toBe(3);
  });
  it('昨日の日付を見る', async () => {
    const { getAllByText } = render(Primary());
    // expect(getAllByText('Thursday Jul 18')).toBeInTheDocument();
    render(<Primary />);
    // await stories.Primary.play;
    // expect(screen.getByText(/Wendesday Jul 17/i, {exact: false})).toBeInTheDocument();
  });
});
