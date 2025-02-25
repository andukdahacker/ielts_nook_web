import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  Menu,
  ScrollArea,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconBook,
  IconDotsVertical,
  IconEar,
  IconEdit,
  IconFilter,
  IconFolderRoot,
  IconMessage,
  IconPlus,
  IconReload,
  IconSearch,
  IconTrash,
  IconWriting,
} from "@tabler/icons-react";
import { Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import useDebounce from "../../core/hooks/use_debouce";
import useGetExerciseList from "./hooks/use_get_exercise_list";

function ExerciseView() {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);

  const {
    data,
    status,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetExerciseList(debouncedSearchString);

  const allExercises = useCallback(() => {
    let exercisesNum = 0;

    data?.pages.forEach((e) => {
      e?.nodes.forEach(() => {
        exercisesNum++;
      });
    });

    return exercisesNum;
  }, [data]);

  const navigate = useNavigate();

  return (
    <>
      <Box p={"16px"}>
        <Flex direction={"row"} justify={"space-between"}>
          <Group visibleFrom="sm">
            <Text size="md" fw={"bold"}>
              All exercises
            </Text>
            <Text c="gray.5">{allExercises()}</Text>
          </Group>
          <Group>
            <ActionIcon
              onClick={() => {
                refetch();
              }}
              loading={isRefetching}
            >
              <IconReload />
            </ActionIcon>
            <TextInput
              leftSection={<IconSearch />}
              placeholder="exercises name"
              value={searchString}
              onChange={(value) => {
                setSearchString(value.currentTarget.value);
              }}
            />
            <ActionIcon>
              <IconFilter />
            </ActionIcon>
            <Menu trigger="hover">
              <Menu.Target>
                <Button
                  leftSection={<IconPlus />}
                  size="xs"
                  onClick={() => {
                    navigate("/exercise/composer");
                  }}
                >
                  Add exercise
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconBook />}
                  onClick={() => {
                    navigate(`/exercise/composer?type=reading`);
                  }}
                >
                  Reading
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconEar />}
                  onClick={() => {
                    navigate(`/exercise/composer?type=listening`);
                  }}
                >
                  Listening
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconWriting />}
                  onClick={() => {
                    navigate(`/exercise/composer?type=writing`);
                  }}
                >
                  Writing
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconMessage />}
                  onClick={() => {
                    navigate(`/exercise/composer?type=speaking`);
                  }}
                >
                  Speaking
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>

        {status == "pending" ? (
          <Center>
            <Loader />
          </Center>
        ) : status == "error" ? (
          <Center>
            <Text>Something went wrong: {error.message}</Text>
          </Center>
        ) : (
          <ScrollArea h={"calc(100vh - 48px - 32px - 65px)"}>
            <Table stickyHeader striped withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data?.pages.map((page, index) => (
                  <Fragment key={index}>
                    {page?.nodes.map((e) => (
                      <Table.Tr key={e.id}>
                        <Table.Td>{e.name}</Table.Td>
                        <Table.Td>{e.type}</Table.Td>
                        <Table.Td>
                          <Menu shadow="md" width={120}>
                            <Menu.Target>
                              <ActionIcon variant="transparent">
                                <IconDotsVertical />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                leftSection={<IconFolderRoot size={14} />}
                                onClick={() => {
                                  navigate(`/exercise/${e.id}`);
                                }}
                              >
                                View
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<IconEdit size={14} />}
                                onClick={() => {
                                  navigate(`/exercise/${e.id}/edit`);
                                }}
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<IconTrash size={14} />}
                                color="red"
                              >
                                Delete
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Fragment>
                ))}
              </Table.Tbody>
              <Table.Caption>
                <Center>
                  <Button
                    disabled={!hasNextPage}
                    loading={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  >
                    {hasNextPage ? "Load more" : "End of list"}
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

export default ExerciseView;
