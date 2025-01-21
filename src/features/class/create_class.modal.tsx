import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useContext } from "react";
import { User } from "../../schema/types";
import AuthContext from "../auth/auth.context";

export type CreateClassFormInput = {
  name: string;
  description?: string;
  classMembers: User[];
  centerId: string;
};

function CreateClassModal({ id, context }: ContextModalProps) {
  const { centerId } = useContext(AuthContext);

  const form = useForm<CreateClassFormInput>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      classMembers: [],
      centerId: centerId!,
    },
  });

  const classMemberFields = form.getValues().classMembers.map((user, index) => (
    <Badge
      key={user.id}
      mt={"xs"}
      rightSection={
        <ActionIcon
          color="red"
          onClick={() => form.removeListItem("classMembers", index)}
        >
          <IconTrash size={16} />
        </ActionIcon>
      }
    />
  ));

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log(values);
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
          <Button size="compact-sm">Add member</Button>
        </Group>
        {classMemberFields}
      </Stack>
    </form>
  );
}

export default CreateClassModal;
