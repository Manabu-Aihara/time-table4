import { useState, FormEvent } from 'react';

import { useEventsDispatch, useEventsState } from '../../hooks/useContextFamily';
import { timelineEventsReducer } from '../../lib/reducer';

type InputElementProps = React.ComponentProps<'input'>;

export const TitleInput = (inputAttr: InputElementProps) => {
  const [title, setTitle] = useState<string>('');
  const [id, setId] = useState<number>(0);
  const [staff_id, setStaff_id] = useState<number>(0);
  const [group, setGroup] = useState<number>(0);

  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      payload: {
        id: id,
        staff_id: staff_id,
        group: group,
        title: title
      }
    });
    console.log(`Dialog前の: ${JSON.stringify(currentState)}`);
    // I’ve dispatched an action, but logging gives me the old state value
    // https://react.dev/reference/react/useReducer
    const nextStage = timelineEventsReducer(currentState, {
      type: 'CREATE',
      payload: {
        id: id,
        staff_id: staff_id,
        group: group,
        title: title
      }
    });
    console.log(`Dialog後の: ${JSON.stringify(nextStage)}`);
  };

  return (
    <div>
      {/* <form onSubmit={onSubmit}> */}
      <input
        {...inputAttr}
        placeholder="やることを入力してください"
        onChange={handleChange}
      />
      <button onClick={onSubmit}>追加</button>
      {/* </form> */}
      <p></p>
      {/* <button onClick={close}>close</button> */}
    </div>
  );
};