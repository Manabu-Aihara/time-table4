import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';
import moment from 'moment';

// import { EventItem } from '../lib/EventItem';
import { TimelineEventProps } from '../../lib/TimelineType';
import { useEventsQuery, useUserEventQuery } from '../../resources/queries';
import { useAuthContext } from '../../hooks/useContextFamily';
import { fetchEventDataForTT } from '../../resources/fetch';
// import { timelineEventsReducer } from '../../lib/reducer';

// type EventItems = EventItem[];
export type TimelineEventPropsList = TimelineEventProps[]

// * State専用 Context *
// 今後 Providerを使わない時にはContextの値がundefinedになる必要があるので, 
// Contextの値がEventsにもundefinedにもできるように宣言してください。
export const EventsStateContext = createContext<TimelineEventPropsList | undefined>(undefined);

export type Action = 
  | { type: 'CREATE'; payload: {
      id: number,
      staff_id: number,
      group: number,
      title: ReactNode
      }
    }
  | { type: 'UPDATE'; payload: TimelineEventProps };

type EventsDispatch = Dispatch<Action>;

// * Dispatch専用 Context *
export const EventsDispatchContext = createContext<EventsDispatch | undefined>(
  undefined
);

export const EventsContextProvider = ({ children }: { children: ReactNode }) => {
  // const [events, dispatch] = useReducer(timelineEventsReducer, [
  const initialData: TimelineEventProps = {
    id: 0,
    staff_id: 1000,
    group: 7,
    title: 'Learn cool stuff',
    // moment.utc("2019-02-21 09:00").local().format();  //"2019-02-21T18:00:00+09:00"
    start_time: moment(),
    end_time: moment().add(1, 'hours'),
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1))
  }

  const authContext = useAuthContext();
  const token = authContext.type === 'token' ? authContext.accessToken : undefined;
  // useEffect(() => {
  //   const f = async () => {
  //     console.log('Passed');
  //     const fetchmono = await fetchEventDataForTT(token!);
  //     console.log(`fetch json: ${fetchmono}`);
  //   }
  //   f();
  // }, []);

  // const { data } = useEventsQuery();
  const { data } = useUserEventQuery();
  // console.log(`Parent json: ${JSON.stringify(data)}`);
  const toString = Object.prototype.toString;
  // toString.call(new Date()); // [object Date]
  // console.log('End type is moment?: ', moment.isMoment(data?.slice(-1)[0].end_time));
  const state: TimelineEventPropsList = [initialData].concat(data!);
  
  return (
    <EventsStateContext.Provider value={state}>
      {/* <EventsDispatchContext.Provider value={dispatch}> */}
				{children}
      {/* </EventsDispatchContext.Provider> */}
    </EventsStateContext.Provider>
  );
}
