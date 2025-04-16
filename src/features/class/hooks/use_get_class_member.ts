import { useQuery } from '@tanstack/react-query';
import { GetClassMemberInput } from '../../../schema/types';
import getClassMember from '../network/get_class_member';

function useGetClassMember(input: GetClassMemberInput) {
    const query = useQuery({
        queryKey: ['classMember', input.classId, input.userId],
        queryFn: () => getClassMember(input),
    });

    return query;
}

export default useGetClassMember;
