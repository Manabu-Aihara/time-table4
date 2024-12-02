import { Link } from 'react-router-dom';
import ReactCalendarTimeline from "react-calendar-timeline";

import { useGroupNameQuery } from "../../resources/queries"
import { useEventsState } from "../../hooks/useContextFamily";

import 'react-calendar-timeline/lib/Timeline.css';

export const MyHorizonTimeline = () => {
  const { data } = useGroupNameQuery();
  const groups = data?.data.map((v, k) => {
    return {id: k + 1, title: v, rightTitle: v}
  });

  const stateAll = useEventsState();
  const state = stateAll.length > 2 ? stateAll : undefined;
  console.log(`Event in timeline: ${JSON.stringify(state)}`);

  return (
    <>
    <button>
      <Link to='/calendar'>カレンダー</Link>
    </button>
    {groups && state &&
      <ReactCalendarTimeline
        groups={groups}
        // items={state}
        items={state.map((item) => {
          return {
            ...item,
            // id: item.id,
            // staff_id: item.staff_id,
            // group: item.group,
            // start: item.start,
            // end: item.end,
            // title: item.title,
              // start_time: item.start_time,
              // end_time: item.end_time,
            }
          })}
          defaultTimeStart={new Date(new Date().setDate(new Date().getHours() - 12))}
          defaultTimeEnd={new Date(new Date().setDate(new Date().getHours() + 12))}
          // visibleTimeStart={moment().add(-12, 'hours')}
          // visibleTimeEnd={moment().add(-12, 'hours')}
          minZoom={24 * 60 * 60 * 1000}
          maxZoom={0.5 * 365.24 * 86400 * 1000}
          canMove={true}
          canResize={'both'}
        />
      }
    </>
  )
}
