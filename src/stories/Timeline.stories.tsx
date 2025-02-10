import { expect, within, userEvent, fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock, getMock } from "storybook-addon-module-mock";
// import { createMock, getMock } from "storybook-addon-vite-mock";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TimelineEventProps, AuthInfoProp } from "../lib/TimelineType";
import {
  AuthProvider,
  AuthStateContext,
} from "../components/templates/AuthParent";
import { EventsStateContext } from "../components/templates/EventsParent";
import { MyHorizonTimeline } from "../components/pages/TimelineComponent";
import { exEvents, exGroupUsers, exItems } from "../lib/SampleState";
import * as timelineProps from "../lib/TmelineData";
// import { getGroup, getItems } from "../lib/TmelineData";

import "react-calendar-timeline-v3/style.css";

const queryClient = new QueryClient();

const authParam: AuthInfoProp = {
  accessToken: "0123456789abcdef",
  type: "token",
};

const meta: Meta<typeof MyHorizonTimeline> = {
  title: "MyTimeline",
  component: MyHorizonTimeline,
  decorators: [
    (Story) => {
      // "Error: No QueryClient set, use QueryClientProvider to set one"
      // https://stackoverflow.com/questions/65590195/error-no-queryclient-set-use-queryclientprovider-to-set-one
      return (
        <QueryClientProvider client={queryClient}>
          <AuthStateContext.Provider value={authParam}>
            <EventsStateContext.Provider value={exEvents}>
              <div style={{border: '2px solid purple'}}>
                <Story />
              </div>
            </EventsStateContext.Provider>
          </AuthStateContext.Provider>
        </QueryClientProvider>
      )
    },
  ],
};
export default meta;
type Story = StoryObj<typeof MyHorizonTimeline>;

const groups = [
  { id: 1, title: "group 1" },
  { id: 2, title: "group 2" },
];

export const Standard: Story = {
  beforeEach: async () => {
    // await groupMockMember.mockReturnValue(groups);
    // await eventsStateMock.mockReturnValue(exItems);
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

export const ModuleMock: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const mockGroup = createMock(timelineProps, 'getGroup');
        // const mockGroup = createMock(() => getGroup(exGroupUsers));
        mockGroup.mockReturnValue(groups);
        const mockItems = createMock(timelineProps, 'getItems');
        // const mockItems = createMock(() => getItems(exEvents));
        mockGroup.mockReturnValue(exEvents);
        return [mockGroup, mockItems]
      }
    }
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('item 2')).toBeInTheDocument();
    const mock1 = getMock(parameters, timelineProps, 'getGroup');
    // const mock1 = getMock(parameters, () => getGroup(exGroupUsers));
    expect(mock1).toBeCalled();
    const mock2 = getMock(parameters, timelineProps, 'getItems');
    // const mock2 = getMock(parameters, () => getItems(exEvents));
    expect(mock2).toBeCalled();
  }
}
