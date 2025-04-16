import { useQuery } from '@tanstack/react-query';
import getUser from '../network/get_user';

function useGetUser(id: string) {
    const query = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
    });

    return query;
}

export default useGetUser;
