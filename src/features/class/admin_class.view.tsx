import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  Modal,
  Space,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconFilter,
  IconPlus,
  IconReload,
  IconSearch,
} from "@tabler/icons-react";
import { useCallback, useContext, useState } from "react";
import useDebounce from "../../core/hooks/use_debouce";
import { useMobile } from "../../core/utils/screen_utils";
import AuthContext from "../auth/auth.context";
import ClassRow from "./class_row.view";
import CreateClassModal from "./create_class.modal";
import useGetCenterClassList from "./hooks/use_get_center_class_list";

function AdminClassView() {
  const { centerId } = useContext(AuthContext);
  const isMobile = useMobile();

  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);

  const [opened, { close, open }] = useDisclosure(false);

  const handleCreateClassClick = () => {
    open();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = useGetCenterClassList(centerId!, debouncedSearchString);

  const allClasses = useCallback(() => {
    let classNum = 0;
    data?.pages.forEach((e) => {
      e?.nodes.forEach(() => {
        classNum++;
      });
    });

    return classNum;
  }, [data]);

  const classes = data?.pages
    .flat()
    .map((e) => e?.nodes)
    .flat();
  return (
    <>
      <Stack>
        <Box visibleFrom="sm">
          <Text size="md" fw={"bold"}>
            Class management
          </Text>
          <Text size="xs">Manage your center classes here.</Text>
        </Box>
        <Space h={"16"} />
        <Flex direction={"row"} justify={"space-between"}>
          <Group visibleFrom="sm">
            <Text size="md" fw={"bold"}>
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
              onChange={(event) => setSearchString(event.currentTarget.value)}
            />
            <ActionIcon>
              <IconFilter />
            </ActionIcon>
            <Button
              leftSection={<IconPlus />}
              size="xs"
              onClick={handleCreateClassClick}
            >
              Create class
            </Button>
          </Group>
        </Flex>

        {status == "pending" ? (
          <Center>
            <Loader />
          </Center>
        ) : status == "error" ? (
          <Center>
            <Text>{error.message}</Text>
          </Center>
        ) : (
          <Table.ScrollContainer minWidth={500}>
            <Table stickyHeader>
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
                {classes?.map((e) => {
                  const klass = e?.class;
                  const students = e?.members.filter(
                    (member) => member.role == "STUDENT",
                  );
                  const teachers = e?.members.filter(
                    (member) => member.role == "TEACHER",
                  );

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
                    {hasNextPage ? "Load more" : "End of list"}
                  </Button>
                </Center>
              </Table.Caption>
            </Table>
          </Table.ScrollContainer>
        )}
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        title="Create class"
        fullScreen={isMobile}
        centered={true}
      >
        <CreateClassModal onCreateClassSuccess={() => close()} />
      </Modal>
    </>
  );
}

export default AdminClassView;
