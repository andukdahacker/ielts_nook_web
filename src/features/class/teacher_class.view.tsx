import {
    ActionIcon,
    Box,
    Button,
    Center,
    Flex,
    Group,
    Loader,
    ScrollArea,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import { IconFilter, IconReload, IconSearch } from '@tabler/icons-react';
import { useCallback, useContext, useState } from 'react';
import useDebounce from '../../core/hooks/use_debouce';
import AuthContext from '../auth/auth.context';
import ClassRow from './class_row.view';
import useGetClassListByUser from './hooks/use_get_class_list_by_user';

function TeacherClassView() {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <>Forbidden</>;
    }

    const [searchString, setSearchString] = useState('');
    const debouncedSearchString = useDebounce(searchString, 500);
    const { data, status, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } =
        useGetClassListByUser(user?.id ?? '', debouncedSearchString);

    const allClasses = useCallback(() => {
        let classNum = 0;
        data?.pages.forEach(e => {
            e?.nodes.forEach(() => {
                classNum++;
            });
        });

        return classNum;
    }, [data]);

    const classes = data?.pages
        .flat()
        .map(e => e?.nodes)
        .flat();
    return (
        <>
            <Box p={'16px'}>
                <Flex direction={'row'} justify={'space-between'} h={'48px'}>
                    <Group visibleFrom="sm">
                        <Text size="md" fw={'bold'}>
                            All classes
                        </Text>
                        <Text c="gray.5">{allClasses()}</Text>
                    </Group>
                    <Group>
                        <ActionIcon onClick={() => refetch()} loading={isRefetching}>
                            <IconReload />
                        </ActionIcon>
                        <TextInput
                            leftSection={<IconSearch />}
                            placeholder="class name"
                            value={searchString}
                            onChange={event => setSearchString(event.currentTarget.value)}
                        />
                        <ActionIcon>
                            <IconFilter />
                        </ActionIcon>
                    </Group>
                </Flex>

                {status == 'pending' ? (
                    <Center>
                        <Loader />
                    </Center>
                ) : status == 'error' ? (
                    <Center>
                        <Text>{error.message}</Text>
                    </Center>
                ) : (
                    <ScrollArea h={'calc(100vh - 48px - 32px - 65px)'}>
                        <Table stickyHeader withColumnBorders withTableBorder>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Class name</Table.Th>
                                    <Table.Th>Description</Table.Th>
                                    <Table.Th>No. of students</Table.Th>
                                    <Table.Th>Teachers</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody>
                                {classes?.map(e => {
                                    const klass = e?.class;
                                    const students = e?.members.filter(member => member.role == 'STUDENT');
                                    const teachers = e?.members.filter(member => member.role == 'TEACHER');

                                    return (
                                        <ClassRow
                                            key={klass?.id}
                                            klass={klass!}
                                            students={students!}
                                            teachers={teachers!}
                                        />
                                    );
                                })}
                            </Table.Tbody>
                            <Table.Caption>
                                <Center>
                                    <Button
                                        disabled={!hasNextPage}
                                        loading={isFetchingNextPage}
                                        onClick={() => fetchNextPage()}
                                    >
                                        {hasNextPage ? 'Load more' : 'End of list'}
                                    </Button>
                                </Center>
                            </Table.Caption>
                        </Table>
                    </ScrollArea>
                )}
            </Box>
        </>
    );
}

export default TeacherClassView;
