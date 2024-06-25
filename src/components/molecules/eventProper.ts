import { useCallback, CSSProperties } from 'react';

import { TimelineEventProps } from '../../lib/TimelineType';
import { useSearchQuery } from '../../resources/queries';

const useKaliGetter = () => {
  const { data } = useSearchQuery('userID');
  const eventPropGetter = useCallback((event: TimelineEventProps) => {
    // 後ろの要素をクリックさせたい時は「pointer-events」を使おう。
    // https://hp-shizuoka.jp/column/2018/01/21584/
    const exceptStyle: CSSProperties = {
      pointerEvents: 'none',
      opacity: '.7'
    }
    const draggableClass = event.isDraggable ?
      { className: 'isDraggable' } : { className: 'nonDraggable' }
    const indenticalStyle: CSSProperties = {
      pointerEvents: 'auto'
    }

    if(event.staff_id.toString() != data){
      // console.log(`上通りました: ${event.staff_id}`);
      return { style: exceptStyle }
    }else{
      // console.log('下通りました');
      return draggableClass
      // return { style: indenticalStyle }
    }
  }, [data]);
}
