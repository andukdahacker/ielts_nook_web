import { useInfiniteQuery } from "@tanstack/react-query";
import getAssignmentsByUser from "../network/get_assignments_by_user";

function useGetAssignmentsByUsers(userId: string, searchString: string) {
  const query = useInfiniteQuery({
    queryKey: ["assignment", searchString],
    queryFn: async (value) =>
      getAssignmentsByUser({
        take: 20,
        cursor: value.pageParam == "" ? undefined : value.pageParam,
        userId,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.pageInfo.cursor,
  });

  return query;
}

export default useGetAssignmentsByUsers;
