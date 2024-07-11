import { useCallback, CSSProperties } from 'react';
import { EventPropGetter } from 'react-big-calendar';

import { TimelineEventProps } from '../../lib/TimelineType';

export const eventPropGetter = (
  (event: TimelineEventProps, searchId: string) => {
  const exceptStyle: CSSProperties = {
    pointerEvents: 'none',
    opacity: '.7'
  }
  const draggableClass = event.isDraggable ?
    { className: 'isDraggable' } : { className: 'nonDraggable' }
  const indenticalStyle: CSSProperties = {
    pointerEvents: 'auto'
  }

  if(event.staff_id.toString() !== searchId){
    return { style: exceptStyle }
  }else{
    // return draggableClass
    return { style: indenticalStyle }
  }
})
