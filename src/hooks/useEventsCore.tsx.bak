import { ComponentProps, useState, useCallback, useReducer } from 'react';
import { Event } from 'react-big-calendar';

type Events = Event[];
type State = {
  events: Events;
  isShow: boolean;
}

const initialStateFactory = (initialState: Partial<State>): State => ({
  events: [],
  isShow: false,
  ...initialState
});

// 汎用性高い* Reducer *
const reducer = <T extends { [key: string]: any }>(
  state: T,
  action: { type: keyof T; value: any }
) => {
  return { ...state, [action.type]: action.value } as T;
};

// type InputField<C extends keyof React.ComponentProps<'input'>> = {
//   state: C
// }
type InputField = ComponentProps<'input'>;

type DialogForm = {
  inputFields: InputField[]
}

export const useFormPages = <T extends { [key: string]: any }>(
  initialValues: T,
  form: DialogForm
) => {
  const [formValues, dispatch] = useReducer(reducer, initialValues);

  const [isShow, setIsShow] = useState(false);
  const show = useCallback(() => setIsShow(true), []);

  const showDialog = form.inputFields.map((field, i) => {
    const key = field.key as string;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
          type: "SHOW", value: e.currentTarget.value });
      },
      [dispatch]
    );

    return (
      <div>
      <form onSubmit={onSubmit}>
        <input
          {...field}
          placeholder="やることを入力してくださいー"
          onChange={handleChange}
        />
        <button>追加</button>
      </form>
    </div>
    );
  })
}
