import { useInfiniteQuery } from "@tanstack/react-query";
import getClassListByUser from "../network/get_class_list_by_user";

function useGetClassListByUser(userId: string, searchString: string) {
    const query = useInfiniteQuery({
        queryKey: ["classListByUser", userId, searchString],
        queryFn: (value) =>
            getClassListByUser({ userId, take: 20, cursor: value.pageParam }),
        getNextPageParam: (lastPage) => lastPage?.pageInfo.cursor,
        initialPageParam: "",
    });

    return query;

}

export default useGetClassListByUser;