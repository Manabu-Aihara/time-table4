import { createContext } from "react";
import { AuthInfoProp, TimelineEventProps } from "./TimelineType";

export const AuthStateContext = createContext<AuthInfoProp | undefined>(undefined);

// * State専用 Context *
// 今後 Providerを使わない時にはContextの値がundefinedになる必要があるので, 
// Contextの値がEventsにもundefinedにもできるように宣言してください。
export const EventsStateContext = createContext<TimelineEventProps[] | undefined>(undefined);

