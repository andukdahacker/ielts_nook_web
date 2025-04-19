import {
    ActionIcon,
    Center,
    Divider,
    Flex,
    Loader,
    Menu,
    MenuTarget,
    Paper,
    Stack,
    Table,
    Text,
    Title,
} from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router';
import useGetClassMember from './hooks/use_get_class_member';

function ClassMemberDetailView() {
    const { classId, userId } = useParams();

    const { data, status, error } = useGetClassMember({ classId: classId ?? '', userId: userId ?? '' });

    const navigate = useNavigate();

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
        <>
            <Stack p={'md'}>
                <Paper withBorder radius={'md'} shadow="md">
                    <Stack p={'md'}>
                        <Flex direction={'row'} justify={'space-between'} align={'center'}>
                            <Title order={3}>
                                {data.user.firstName} {data.user.lastName}
                            </Title>

                            <ActionIcon variant="outline">
                                <IconDotsVertical />
                            </ActionIcon>
                        </Flex>
                        <Flex direction={'row'} gap={'lg'} align={'start'}>
                            <Flex direction={'column'} justify="center" align={'center'} gap={'md'}>
                                <Text>Email</Text>
                                <Text>{data.user.email}</Text>
                            </Flex>
                            <Divider orientation="vertical" />
                            <Flex direction={'column'} justify={'center'} align={'center'} gap={'md'}>
                                <Text>Phone number</Text>
                                <Text>{data.user.phoneNumber}</Text>
                            </Flex>
                        </Flex>
                    </Stack>
                </Paper>

                <Stack>
                    <Title order={3}>Assignments</Title>
                    <Table stickyHeader stickyHeaderOffset={65} withColumnBorders withRowBorders withTableBorder>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>Excercise name</Table.Th>
                                <Table.Th>Type</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data.assignments.map(e => {
                                return (
                                    <Table.Tr key={e.assignment.id}>
                                        <Table.Td>{e.assignment.title}</Table.Td>
                                        <Table.Td>{e.exercise.name}</Table.Td>
                                        <Table.Td>{e.exercise.type}</Table.Td>
                                        <Table.Td>{e.assignment.status}</Table.Td>
                                        <Table.Td>
                                            <Menu>
                                                <MenuTarget>
                                                    <ActionIcon variant="transparent">
                                                        <IconDotsVertical />
                                                    </ActionIcon>
                                                </MenuTarget>

                                                <Menu.Dropdown>
                                                    {e.submission && (
                                                        <Menu.Item
                                                            onClick={() => {
                                                                navigate(`/assignment/${e.assignment.id}/review`);
                                                            }}
                                                        >
                                                            Review
                                                        </Menu.Item>
                                                    )}
                                                </Menu.Dropdown>
                                            </Menu>
                                        </Table.Td>
                                    </Table.Tr>
                                );
                            })}
                        </Table.Tbody>
                    </Table>
                </Stack>
            </Stack>
        </>
    );
}

export default ClassMemberDetailView;
