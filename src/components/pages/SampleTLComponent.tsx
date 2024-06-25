import { useState, useEffect, useRef, useCallback } from 'react';
import { chakra } from '@chakra-ui/system';

import ReactCalendarTimeline from 'react-calendar-timeline';

import { TimelineEventProps } from '../../lib/TimelineType';
import { useEventsState, useAuthContext } from '../../hooks/useContextFamily';
// import { TitleInputModal } from '../organisms/DialogComponent'; 
import { AddChildForm } from "../organisms/InputItem";

// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';
// import { topWidth } from '../sprinkles.responsive.css';

import moment from 'moment';

const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

interface EventProps {
  targetEvent: TimelineEventProps;
	onShowFormView: (targetEvent: TimelineEventProps) => void;
}

export const SampleTimeline = ({onShowFormView, targetEvent}: EventProps) => {

  const [showModal, setShowModal] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

  const state = useEventsState();

  // const token = useAuthContext();
  const toString = Object.prototype.toString;
  console.log(`Event in timeline: ${JSON.stringify(state)}`, toString.call(state.slice(-1)[0].end));

  // TypeScriptでReactのイベントにどう型指定するか
  // https://komari.co.jp/blog/10724/
  const handleOuterBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!(e.target instanceof HTMLButtonElement)){
      return;
    }
    setShowModal(false);
  }

  useEffect(() => {
    divRef?.current?.scrollIntoView({behavior: 'smooth'});
    // console.log(`Container: ${ref.current?.outerHTML}`);
  }, [targetEvent]);

  const handleSelectEvent = useCallback((callingEvent: TimelineEventProps) => {
    const { title, start_time, end_time } = callingEvent;
    console.log(`選んだイベント: ${start_time}: ${end_time}: ${title}`);
    onShowFormView(callingEvent);
    setShowModal(true);
  }, []);

  const closeInputForm = () => {
    setShowModal(false);
  }

  return (
    <div>
      Rendered by react!
      <chakra.div display="flex" justifyContent="flex-start" overflowX="auto" scrollSnapType="x mandatory">
        <chakra.div display="flex" justifyContent="flex-start" overflowY="auto" scrollSnapType="y mandatory">
          <ReactCalendarTimeline
            groups={groups}
            items={state.map((item) => {
              return (
                {
                  itemProps: {
                    onDoubleClick: () => handleSelectEvent(item),
                  },
                  id: item.id,
                  staff_id: item.staff_id,
                  group: item.group,
                  start: item.start,
                  end: item.end,
                  title: item.title,
                  start_time: item.start_time,
                  end_time: item.end_time,
                  // onClick: () => handleSelectEvent(item)
                  // ...item
                }
              );
            })}
            // itemRenderer={(prop) => prop.timelineContext}
            // visibleTimeStart={-10000}
            defaultTimeStart={moment().add(-24, 'hour')}
            defaultTimeEnd={moment().add(24, 'hour')}
          />
        </chakra.div>
      </chakra.div>
      <chakra.div flexShrink="0" scrollSnapAlign="start" onClick={handleOuterBubbling}>
        {showModal && <AddChildForm selectedEvent={targetEvent} closeClick={closeInputForm} ref={divRef} />}
      </chakra.div>
      {/* <TitleInputModal /> */}
    </div>
  );
}
