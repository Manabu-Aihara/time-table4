import { TimelineEventPropsList, Action } from '../components/templates/EventsParent';

// * Reducer *
export const timelineEventsReducer = (timelineEventsState: TimelineEventPropsList, action: Action): TimelineEventPropsList => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE':
      return timelineEventsState.concat({
        id: payload.id,
        staff_id: payload.staff_id,
        group: payload.group,
        title: payload.title,
        start_time: new Date(),
        end_time: new Date(new Date().setHours(new Date().getHours() + 1)),
      });
    case 'UPDATE':
      return timelineEventsState.map(evt => evt.title === action.payload.title ? action.payload : evt)
    default:
      throw new Error('Invalid action');
  }
}

