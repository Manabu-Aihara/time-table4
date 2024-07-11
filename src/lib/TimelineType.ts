import { Event, EventWrapperProps } from 'react-big-calendar';
import moment from 'moment';
import { TimelineItemBase as TimelineItem } from 'react-calendar-timeline';

// type CustomEvent = Omit<Event, 'title'>
export interface EventItem extends Event {
	staff_id: number,
	summary?: string,
	progress?: string
}

type Merge<T, U> = Omit<T, keyof U> & U

type NewTimelineItem = Omit<TimelineItem<Date> & EventItem,
	'title' | 'start_time' | 'end_time'>

/**
 * Before App type
 * export type EventItem = Event & {
	summary: string;
	owner: string;
	done: string;
}
 */
/**
 * Finally Event type
 * type TimelineEventProps = {
	id: Id;
	group: Id;
	// title?: React.ReactNode;
	start_time: DateType → monment.Moment;
	end_time: DateType → moment.Moment;
	start: Date;
	end: Date;

	staff_id: number;
	title: React.ReactNode;
	summary?: string;
	progress?: string;
}
 */
// TimelineItemBaseのやっかいなId = string | numberを何とかしたい
type PropertyToNumber<T> = {
	[Key in keyof T]: number;
}
type PickTypeId = Pick<TimelineItem<Date>, 'id' | 'group'>;
type NumberOfId = PropertyToNumber<PickTypeId>;
type pickId = NumberOfId['id'];
type pickGroup = NumberOfId['group'];
const x: NumberOfId = {id: 123, group: 456}

export type TimelineEventProps = Merge<NewTimelineItem, {
	// id: pickId;
	// group: pickGroup;
  title: React.ReactNode;
	start_time: moment.Moment;
	end_time: moment.Moment;
  isDraggable?: boolean;
}>;

// 使ってません
export type PickDate = Pick<TimelineEventProps, 'start' | 'end' | 'id'>;

// ここから、認証Prop
export type AuthInfoProp =
	{ type: 'auth'; authId: number; group: number }
	| { type: 'token'; accessToken: string };

// 以下、とりあえず使ってみる
type Option<V> =
{ type: V; authId: number; group: number }
| { type: V; accessToken: string };

/**
 * AuthGuardContext<V>: Option<T>を受け取って、渡されたのがAuth型なら中身の値の型を返す。
 * 渡されたのがnumber型ならundefinedを返す。
 */
type ExpectedAuth<V extends Option<unknown>> = V extends Option<infer R> ? R : never;

export type AuthGuardContext = ExpectedAuth<Option<AuthInfoProp>>;
const opt1: AuthGuardContext = {type: 'token', accessToken: ''};
const opt2: AuthGuardContext = {type: 'auth', authId: 0, group: 100};

export interface EventFormProps {
  targetEvent?: TimelineEventProps,
	onShowFormView: (targetEvent: TimelineEventProps) => void
}

export interface ChangingButtonProp {
  timeChangeEvents: TimelineEventProps[],
}

export interface CalendarActionProps {
  setTimeChangeEvents?: (movedEvents: TimelineEventProps[]) => void
}
