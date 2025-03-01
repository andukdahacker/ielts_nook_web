import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Group,
    Loader,
    Menu,
    Modal,
    ScrollArea,
    Table,
    Text,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals, openContextModal } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
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
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import useDebounce from "../../core/hooks/use_debouce";
import { useMobile } from "../../core/utils/screen_utils";
import { User } from "../../schema/types";
import CreateUserView from "./create_user.view";
import useDeleteUser from "./hooks/use_delete_user";
import useGetUserList from "./hooks/user_get_user_list";

function UsersView() {
  const [
    addUserModalOpened,
    { open: openAddUserModal, close: closeAddUserModal },
  ] = useDisclosure();
  const isMobile = useMobile();
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);

  const handleAddUserClick = () => {
    openAddUserModal();
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
  } = useGetUserList(debouncedSearchString);

  const handleReloadClick = () => refetch();

  const handleOnEditClick = async (user: User) => {
    openContextModal({
      modal: "editUser",
      title: "Edit User",
      innerProps: {
        user,
      },
      fullScreen: isMobile,
      centered: true,
      transitionProps: { transition: "fade", duration: 200 },
      size: "sm",
    });
  };

  const { mutateAsync } = useDeleteUser();

  const handleOnDeleteClick = (user: User) => {
    modals.openConfirmModal({
      title: "Delete user",
      centered: true,
      children: (
        <Text>Are you sure you want to delete this user permanently?</Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: async () => {
        const id = notifications.show({
          message: "Deleting user...",
          autoClose: false,
        });

        try {
          await mutateAsync(user.id);
        } finally {
          notifications.hide(id);
        }
      },
    });
  };

  const allUsers = useCallback(() => {
    let userNum = 0;

    data?.pages.forEach((e) => {
      e?.nodes.forEach(() => {
        userNum++;
      });
    });

    return userNum;
  }, [data]);

  useEffect(() => {
    refetch();
  }, [debouncedSearchString, refetch]);

  const navigate = useNavigate();

  return (
    <>
      <Box p={"16px"}>
        <Flex direction={"row"} justify={"space-between"} h={"48px"}>
          <Group visibleFrom="sm">
            <Text size="md" fw={"bold"}>
              All users
            </Text>
            <Text c="gray.5">{allUsers()}</Text>
          </Group>
          <Group>
            <ActionIcon onClick={handleReloadClick} loading={isRefetching}>
              <IconReload />
            </ActionIcon>
            <TextInput
              leftSection={<IconSearch />}
              placeholder="user's name"
              value={searchString}
              onChange={(value) => {
                setSearchString(value.currentTarget.value);
              }}
            />
            <ActionIcon>
              <IconFilter />
            </ActionIcon>
            <Button
              leftSection={<IconPlus />}
              size="xs"
              onClick={handleAddUserClick}
            >
              Add user
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
          <ScrollArea h={"calc(100vh - 48px - 32px - 65px)"}>
            <Table stickyHeader striped withColumnBorders withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Username</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Classes</Table.Th>
                  <Table.Th>Phone number</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data?.pages.map((page, index) => (
                  <Fragment key={index}>
                    {page?.nodes.map((e) => {
                      const classes = e.classes.map((c) => {
                        if (c.description)
                          return (
                            <Tooltip key={c.id} label={c.description}>
                              <Badge>{c.name}</Badge>
                            </Tooltip>
                          );

                        return <Badge key={c.id}>{c.name}</Badge>;
                      });
                      return (
                        <Table.Tr key={e.user.id}>
                          <Table.Td>
                            {e.user.firstName} {e.user.lastName}
                          </Table.Td>
                          <Table.Td>{e.user.email}</Table.Td>
                          <Table.Td>{e.user.role}</Table.Td>
                          <Table.Td>
                            <Group>{classes}</Group>
                          </Table.Td>
                          <Table.Td>{e.user.phoneNumber}</Table.Td>
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
                                    navigate(`/users/${e.user.id}`);
                                  }}
                                >
                                  View
                                </Menu.Item>
                                <Menu.Item
                                  leftSection={<IconEdit size={14} />}
                                  onClick={() => handleOnEditClick(e.user)}
                                >
                                  Edit
                                </Menu.Item>
                                <Menu.Item
                                  leftSection={<IconTrash size={14} />}
                                  color="red"
                                  onClick={() => handleOnDeleteClick(e.user)}
                                >
                                  Delete
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
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
      <Modal
        opened={addUserModalOpened}
        onClose={closeAddUserModal}
        size={"sm"}
        title={"Add new user"}
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered={true}
      >
        <CreateUserView
          onCreateUserSuccess={() => {
            closeAddUserModal();
          }}
        />
      </Modal>
    </>
  );
}

export default UsersView;
