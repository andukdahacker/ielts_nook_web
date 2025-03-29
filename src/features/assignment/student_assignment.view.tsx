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
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconEye,
  IconFilter,
  IconFolderRoot,
  IconReload,
  IconSearch,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router";
import useDebounce from "../../core/hooks/use_debouce";
import AuthContext from "../auth/auth.context";
import useGetAssignmentsByUsers from "./hooks/use_get_assignments_by_user";

function StudentAssignmentView() {
  const { user } = useContext(AuthContext);
  const [searchString, setSearchString] = useState("");
  const debouncedString = useDebounce(searchString, 500);
  const navigate = useNavigate();

  const {
    data,
    status,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetAssignmentsByUsers(user?.id ?? "", debouncedString);

  return (
    <Stack>
      <Box p={"16px"}>
        <Flex direction={"row"} justify={"space-between"}>
          <Group visibleFrom="sm">
            <Text size="md" fw={"bold"}>
              All assignments
            </Text>
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
                  <Table.Th>Class</Table.Th>
                  <Table.Th>Deadline</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data?.pages.map((page, index) => (
                  <Fragment key={index}>
                    {page?.nodes.map((e) => (
                      <Table.Tr key={e.assignment.id}>
                        <Table.Td>{e.assignment.title}</Table.Td>
                        <Table.Td>{e.class.name}</Table.Td>
                        <Table.Td>
                          {e.assignment.dueDate
                            ? dayjs(e.assignment.dueDate as string).toString()
                            : "No deadline"}
                        </Table.Td>
                        <Table.Td>{e.assignment.status}</Table.Td>
                        <Table.Td>
                          <Menu shadow="md">
                            <Menu.Target>
                              <ActionIcon variant="transparent">
                                <IconDotsVertical />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              {e.assignment.status == "ASSIGNED" && (
                                <Menu.Item
                                  leftSection={<IconFolderRoot size={14} />}
                                  onClick={() => {
                                    navigate(
                                      `/assignment/${e.assignment.id}/do`,
                                    );
                                  }}
                                >
                                  Do assignment
                                </Menu.Item>
                              )}
                              {(e.assignment.status == "SUBMITTED" ||
                                e.assignment.status == "REVIEWED") && (
                                <Menu.Item
                                  leftSection={<IconEye size={14} />}
                                  onClick={() => {
                                    navigate(
                                      `/assignment/${e.assignment.id}/view`,
                                    );
                                  }}
                                >
                                  View
                                </Menu.Item>
                              )}
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
    </Stack>
  );
}

export default StudentAssignmentView;
