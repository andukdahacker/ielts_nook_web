import { useInfiniteQuery } from "@tanstack/react-query";
import getUserList from "../network/get_user_list";

function useGetUserList(searchString: string) {
  const query = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async (value) => {
      return await getUserList(value.pageParam, searchString);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.pageInfo.cursor,
  });

  return query;
}

export default useGetUserList;
