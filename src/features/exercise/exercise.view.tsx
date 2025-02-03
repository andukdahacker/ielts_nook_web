import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  Menu,
  Modal,
  Space,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconEdit,
  IconFilter,
  IconFolderRoot,
  IconPlus,
  IconReload,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import useDebounce from "../../core/hooks/use_debouce";
import { useMobile } from "../../core/utils/screen_utils";
import useGetExerciseList from "./hooks/use_get_exercise_list";

function ExerciseView() {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);
  const [opened, { close, open }] = useDisclosure(false);
  const isMobile = useMobile();

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
      <Box visibleFrom="sm">
        <Text size="md" fw={"bold"}>
          Exercises bank
        </Text>
        <Text size="xs">Manage your exercises and tests here.</Text>
      </Box>
      <Space h={"16"} />
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
          <Button leftSection={<IconPlus />} size="xs" onClick={open}>
            Add exercise
          </Button>
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
        <Table
          stickyHeader
          striped
          stickyHeaderOffset={65}
          withColumnBorders
          mt={"md"}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Format</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {data?.pages.map((page, index) => (
              <Fragment key={index}>
                {page?.nodes.map((e) => (
                  <Table.Tr key={e.exercise.id}>
                    <Table.Td>{e.exercise.name}</Table.Td>
                    <Table.Td>{e.subType.exerciseType}</Table.Td>
                    <Table.Td>{e.subType.name}</Table.Td>
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
                              navigate(`/exercise/${e.exercise.id}`);
                            }}
                          >
                            View
                          </Menu.Item>
                          <Menu.Item leftSection={<IconEdit size={14} />}>
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
      )}
      <Modal
        opened={opened}
        onClose={close}
        size={"sm"}
        title={"Create exercise"}
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered={true}
      >
        Create exercise
      </Modal>
    </>
  );
}

export default ExerciseView;
