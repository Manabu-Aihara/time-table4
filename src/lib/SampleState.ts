import moment from "moment";

import { EventItem, TimelineEventProps } from "./TimelineType";

export const eventData: EventItem = {
  staff_id: 1000,
  title: 'Learn cool stuff',
  start: moment().toDate(),
  end: moment().add(1, 'hours').toDate()
}

export const exItems: TimelineEventProps[] = [
  {
    id: 1,
    group: 4,
    staff_id: 500,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 5,
    staff_id: 501,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 6,
    staff_id: 502,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]
