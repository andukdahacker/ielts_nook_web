import { useParams } from 'react-router';
import useGetClass from './hooks/use_get_class';
import { Center, Loader, Stack, Title, Text, Box, Table, Menu, ActionIcon } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';

function TeacherClassDetailView() {
    const { id } = useParams();
    const { data, status, error } = useGetClass(id as string);

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
            <Stack>
                <Title order={2}>Class: {data.class.name}</Title>
                {data.class.description && <Text>{data.class.description}</Text>}
            </Stack>

            <Stack>
                <Title order={3}>Class members</Title>
                <Table stickyHeader withColumnBorders withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Username</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Assignments</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {data.classMembers.map(member => {
                            const submittedAssignments = member.assignments.filter(
                                assignment => assignment.assignment.status == 'SUBMITTED',
                            );
                            return (
                                <Table.Tr key={member.user.id}>
                                    <Table.Td>
                                        {member.user.firstName} {member.user.lastName}
                                    </Table.Td>
                                    <Table.Td>{member.user.email}</Table.Td>
                                    <Table.Td>{submittedAssignments.length} new submission</Table.Td>
                                    <Table.Td>
                                        <Menu shadow="md">
                                            <Menu.Target>
                                                <ActionIcon variant="transparent">
                                                    <IconDotsVertical />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item>View</Menu.Item>
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
    );
}

export default TeacherClassDetailView;
