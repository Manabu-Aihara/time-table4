import { Meta, StoryObj } from '@storybook/react';

import { Calendar } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { EventsContextProvider, EventsStateContext } from '../components/templates/EventsParent';
import { MyCalendar } from '../components/pages/CalendarComponent';
import { exItems } from '../lib/SampleState';
import { CalendarActionProps, TimelineEventProps } from '../lib/TimelineType';
import localizer from '../lib/Localization';

// export default {
//   title: 'Events Context',
//   // component: EventsStateContext,
//   decorators: [
//     withReactContext({
//       Context: EventsStateContext,
//       initialState: exItems
//     })
//   ]
// } as Meta<typeof EventsStateContext>

// const Template = ({...args}) => <MyCalendar {...args} />
// export const Default = Template.bind({});
// Default
  

const meta1: Meta<typeof MyCalendar> = {
  title: '',
  component: MyCalendar
}
export default meta1;
type Story = StoryObj<typeof meta1>;
export const Primary: Story = {
  decorators: [
    (Story) => (
        <EventsStateContext.Provider value={exItems}>
          <Story />
        </EventsStateContext.Provider>
    )
  ] 
}

const meta2: Meta<typeof MyCalendar> = {
  title: '',
  component: MyCalendar,
  decorators: [
    (Story) => (
        <EventsStateContext.Provider value={exItems}>
          <Story />
        </EventsStateContext.Provider>
    )
  ]
}

// const DnDCalendar = withDragAndDrop(Calendar<TimelineEventProps>);
// const Template = ({...args}) => <DnDCalendar
//   {...args}
//   localizer={localizer}
//   events={exItems}
// />;

