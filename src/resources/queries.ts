import { useCallback, useMemo } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import moment from 'moment';

import { TimelineEventProps, AuthInfoProp } from "../lib/TimelineType";
import { fetchEventsData, fetchGetResponse, refresh } from "./fetch";
import { eventKeys, authKeys } from "./cache";
import { useAuthContext } from "../hooks/useContextFamily";

export const useSearchQuery = (searchKey: string) => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);

  return useQuery({
    queryKey: authKeys.search(searchKey),
    queryFn: () => query.get(searchKey)
  });
}

export const useRefreshQuery = () => {
  const authContext = useAuthContext();
  const tokenContext = authContext.type === 'token' ? authContext.accessToken : undefined;  

  return useQuery({
    queryKey: authKeys.verify(tokenContext!),
    queryFn: () => refresh(tokenContext!)
  });
}

export const useAuthQuery = (searchToken: string) => {
  return useQuery({
    queryKey: authKeys.verify(searchToken),
    queryFn: () => fetchGetResponse(searchToken),
    // select: useCallback((resp: AxiosResponse<AuthInfoProp>) => {
    //   if(resp.data.type === 'auth')
    //     return {
    //       authId: resp.data.authId,
    //       group: resp.data.group,
    //       ...resp
    //     }
    // }, [])
  })
}
    // 以下は恐ろしいことに…
  // const [tokenState, setTokenState] = useState<TokenProp>();
  // setTokenState({...tokenContext, accessToken: query.get('token')!});
  // const [state, dispatch] = useReducer((state: TokenProp, newState: Partial<TokenProp>) => ({ ...state, ...newState }),
  //   { accessToken: '' }
  // );
  // dispatch({accessToken: query.get('token')!});

// Data not recalculated when select function changes #1580
// https://github.com/TanStack/query/issues/1580
export const useEventsQuery = () => {
  // const search = useLocation().search;
  // const query = new URLSearchParams(search);
  // JavaScript の分割代入で変数名を変更する
  // https://qiita.com/masachoco/items/601b6771021bde2311f8
  const { data: searchQuery } = useSearchQuery('token');
  
  const { data, ...queryInfo } = useQuery({
    queryKey: eventKeys.list(),
    queryFn: () => fetchEventsData(searchQuery!)
  })
  return {
    ...queryInfo,
    data: useMemo(() => data?.map(item => ({
      // That's point! "="
      // 日本標準時
      start: item.start = moment(item.start).toDate(),
      end: item.end = moment(item.end).toDate(),
      // summary: item.summary = 'sheep',
      ...item
    })), [data])
  }
}

// const useAllQuery = <TData = TimelineEventProps[]>(
//   options?: Omit<
//     UseQueryOptions<TimelineEventProps[], AxiosError, TData, typeof eventKeys.all>,
//     "queryKey" | "queryFn"
//   >
// ) => {
//   return useQuery({queryKey: eventKeys.all, queryFn: fetchEventsData, ...options});
// };

type UtilOption<TData = TimelineEventProps[]> = {
  options?: Omit<
    UseQueryOptions<TimelineEventProps[], AxiosError, TData, [string, (Record<string, unknown> | string)?]>,
    "queryKey" | "queryFn"
  >
}

// export const useApi = <
//   TQueryKey extends [string, (Record<string, unknown> | string)?],
//   TQueryFnData,
//   TError,
//   TData = TQueryFnData,
// >(
//   queryKey: TQueryKey,
//   fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
//   options?: Omit<
//     UseQueryOptions<unknown, TError, TData, TQueryKey>,
//     'queryKey' | 'queryFn'
//   >,
// ) => {
//   // accessTokenを何らかの形で取得する
//   const { accessToken } = useAuthGuardContext();

//   return useQuery({
//     queryKey,
//     queryFn: async () => fetcher(queryKey[1], accessToken || ''),
//     ...options,
//   });
// };
