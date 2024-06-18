import { render, fireEvent, RenderResult } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import moment from 'moment';
import { TimesUpdateButton } from "../components/molecules/TimeUpdateButtonComponent";
import { TimelineEventProps } from '../lib/TimelineType';

const items: TimelineEventProps[] = [
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
    staff_id: 501,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    staff_id: 502,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]
const queryClient = new QueryClient();

let renderResult: RenderResult;
describe('DnDアップデート用ボタン', () => {
  beforeEach(() => {
    renderResult = render(
      <QueryClientProvider client={queryClient}>
        <TimesUpdateButton timeChangeEvents={items} />
      </QueryClientProvider>);
  });

  test('まずはレンダー', () => {
    expect(renderResult.getByText('変更回数: 3')).toBeInTheDocument();
  });
  test('リセットボタンクリック', () => {

  });
})
