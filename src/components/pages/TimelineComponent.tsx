import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactCalendarTimeline from "react-calendar-timeline";
import { Timeline } from "react-calendar-timeline-v3";

import { useGroupUsersQuery, useGroupNameQuery, useAuthQuery, useRefreshQuery } from "../../resources/queries"
import { useAuthContext, useEventsState } from "../../hooks/useContextFamily";

import 'react-calendar-timeline/lib/Timeline.css';
// Missing "./dist/style.css" specifier in "react-calendar-timeline-v3" package
// https://stackoverflow.com/questions/76406764/shareable-vite-vue-component-why-am-i-getting-error-about-missing-css-export
import 'react-calendar-timeline-v3/style.css';

export const MyHorizonTimeline = () => {
  // グループメンバーカラム
  const { data: groupUsers } = useGroupUsersQuery();
  console.log(`Member in timeline: ${JSON.stringify(groupUsers)}`);
  const groupMember = groupUsers?.data.map((v, k) => {
    return {id: v.staff_id, title: v.family_kana}
    // ここのidが、TimelineEventProps.groupに対応する🙁
  });

  const authState = useAuthContext();
  const tokenContext = authState.type === 'token' ? authState.accessToken : undefined;
  // const { data: refreshToken } = useRefreshQuery();
  // ログインユーザー
  const { data: yourInfo } = useAuthQuery(tokenContext!);
  const strYourInfo = JSON.stringify(yourInfo?.data);
  console.log(`Auth in timeline: ${strYourInfo}`);

  // ログインユーザーと同グループ全イベント
  const stateAll = useEventsState();
  const state = stateAll.length > 2 ? stateAll.map((stateEvent) => {
    const convEventGroup: number = stateEvent.staff_id
    stateEvent.group = convEventGroup
    return stateEvent
  }) : undefined;
  console.log(`Events in timeline: ${JSON.stringify(state)}`);

  const visibleTimeStart = moment().add(-12, 'hours');
  const visibleTimeEnd = moment().add(12, 'hours');
  const onBoundsChange = (canvasTimeStart: number, canvasTimeEnd: number) => {
    console.log(moment(canvasTimeStart).toDate());
    console.log(moment(canvasTimeEnd).toDate());
    console.log(visibleTimeStart);
    console.log(visibleTimeEnd)
  };

  // if(!groupMember && state!.length < 2) return <p>タイムラインを表示します…</p>

  return (
    <>
      <button>
        <Link to='/calendar'>カレンダー</Link>
      </button>
      {groupMember && state &&
        <Timeline
          groups={groupMember}
          // items={exItems}
          items={state.map((item) => {
            return {
              ...item,
              }
            })}
          defaultTimeStart={new Date(new Date().setDate(new Date().getHours() - 12))}
          defaultTimeEnd={new Date(new Date().setDate(new Date().getHours() + 12))}
          // visibleTimeStart={visibleTimeStart}
          // visibleTimeEnd={visibleTimeEnd}
          minZoom={24 * 60 * 60 * 1000}
          maxZoom={365.24 * 86400 * 1000}
          canMove={true}
          canResize={'both'}
          onBoundsChange={onBoundsChange}
        />
      }
    </>
  )
}
