import { useState, FormEvent, ReactNode } from 'react';

import { useEventsDispatch, useEventsState } from '../lib/UseContext';
import { eventsReducer } from '../components/EventsParent';

type InputElementProps = React.ComponentProps<'input'>;

type DialogProps = {
  isOpen: boolean;
  children: ReactNode;
  close: () => void;
};

export const useInputDialog = () => {
  const [title, setTitle] = useState<string>('');
  // const [eventItem, setEventItem] = useState<EventItem>(null)
  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

  const InputDialog = ({children}: {children: ReactNode}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // このコンポーネントで onChange 発火時に必ず実行したい振る舞いを書く
      // const {name, value} = e.target;
      setTitle(e.target.value);
      // console.log(`ここにも注目：${title}`);
    };

    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      dispatch({
        type: 'CREATE',
        payload: {title: title}
      });
      // console.log(`ここ注目：${JSON.stringify(currentState)}`);
      const nextStage = eventsReducer(currentState, {type: 'CREATE', payload: {title: title}});
      console.log(`ここ注目：${JSON.stringify(nextStage)}`);
    };

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
	// 	e.preventDefault();
	// 	fetch('http://127.0.0.1:8000/todo/add', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Access-Control-Allow-Origin': '*',
	// 			// mode: 'no-cors',
	// 			// Accept: 'application/json',
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			// todo
	// 			summary: todo.summary,
	// 			owner: todo.owner,
	// 			done: todo.done
	// 		})
	// 	})
	// 	.then(res => res.json());
	// 	// .then(json => console.log(json))
	// 	// .catch(err => console.log(err));
	// }

  return (
      <div>
        {children}
          <input
            // {...inputProps}
            placeholder="やることを入力してくださいー"
            onChange={handleChange}
          />
          <button onClick={onSubmit}>追加</button>
      </div>
    );
  }

  return InputDialog;
}