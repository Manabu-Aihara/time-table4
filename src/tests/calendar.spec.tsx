import { render } from '@testing-library/react';
import { MockInstance } from 'vitest';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MyCalendar } from "../components/pages/CalendarComponent";
import { exItems } from '../lib/SampleState';
import { AuthInfoProp } from '../lib/TimelineType';
import * as useContextFamily from '../hooks/useContextFamily';
import * as useAuthGuard from '../hooks/useAuthGuard';

const exAuth: AuthInfoProp = {
  type: 'auth',
  authId: 500,
  group: 4
}
const queryClient = new QueryClient();
let useContextStateSpy: MockInstance;
describe.skip('Calendar', () => {
  beforeEach(() => {
    useContextStateSpy = vi.spyOn(useContextFamily, 'useEventsState')
    // useContextStateSpy.mockReturnValue(exItems);
    useContextStateSpy.mockImplementation(() => []);
    const useGuardSpy = vi.spyOn(useAuthGuard, 'useAuthInfo');
    useGuardSpy.mockResolvedValue(exAuth);
  });
  // it('DOM に何も表示されていないこと', () => {
  //   const screen = render(
  //     <QueryClientProvider client={queryClient}>
  //       <MyCalendar />
  //     </QueryClientProvider>
  //     );
  //   expect(screen.container.innerHTML).toBe([]);
  // });
  it('まずはレンダリング', () => {
    const {asFragment, rerender} = render(
      <QueryClientProvider client={queryClient}>
        <MyCalendar />
      </QueryClientProvider>
    );
    useContextStateSpy.mockImplementation(() => exItems);
    rerender(
      <QueryClientProvider client={queryClient}>
        <MyCalendar />
      </QueryClientProvider>
    )
    expect(asFragment()).toMatchSnapshot();
    // expect(renderResult.container.getElementsByClassName('rbc-event').length).toBe(3);
  });
  afterEach(() => {
    useContextStateSpy.mockClear();
  })
});
