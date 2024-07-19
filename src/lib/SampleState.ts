import moment from "moment";

import { AuthInfoProp, EventItem, TimelineEventProps } from "./TimelineType";

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
    end_time: moment().add(1, 'hour'),
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1))
  },
  {
    id: 2,
    group: 5,
    staff_id: 501,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour'),
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1))
  },
  {
    id: 3,
    group: 4,
    staff_id: 500,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1))
  }
]

const adjustTime = (plusH: number): Date => {
  return new Date(new Date().setHours(new Date().getHours() + plusH))
}
export const exEvents: TimelineEventProps[] = [
  {
    id: 1,
    group: 4,
    staff_id: 500,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour'),
    start: new Date(),
    end: adjustTime(1)
  },
  {
    id: 2,
    group: 5,
    staff_id: 501,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour'),
    start: adjustTime(1),
    end: adjustTime(2)
  },
  {
    id: 3,
    group: 4,
    staff_id: 500,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
    start: adjustTime(2),
    end: adjustTime(3)
  }
]

export const exAuthToken: AuthInfoProp = {
  type: 'token',
  accessToken: '0123456789abcdef'
}
export const exAuthUser: AuthInfoProp = {
  type: 'auth',
  authId: 500,
  group: 4
}
