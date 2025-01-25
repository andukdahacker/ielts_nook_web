import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { useMobile } from "../../core/utils/screen_utils";
import { User } from "../../schema/types";
import AuthContext from "../auth/auth.context";
import AddClassMemberModal from "./add_class_member.modal";
import useCreateClass from "./hooks/use_create_class";

export type CreateClassFormInput = {
  name: string;
  description?: string;
  classMembers: User[];
  centerId: string;
};

interface CreateClassModalProps {
  onCreateClassSuccess: () => void;
}

function CreateClassModal({ onCreateClassSuccess }: CreateClassModalProps) {
  const { centerId } = useContext(AuthContext);

  const [opened, { close, open }] = useDisclosure(false);

  const isMobile = useMobile();

  const form = useForm<CreateClassFormInput>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      classMembers: [],
      centerId: centerId!,
    },
  });

  const handleAddMemberClick = () => {
    open();
  };

  const { mutate, isPending, isSuccess } = useCreateClass();

  useEffect(() => {
    if (isSuccess && onCreateClassSuccess) {
      onCreateClassSuccess();
    }
  }, [isSuccess, onCreateClassSuccess]);

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          mutate(values);
        })}
      >
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
            <Button size="compact-sm" onClick={handleAddMemberClick}>
              Add member
            </Button>
          </Group>
          {form.getValues().classMembers.map((user, index) => (
            <Group key={user.id}>
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

          <Button type="submit" loading={isPending} disabled={isPending}>
            Create
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

export default CreateClassModal;
