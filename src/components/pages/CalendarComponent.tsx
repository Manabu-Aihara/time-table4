import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Views, View, SlotInfo } from 'react-big-calendar'
import withDragAndDrop, { OnDragStartArgs, withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import { chakra } from '@chakra-ui/system';

import { useEventsState } from '../../hooks/useContextFamily';
import { useDialog } from "../../hooks/useDialog";
import { useAuthInfo } from '../../hooks/useAuthGuard';
import { useMouseEvents } from '../../hooks/useMouseHandle';
import localizer from '../../lib/Localization';
import { TimelineEventProps } from '../../lib/TimelineType';
import { useSearchQuery } from '../../resources/queries';
import { CustomContainerWrapper, CustomEventWrapper, CustomEventCard } from '../molecules/WrapComponent';
import { TimesUpdateButton } from '../molecules/TimeUpdateButtonComponent';
import { MyWeek } from '../organisms/DaysClassComponent';
import { views } from '../organisms/DaysComponent';
import { AddChildForm } from "../organisms/InputItem";
import { TitleInput } from '../organisms/InputTitleDialog';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import cx from 'classnames';
import { topWidth } from '../sprinkles.responsive.css';
import { flexXmandatory, gridArea } from './CalendarComponent.css';
import { MyTimeline } from './TLComponent';
// import { eventData } from '../../lib/SampleState';

interface EventFormProps {
  targetEvent: TimelineEventProps,
	onShowFormView: (targetEvent: TimelineEventProps) => void
}

export const MyCalendar = ({onShowFormView, targetEvent}: EventFormProps) => {
  const state = useEventsState();

  /**
   * Drag and Drop
   */
  const DnDCalendar = withDragAndDrop(Calendar<TimelineEventProps>);
  const { onEventResize, onEventDrop, eventList, prevRef } = useMouseEvents();
  console.log(`Remained prev data: ${JSON.stringify(prevRef.current)}`);

  state.map((evt, j) => {
    // if(prevRef){
      if(prevRef.current?.isDraggable === true && prevRef.current.id === evt.id){
        console.log(`Exclude event id: ${prevRef.current?.id}, ${j}`);
        delete state[j];
        prevRef.current = undefined;
      }
    // }
  });
  /* && console.log(`Exclude event id: ${prevRef.current?.id}, ${j}`)*/
  // console.log(`Old state: ${JSON.stringify(state)}`);
  const newState = eventList ? state.concat(eventList) : state;
  console.log(`Expect update events: ${JSON.stringify(eventList)}`);

  // Viewの切り替え調節、このまんま使える
  const [displayDate, setDisplayDate] = useState(new Date());
  // console.log(`What rbc date: ${displayDate}`);
  const onNavigate = useCallback((newDate: Date) => setDisplayDate(newDate), [setDisplayDate]);
  const [returnView, setReturnView] = useState<View>();
  const onView = useCallback((newView: View) => setReturnView(newView), [setReturnView]);

  // console.log(`Calendar state: ${JSON.stringify(newState)}`);

  /**
   * Slot and Dialog
   */
  const countRef = useRef<number | undefined>();

  const { Dialog, open, close } = useDialog();
  const clickRef = useRef<number | undefined>(undefined);
  const [slotInfoState, setSlotInfoState] = useState<SlotInfo>();
  // useChangeDebugger([targetEvent]);
  // console.log('Compared: ', targetEvent, prevValue);
  const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      if(countRef.current === clickRef.current){
        setSlotInfoState(slotInfo);
        console.log('ここ通りました');
        open();
      }
    }, 250);
    // こっちが先になる
    countRef.current = clickRef.current;
    console.log('今の状態 Slot: ', countRef.current, clickRef.current);
  }, []);

  const guard = useAuthInfo();

  /**
   * Issue summary & progress
   */
  const [showModal, setShowModal] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);
  // TypeScriptでReactのイベントにどう型指定するか
  // https://komari.co.jp/blog/10724/
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
    countRef.current = undefined;
    console.log('切り替わりました Handle: ', countRef.current);
    setShowModal(true);
  }, []);

  useEffect(() => {
    // console.log('Effect通りました', eventFlag);
    divRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [targetEvent]);

	const selectedStaff = `${prevRef.current?.staff_id}` as const;
	const { data: infoContext } = useSearchQuery('userID');
  console.log(infoContext === selectedStaff ? true : false);

  const [dragStart, setDragStart] = useState<boolean>();
  const onDragStart = useCallback((args: OnDragStartArgs<TimelineEventProps>) => {
    const { event, action } = args;
    if(event.staff_id.toString() != infoContext){
      console.log('ちがうとこ通ります', action);
      setDragStart(false);
    }else{
      setDragStart(true);
    }
  }, []);

  const closeInputForm = () => {
    setShowModal(false);
  }

  /**
   * Wrapper component
   */
  const customComponents = useMemo(() => ({
    event: CustomEventCard,
    eventWrapper: CustomEventWrapper,
    // eventContainerWrapper: CustomContainerWrapper
  }), []);

	const [event, setEvent] = useState<TimelineEventProps>();

  return (
    <chakra.div>
      <TimesUpdateButton timeChangeEvents={eventList} />
      <chakra.div className={flexXmandatory}>
        <chakra.div className={cx(gridArea, topWidth)} flexShrink="0" scrollSnapAlign="start">
          <button>
            <Link to="/timeline">サンプルタイムライン</Link>
          </button>
          {/* {event && <MyTimeline
            onShowFormView={targetEvent => setEvent(targetEvent)}
            targetEvent={event} />} */}
          {/* 【CSS】overflowの使い方解説！要素のはみ出し解決
           https://zero-plus.io/media/overflow/ */}
          <chakra.div overflowX="hidden">
            <DnDCalendar
              date={displayDate}
              localizer={localizer}
              events={newState}
              // ドラッグ・アンド・ドロップ、リサイズ後、weekに戻ります
              defaultView="week"
              startAccessor="start"
              endAccessor="end"
              onNavigate={onNavigate}
              // eventPropGetter={eventPropGetter}
              // onDragStart={(...args) => console.log(args)}
              onDragStart={onDragStart}
              onEventDrop={dragStart === false ? undefined : onEventDrop}
              onEventResize={dragStart === false ? undefined : onEventResize}
              resizable
              onSelectEvent={handleSelectEvent}
              // onDoubleClickEvent={handleSelectEvent}
              onSelectSlot={onSelectSlot}
              selectable
              onView={onView}
              // components={customComponents}
              views={views}
            />
          </chakra.div>
        </chakra.div>
        <Dialog {...slotInfoState}>
          <p>入力フォームコンテンツ</p>
          {slotInfoState && <TitleInput authInfo={guard} slotStartTime={slotInfoState.start} />}
          <button onClick={close}>close</button>
        </Dialog>
        <chakra.div flexShrink="0" scrollSnapAlign="start"
          className={topWidth}
          onClick={handleOuterFormBubbling}>
          {showModal &&
            <AddChildForm selectedEvent={targetEvent}
            closeClick={closeInputForm} ref={divRef} />
          }
        </chakra.div>
      </chakra.div>
    </chakra.div>
  );
}
