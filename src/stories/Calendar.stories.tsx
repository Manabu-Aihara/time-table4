import { expect, within, userEvent } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import localizer from "../lib/Localization";
import { exEvents } from "../lib/SampleState";
import { TimelineEventProps } from "../lib/TimelineType";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const DnDCalendar = withDragAndDrop(Calendar<TimelineEventProps>);
const meta: Meta<typeof DnDCalendar> = {
  title: "DummyClendar",
  component: DnDCalendar,
};
export default meta;
type Story = StoryObj<typeof DnDCalendar>;

export const Standard: Story = {
  args: { localizer: localizer, events: exEvents, defaultView: "day" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonElements = await canvas.getAllByRole("button");
    const expectElms = buttonElements.filter((value) => {
      if (value.className == "rbc-event") {
        return value;
      }
    });
    expect(expectElms.length).toBe(3);
  },
};

export const Primary: Story = {
  args: { localizer: localizer, events: exEvents, defaultView: "day" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonElements = await canvas.getAllByRole("button");
    // await act(() => {
    await userEvent.click(buttonElements[1]);
    // });
    expect(
      canvas.getByText(/Wednesday Jan 29/i, { exact: false }),
    ).toBeInTheDocument();
  },
};
