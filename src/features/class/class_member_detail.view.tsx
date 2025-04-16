import { Center, Loader } from '@mantine/core';
import { useParams } from 'react-router';
import useGetClassMember from './hooks/use_get_class_member';

function ClassMemberDetailView() {
    const { classId, userId } = useParams();

    const { data, status, error } = useGetClassMember({ classId: classId ?? '', userId: userId ?? '' });

    if (status == 'pending') {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    if (status == 'error') {
        return <Center>{error.message}</Center>;
    }

    return <>{data.user.firstName}</>;
}

export default ClassMemberDetailView;
