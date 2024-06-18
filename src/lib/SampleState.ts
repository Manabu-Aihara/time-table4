import moment from "moment";

import { EventItem } from "./TimelineType";

export const eventData: EventItem = {
  staff_id: 1000,
  title: 'Learn cool stuff',
  start: moment().toDate(),
  end: moment().add(1, 'hours').toDate()
}

const exItems = [
  {
    id: 1,
    group: 1,
    staff_id: 500,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]
