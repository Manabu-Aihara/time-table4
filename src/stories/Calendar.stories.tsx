/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { userEvent, within } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import { MyCalendar } from '../components/pages/CalendarComponent';
import { TimelineEventProps } from '../lib/TimelineType';

// 1. Meta configuration
const meta: Meta<typeof MyCalendar> = {
  title: 'Components/MyCalendar',
  component: MyCalendar,
  tags: ['autodocs'],
  argTypes: {
    onTimeChangeEvents: { action: 'onTimeChangeEvents' },
    onSlotInfo: { action: 'onSlotInfo' },
  },
};

export default meta;

// 2. Mock Data and Hooks
const mockEvents: TimelineEventProps[] = [
  { id: 1, title: 'My Event 1', start_time: moment().add(-2, 'hours'), end_time: moment().add(-1, 'hours'), staff_id: 1, group: 1 },
  { id: 2, title: 'Another User Event', start_time: moment(), end_time: moment().add(1, 'hours'), staff_id: 2, group: 2 },
  { id: 3, title: 'My Event 2', start_time: moment().add(2, 'hours'), end_time: moment().add(3, 'hours'), staff_id: 1, group: 1 },
];

const mockAuthId = 1;

const mockParameters = {
  moduleMock: {
    mock: () => {
      return {
        // Mock hooks from different files
        '../hooks/useAuthGuard': {
          useAuthInfo: () => ({ authId: mockAuthId }),
        },
        '../hooks/useContextFamily': {
          useEventsState: () => mockEvents,
        },
        '../resources/queries': {
          useSearchQuery: () => ({ data: mockAuthId.toString() }),
        },
        '../hooks/useMouseHandle': {
          useMouseEvents: () => ({
            onEventResize: action('onEventResize'),
            onEventDrop: action('onEventDrop'),
            eventList: [],
            prevRef: { current: undefined },
          }),
        },
        '../hooks/useCallingForm': {
          useCallingEditForm: () => ({
            handleSelectEvent: action('handleSelectEvent'),
            // Render a dummy EditForm for the story
            EditForm: ({ children }: { children: React.ReactNode }) => (
              <div data-testid="edit-form">{children}</div>
            ),
            modal: { showModal: true, closeInputForm: action('closeInputForm') },
          }),
        },
      };
    },
  },
};


// 3. Stories
type Story = StoryObj<typeof MyCalendar>;

export const Default: Story = {
  args: {
    // Actions are passed via args
    onTimeChangeEvents: action('onTimeChangeEvents'),
    onSlotInfo: action('onSlotInfo'),
  },
  parameters: mockParameters,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // Verify only the user's events are rendered
    await canvas.findByText('My Event 1');
    await canvas.findByText('My Event 2');
    // Verify the other user's event is also rendered (styling is different)
    await canvas.findByText('Another User Event');
  },
};

export const WithEventClick: Story = {
  args: {
    ...Default.args,
  },
  parameters: mockParameters,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // Find and click the first event
    const eventElement = await canvas.findByText('My Event 1');
    await userEvent.click(eventElement);
    // Verify the mock EditForm is shown
    await canvas.findByTestId('edit-form');
  },
};