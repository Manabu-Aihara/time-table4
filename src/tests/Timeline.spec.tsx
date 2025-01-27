import { act, render, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { expect, vi } from 'vitest';

import * as stories from '../stories/Timeline.stories';

const useGroupUsersQueryMock = vi.hoisted(() => 
  vi.fn(() => ({
    data: [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]
  }))
)
vi.mock('./resources/queries', () => ({
  useGroupUsersQueryMock,
}));

describe('MyHorizonTimeline component', () =>{
  const { Standard } = composeStories(stories);
  it('タイムラインの表示', async () => {
    const { container, getByText } = render(Standard());
    const titleElement = getByText('マイタイムライン');
    expect(container).toMatchSnapshot();
    await act(() => {
      Standard.play?.({ canvasElement: container});
    });
  });
});

// describe('jest.mock', () => {
//   afterEach(() => {
//     // モックのステートをクリア 
//     jest.resetAllMocks()
//   })
//   it('モックを試す', () => {
//     module.MyHorizonTimeline.groupMember()
//   })
// })
