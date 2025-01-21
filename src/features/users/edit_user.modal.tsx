import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useEffect } from "react";
import { User, UserRole } from "../../schema/types";
import useUpdateUser from "./hooks/use_update_user";

export type EditUserFormInput = {
  role?: UserRole;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

function EditUserModal({
  id,
  context,
  innerProps,
}: ContextModalProps<{ user: User }>) {
  const { user } = innerProps;

  const form = useForm<EditUserFormInput>({
    mode: "uncontrolled",
    initialValues: {
      role: user.role,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      phoneNumber: user.phoneNumber ?? undefined,
    },
  });

  const { mutate, isPending, isSuccess } = useUpdateUser(user.id);

  useEffect(() => {
    if (isSuccess) {
      context.closeContextModal(id);
    }
  }, [isSuccess, context, id]);

  return (
    <form onSubmit={form.onSubmit((values) => mutate(values))}>
      <Stack>
        <TextInput
          label="First name"
          key={form.key("firstName")}
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label="Last name"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />

        <Select
          label="Role"
          withAsterisk
          key={form.key("role")}
          {...form.getInputProps("role")}
          data={[
            {
              value: "ADMIN",
              label: "Admin",
            },
            {
              value: "TEACHER",
              label: "Teacher",
            },
            {
              value: "STUDENT",
              label: "Student",
            },
          ]}
        />

        <TextInput
          label="Phone number"
          key={form.key("phoneNumber")}
          type="number"
          {...form.getInputProps("phoneNumber")}
        />

        <Button type="submit" loading={isPending}>
          Edit
        </Button>
      </Stack>
    </form>
  );
}

export default EditUserModal;
