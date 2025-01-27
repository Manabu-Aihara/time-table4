import { TimelineGroupBase } from 'react-calendar-timeline-v3';
import { GroupUserProps } from '../lib/TimelineType';
import { useGroupUsersQuery } from '../resources/queries';

// const groupQuery: GroupUserProps[] | undefined = useGroupUsersQuery().data?.data;

const sampleGroups: TimelineGroupBase[] = [
  { id: 1, title: "group 1" },
  { id: 2, title: "group 2" },
];
  
export const getGroup = (groupQueries?: GroupUserProps[]): TimelineGroupBase[] => {
  const result = groupQueries ? groupQueries.map((groupUser, k) => {
    return {id: groupUser.staff_id, title: groupUser.family_kana}
  }) : sampleGroups;
  return result;
}
