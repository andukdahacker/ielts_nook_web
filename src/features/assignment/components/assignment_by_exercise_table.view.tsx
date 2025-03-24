import { ActionIcon, Menu, Stack, Table, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { GetAssignmentsByExerciseResponse } from "../../../schema/types";
import useDeleteAssignment from "../hooks/use_delete_assignment";

interface AssignmentByExerciseProps {
  data: GetAssignmentsByExerciseResponse["data"];
}

function AssignmentsByExerciseTable({ data }: AssignmentByExerciseProps) {
  const { mutateAsync } = useDeleteAssignment();
  const handleDelete = async (id: string) => {
    const idNotif = notifications.show({
      message: "Deleting assignment...",
      autoClose: false,
    });

    try {
      await mutateAsync(id);
    } finally {
      notifications.hide(idNotif);
    }
  };

  return (
    <Stack>
      <Title order={3}>Assigned to</Title>
      <Table.ScrollContainer h={500} minWidth={500}>
        <Table striped withTableBorder stickyHeader>
          <Table.Thead>
            <Table.Th>Username</Table.Th>
            <Table.Th>Class</Table.Th>
            <Table.Th>Deadline</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th></Table.Th>
          </Table.Thead>
          <Table.Tbody>
            {data.assignments.map((e) => {
              return (
                <Table.Tr key={e.assignment.id}>
                  <Table.Td>
                    {e.user.firstName} {e.user.lastName}
                  </Table.Td>
                  <Table.Td>{e.class.name}</Table.Td>
                  <Table.Td>
                    {e.assignment.dueDate
                      ? dayjs(e.assignment.dueDate as string).toString()
                      : "No deadline"}
                  </Table.Td>
                  <Table.Td>{e.assignment.status}</Table.Td>
                  <Table.Td>
                    <Menu shadow="md" width={120}>
                      <Menu.Target>
                        <ActionIcon variant="transparent">
                          <IconDotsVertical />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {e.assignment.status == "SUBMITTED" && (
                          <Menu.Item>Review</Menu.Item>
                        )}
                        <Menu.Item
                          leftSection={<IconTrash size={14} />}
                          color="red"
                          onClick={() => {
                            handleDelete(e.assignment.id);
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}

export default AssignmentsByExerciseTable;
