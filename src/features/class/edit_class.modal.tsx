import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useEffect } from "react";
import { useMobile } from "../../core/utils/screen_utils";
import { Class, User } from "../../schema/types";
import AddClassMemberModal from "./add_class_member.modal";
import useUpdateClass from "./hooks/use_update_class";

export type UpdateClassFormInput = {
  classId: string;
  name?: string;
  description?: string;
  classMembers: User[];
};

interface EditClassModalProps {
  klass: Class;
  members: User[];
  onUpdateSuccess: () => void;
}

function EditClassModal({
  klass,
  members,
  onUpdateSuccess,
}: EditClassModalProps) {
  const form = useForm<UpdateClassFormInput>({
    mode: "uncontrolled",
    initialValues: {
      classId: klass.id,
      name: klass.name,
      description: klass.description ?? undefined,
      classMembers: [...members],
    },
  });

  const [opened, { close, open }] = useDisclosure(false);

  const isMobile = useMobile();

  const { mutate, isPending, isSuccess } = useUpdateClass();

  const handleSubmit = (input: UpdateClassFormInput) => {
    const existingSet = new Set(members);
    const newSet = new Set(input.classMembers);

    const toAdd = input.classMembers.filter(
      (member) => !existingSet.has(member),
    );

    const toRemove = members.filter((member) => !newSet.has(member));

    mutate({
      classId: input.classId,
      description: input.description,
      name: input.name,
      addMembers: toAdd.map((e) => e.id),
      removeMembers: toRemove.map((e) => e.id),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onUpdateSuccess();
    }
  }, [isSuccess, onUpdateSuccess]);

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Class name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Description"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />

          <Group mt="md">
            <Text size="sm">Class members</Text>
            <Button size="compact-sm" onClick={() => open()}>
              Add member
            </Button>
          </Group>
          <ScrollArea h={300}>
            {form.getValues().classMembers.map((user, index) => (
              <Group key={user.id} mt={"xs"}>
                <Text>
                  {index + 1}. {user.firstName} {user.lastName}
                </Text>
                <Badge
                  color={
                    user.role == "TEACHER"
                      ? "orange"
                      : user.role == "ADMIN"
                        ? "red"
                        : "blue"
                  }
                >
                  {user.role}
                </Badge>
                <ActionIcon
                  color="red"
                  onClick={() => form.removeListItem("classMembers", index)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ))}
          </ScrollArea>

          <Button
            type="submit"
            loading={isPending}
            disabled={isPending}
            mt="sm"
          >
            Update
          </Button>
        </Stack>
      </form>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        centered={true}
        title="Add class members"
      >
        <AddClassMemberModal
          addedMembers={form.getValues().classMembers}
          onDone={(users) => {
            form.setFieldValue("classMembers", users);
            close();
          }}
        />
      </Modal>
    </>
  );
}

export default EditClassModal;
