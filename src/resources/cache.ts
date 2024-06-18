import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

// ① Query Key
// queries.ts がある場合に必要に応じて宣言
export const eventKeys = {
  all: ["events"] as const,
  list: () => [...eventKeys.all, "list"] as const,
  groupList: (group?: number | string) => [...eventKeys.list(), group] as const,
  detail: (id: number | string) => [...eventKeys.all, "detail", id] as const,
  date: (id: number | string) => [...eventKeys.all, "date", id] as const,
  dateList: (ids: number[] | string[]) => ["listDate", ids] as const
  // dateList: (objs: PickDate[]) => ["listDate", objs] as const
};

export const authKeys = {
  auth: ["auth"] as const,
  search: (searchKey: string) => [...authKeys.auth, "search", {searchKey}] as const,
  verify: (token: string) => [...authKeys.auth, "inquiry", {token}] as const
}
// ② キャッシュ操作のためのカスタムフック
// mutations.ts がある場合に必要に応じて宣言
export function useEventCache() {
  const queryClient = useQueryClient();

  return useMemo(
    () => ({
      invalidateList: () => queryClient.invalidateQueries({queryKey: eventKeys.list()}),
      invalidGroupList: (group: number | string) =>
        queryClient.invalidateQueries({queryKey: eventKeys.groupList(group)}),
      invalidateDetail: (id: number | string) =>
        queryClient.invalidateQueries({queryKey: eventKeys.detail(id)}),
    }),
    [queryClient]
  );
}

export const useAuthCache = () => {
  const queryClient = useQueryClient();

  return useMemo(() => ({
    invalidateSearch: (searchKey: string) =>
      queryClient.invalidateQueries({queryKey: authKeys.search(searchKey)}),
    invalidateVerify: (token: string) =>
      queryClient.invalidateQueries({queryKey: authKeys.verify(token)})
  }), [queryClient]);
}
