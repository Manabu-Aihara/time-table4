import { act, render, waitFor, within } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { expect } from 'vitest';

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
  it.skip('昨日の日付を見る', async () => {
    const { container, getByText } = render(Primary());
    // const screen = render(Primary());
    // const spanElm = await container.querySelector('.rbc-toolbar-label') as HTMLSpanElement;
    // const yesterday = await within(spanElm).getByText('Wednesday Jan 29');
    await act(() => {
      Primary.play?.({ canvasElement: container});
    });
    await waitFor(() => {
      expect(getByText(/Wednesday Jan 29/i, {exact: false})).toBeInTheDocument();
      // expect(yesterday.textContent).toBeInTheDocument();
    });
    // console.log('Text elements: ', container.getElementsByClassName('rbc-toolbar-label')[0]);
    // expect(container.getElementsByClassName('rbc-toolbar-label')).toHaveTextContent('Monday Jul 22');
  });
});
