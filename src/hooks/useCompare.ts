import { useRef, useEffect } from 'react';
import { TimelineEventProps } from "../lib/TimelineType";

//実際に使うhook
export const useChangeDebugger = (props: TimelineEventProps[]) => {
  const previousValue = usePrevious(props);

  const getChange = previousValue && getChanges(previousValue, props);

  if (getChange) {
    getChange.forEach((change) => console.log(change?.valueOf.call(previousValue)));
  // return getChange?.valueOf.call(previousValue);
  }
};

export const usePrevious = (props: TimelineEventProps[]) => {
  const previousValue = useRef<TimelineEventProps[] | null>(null);

  useEffect(() => {
    previousValue.current = props;
  });

  return previousValue.current;
};

function getChanges(previousValue: TimelineEventProps[],
  currentValue: TimelineEventProps[]) {
  if (
    typeof previousValue === "object" &&
    previousValue !== null &&
    typeof currentValue === "object" &&
    currentValue !== null
  ) {
    return Object.entries(currentValue).reduce<unknown[]>((acc, cur) => {
      const [key, value] = cur;
      const oldValue = previousValue[Number(key)];

      if (value !== oldValue) {
        acc.push({
          name: key,
          previousValue: oldValue,
          currentValue: value,
        });
      }

      return acc;
    }, []);
  }

  if (previousValue !== currentValue) {
    return [{ previousValue, currentValue }];
  }

  return [];
}