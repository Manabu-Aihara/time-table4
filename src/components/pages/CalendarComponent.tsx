import { useState, useCallback, useRef, useMemo } from 'react';
import { Calendar, Views, View, SlotInfo } from 'react-big-calendar'
import withDragAndDrop, { OnDragStartArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import { chakra } from '@chakra-ui/system';

import { useEventsState } from '../../hooks/useContextFamily';
import { useMouseEvents } from '../../hooks/useMouseHandle';
import { useCallingEditForm } from '../../hooks/useCallingForm';
import localizer from '../../lib/Localization';
import { TimelineEventProps, EventFormProps } from '../../lib/TimelineType';
import { CustomContainerWrapper, CustomEventWrapper, CustomEventCard } from '../molecules/WrapComponent';
import { TimesUpdateButton } from '../molecules/TimeUpdateButtonComponent';
import { MyWeek } from '../organisms/DaysClassComponent';
import { views } from '../organisms/DaysComponent';
import { DialogOnSlot } from '../organisms/DialogOnSlotComponent';
import { useAuthInfo } from '../../hooks/useAuthGuard';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { AddChildForm } from '../organisms/InputItem';

interface SelectEventProp {
  handleSelectEvent: (
    selectEvent: TimelineEventProps,
    handleEvent?: React.SyntheticEvent<HTMLElement, Event>) => void
}

export const MyCalendar = () => {
  const state = useEventsState();

  /**
   * onDragStart and prevent
   */
  const infoContext = useAuthInfo();

  const [dragStart, setDragStart] = useState<boolean>();
  const onDragStart = useCallback((args: OnDragStartArgs<TimelineEventProps>) => {
    const { event, action } = args;
    if(event.staff_id !== infoContext.authId){
      console.log('ちがうとこ通ります', action);
      setDragStart(false);
    }else{
      setDragStart(true);
    }
  }, []);

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

  const clickRef = useRef<number | undefined>(undefined);
  const [slotInfoState, setSlotInfoState] = useState<SlotInfo>();
  const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      if(countRef.current === clickRef.current){
        setSlotInfoState(slotInfo);
        console.log('ここ通りました');
      }
    }, 250);
    // こっちが先になる
    countRef.current = clickRef.current;
    console.log('今の状態 Slot: ', countRef.current, clickRef.current);
  }, []);

  const [selectEvent, setSelectEvent] = useState<TimelineEventProps>();
  const {handleSelectEvent, EditForm, modal} = useCallingEditForm({onShowFormView(targetEvent){
    setSelectEvent(targetEvent)
  }});

  /**
   * Wrapper component
   */
  const customComponents = useMemo(() => ({
    event: CustomEventCard,
    eventWrapper: CustomEventWrapper,
    // eventContainerWrapper: CustomContainerWrapper
  }), []);

  return (
    <chakra.div>
      <TimesUpdateButton timeChangeEvents={eventList} />
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
      {modal.showModal &&
        <EditForm>
          <AddChildForm selectedEvent={selectEvent!}
            closeClick={modal.closeInputForm} />
        </EditForm>}
      <DialogOnSlot slotInfo={slotInfoState} />
    </chakra.div>
  );
}