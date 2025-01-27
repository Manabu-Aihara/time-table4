import { expect, within, userEvent, fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TimelineEventProps, AuthInfoProp } from "../lib/TimelineType";
import {
  AuthProvider,
  AuthStateContext,
} from "../components/templates/AuthParent";
import { EventsStateContext } from "../components/templates/EventsParent";
import { MyHorizonTimeline } from "../components/pages/TimelineComponent";
import { exEvents, exGroupUsers, exItems } from "../lib/SampleState";

import "react-calendar-timeline-v3/style.css";
import { groupMockMember } from "./lib/group.mock";
import { useEventsState } from "../hooks/useContextFamily";

const queryClient = new QueryClient();

const authParam: AuthInfoProp = {
  accessToken: "0123456789abcdef",
  type: "token",
};

const meta: Meta<typeof MyHorizonTimeline> = {
  title: "MyTimeline",
  component: MyHorizonTimeline,
  decorators: [
    (Story) => (
      // "Error: No QueryClient set, use QueryClientProvider to set one"
      // https://stackoverflow.com/questions/65590195/error-no-queryclient-set-use-queryclientprovider-to-set-one
      <QueryClientProvider client={queryClient}>
        <AuthStateContext.Provider value={authParam}>
          <EventsStateContext.Provider value={exItems}>
            <Story />
          </EventsStateContext.Provider>
        </AuthStateContext.Provider>
      </QueryClientProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof MyHorizonTimeline>;

const groups = [
  { id: 1, title: "group 1" },
  { id: 2, title: "group 2" },
];

export const Standard: Story = {
  async beforeEach() {
    groupMockMember.mockReturnValue(groups);
    fn(useEventsState).mockReturnValue(exEvents)
  },
  args: {
    // items: exItems,
    // groups: groups,
    visibleTimeStart: 1457902922261,
    visibleTimeEnd: 1457902922261 + 86400000,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // canvas.getByRole
    expect(canvas.getByText("マイタイムライン")).toBeInTheDocument();
  },
};
