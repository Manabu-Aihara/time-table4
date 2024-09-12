import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { chakra } from '@chakra-ui/system';
import moment from 'moment';

import Timeline from 'react-calendar-timeline';

import { TimelineEventProps } from '../../lib/TimelineType';
import { useEventsState, useAuthContext } from '../../hooks/useContextFamily';
import { AddChildForm } from "../organisms/InputItem";

import 'react-calendar-timeline/lib/Timeline.css';
import { topWidth } from '../sprinkles.responsive.css';

const groupArray = ["本社", "宇都宮", "下野", "鹿沼", "KODOMOTO", "在宅支援", "KO相談", "つくば"]

interface EventFormProps {
  targetEvent: TimelineEventProps,
	onShowFormView: (targetEvent: TimelineEventProps) => void
}

export const MyTimeline = ({onShowFormView, targetEvent}: EventFormProps) => {

  const state = useEventsState();

  const groups = groupArray.map((v, k) => {
    return {id: k + 1, title: v};
  })

  /**
   * Issue summary & progress
   */
  const [showModal, setShowModal] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);
  const handleOuterFormBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!(e.target instanceof HTMLButtonElement)){
      return;
    }
    setShowModal(false);
  }

  const handleSelectEvent = useCallback(
    (callingEvent: TimelineEventProps, e: React.SyntheticEvent<HTMLElement, Event>) =>
  {
    console.log(`Event motion: ${e.type}`);
    onShowFormView(callingEvent);
    setShowModal(true);
  }, []);

  useEffect(() => {
    // console.log('Effect通りました', eventFlag);
    divRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [targetEvent]);

  const closeInputForm = () => {
    setShowModal(false);
  }

  return (
    <chakra.div>
      <button>
        <Link to="/calendar">タイムテーブル</Link>
      </button>
      Rendered by react!
      {/* <chakra.div display="flex" justifyContent="flex-start" overflowX="auto" scrollSnapType="x mandatory"> */}
      <chakra.div overflowX="hidden">
        <Timeline
            groups={groups}
            // items={state} ← これがダメなの、わからない
            items={state.map((item) => {
              return (
                {
                  ...item,
                  // id: item.id,
                  // staff_id: item.staff_id,
                  // group: item.group,
                  // start: item.start,
                  // end: item.end,
                  // title: item.title,
                  // start_time: item.start_time,
                  // end_time: item.end_time,
                  // onClick: () => handleSelectEvent(item)
                  itemProps: {
                    onDoubleClick: (e) => handleSelectEvent(item, e),
                  },                  
                }
              );
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
        </chakra.div>
        <chakra.div flexShrink="0" scrollSnapAlign="start"
          className={topWidth}
          onClick={handleOuterFormBubbling}>
          {showModal &&
            <AddChildForm selectedEvent={targetEvent}
            closeClick={closeInputForm} ref={divRef} />
          }
        </chakra.div>
      {/* </chakra.div> */}
    </chakra.div>
  );
}
