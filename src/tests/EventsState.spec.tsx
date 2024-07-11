import { renderHook } from "@testing-library/react";

import { useAuthContext, useEventsState } from '../hooks/useContextFamily';
import { AuthInfoProp } from '../lib/TimelineType';
import { EventsContextProvider } from "../components/templates/EventsParent"
import { AuthProvider } from "../components/templates/AuthParent";

const useEventsStateTest = () => {
  const auth = useAuthContext()
  const state = useEventsState();
  return { auth, state };
}
const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <EventsContextProvider>
        {children}
      </EventsContextProvider>
    </AuthProvider>
  )
}

const exAuth: AuthInfoProp = {
  type: 'auth',
  authId: 500,
  group: 4
}

describe('Hooks test', () => {
  beforeEach(() => {
    // const useGuardSpy = vi.spyOn(useAuthGuard, 'useAuthInfo');
    // useGuardSpy.mockResolvedValue(exAuth);
  })
  it('useEventsState', () => {
    const { result } = renderHook(() => useEventsStateTest(), {wrapper});
    expect(result.current).toHaveLength(3);
  });
});
