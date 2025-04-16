import { Center, Loader, Stack, Title } from '@mantine/core';
import { useParams } from 'react-router';
import useGetUser from './hooks/use_get_user';

function UserDetailView() {
    const { id } = useParams();
    const { data, status, error } = useGetUser(id ?? '');

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

    return (
        <Stack p={'md'}>
            <Title order={3}></Title>
        </Stack>
    );
}

export default UserDetailView;
