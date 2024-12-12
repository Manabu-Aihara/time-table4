import { useState, ComponentProps } from 'react';
// import * as TimeGrid from 'react-big-calendar/lib/TimeGrid';
import { TimeGrid } from 'react-big-calendar';
import { NavigateAction } from 'react-big-calendar';
import { DateLocalizer, Navigate, TitleOptions } from 'react-big-calendar';
import moment from 'moment';

import { SampleTimeline } from '../pages/SampleTLComponent';
import { TimelineEventProps } from '../../lib/TimelineType';

export const MyWeek = () => {
	const [event, setEvent] = useState<TimelineEventProps>();
  const range = MyWeek.range(new Date())

  // return <TimeGrid range={range} eventOffset={15}/>
  return <SampleTimeline onShowFormView={
    (event: TimelineEventProps) => setEvent(event)}
    targetEvent={event!}></SampleTimeline>
  // return <div>{`${range}`}</div>
}

MyWeek.navigate = (date: Date, action: NavigateAction) => {
  switch (action) {
    case 'PREV':
      return moment(date).add(-3, 'day').toDate()

    case 'NEXT':
      return moment(date).add(3, 'day').toDate()

    default:
      return date
  }
}

MyWeek.range = (date: Date) => {
  const start = date;
  const end = moment(start).add(2, 'day').toDate();

  let current = start;
  const range = [];

  while (moment(current).isSameOrBefore(moment(end), 'day')) {
    range.push(current);
    current = moment(current).add(1, 'day').toDate();
  }
  // while (localizer.lte(current, end, 'day')) {
  //   range.push(current)
  //   current = localizer.add(current, 1, 'day')
  // }

  return range;
}

MyWeek.title = (date: Date, localizer: DateLocalizer): string => {
  const [...rest] = MyWeek.range(date);
  // return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
  return localizer.format(new Date(), 'dayRangeHeaderFormat') + ' — ' + localizer.format(rest.pop()!, 'dayRangeHeaderFormat');
  // return `My awesome week: ${date.toLocaleDateString()}`
}

// export const {views, ...otherprops} = {
//   views: {
//     month: true,
//     week: MyWeek,
//     day: true
//   },
//   // ... other props
// }

// MyWeek.title = (date: Date, option: TitleOptions): string => {
//   type AnyType = ComponentProps<typeof option['']>;
//   const l: DateLocalizer | AnyType = option;
//   const castLocalizer: DateLocalizer = l as DateLocalizer;

//   const [...rest] = MyWeek.range(date);

//   console.log(`option.dateFormats: ${option.formats}`);
//   console.log(date);

//   return castLocalizer.format(new Date(), 'dayRangeHeaderFormat') + ' — ' + castLocalizer.format(rest.pop()!, 'dayRangeHeaderFormat');
// }

// export default MyWeek
// export class MyWeek extends React.Component<MyWeekProps> {
//   static title = (date: Date) => {
//     return `My awesome week: ${date.toLocaleDateString()}`
//   }

//   static navigate = (date: Date, action: NavigateAction) => {
//     switch (action) {
//       case 'PREV':
//         return moment(date).add(-3, 'day').toDate()

//       case 'NEXT':
//         return moment(date).add(3, 'day').toDate()

//       default:
//         return date
//     }
//   }

//   static range = (date: Date) => {
//     let start = date
//     let end = moment(start).add(2, 'day')

//     let current = start
//     let range = []

//     while (moment(current).isSameOrBefore(moment(end), 'day')) {
//       range.push(current)
//       current = moment(current).add(1, 'day').toDate()
//     }

//     return range
//   }

//   render() {
//     let {date} = this.props
//     let range = MyWeek.range(date)

//     return <TimeGrid {...this.props} range={range} eventOffset={15}/>
//     // return <div>{`${range}`}</div>
//   }
// }