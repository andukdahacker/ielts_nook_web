import { useInfiniteQuery } from "@tanstack/react-query";
import getCenterClassList from "../network/get_center_class";

function useGetCenterClassList(centerId: string) {
  const query = useInfiniteQuery({
    queryKey: ["centerClass"],
    queryFn: async (value) => {
      return getCenterClassList({
        take: 20,
        cursor: value.pageParam == "" ? undefined : value.pageParam,
        centerId,
      });
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.pageInfo.cursor,
  });

  return query;
}

export default useGetCenterClassList;
