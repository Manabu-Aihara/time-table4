import type { Meta, StoryObj } from "@storybook/react";

import { MyCalendar } from "../components/pages/CalendarComponent";
import { exItems } from "../lib/SampleState";

type Story = StoryObj<typeof MyCalendar>;

const meta: Meta<typeof MyCalendar> = {
  component: MyCalendar
}
export default meta;

// export const Default: Story = {
//   args: { handleSelectEvent(selectEvent, handleEvent)
//     {selectEvent
//      handleEvent}
//   }
// };

export const Error: Story = {
  args: { label: 'Calendar',
    errorMessage: "エラー" 
  },
};
