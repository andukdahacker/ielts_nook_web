import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "../../core/utils/validation_utils";
import { UserRole } from "../../schema/types";
import useCreateUser from "./hooks/use_create_user";

export type CreateUserFormInput = {
  email: string;
  password: string;
  role: UserRole;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

interface CreateUserViewProps {
  onCreateUserSuccess?: () => void;
  onCreateUserError?: () => void;
}

function CreateUserView(props: CreateUserViewProps) {
  const form = useForm<CreateUserFormInput>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      role: "STUDENT",
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const showPasswordIcon = (
    <IconEye onClick={() => setShowPassword(!showPassword)} />
  );

  const { mutate, isPending, isSuccess, isError } = useCreateUser();

  useEffect(() => {
    if (isSuccess && props.onCreateUserSuccess) {
      props.onCreateUserSuccess();
    }
  }, [isSuccess, props.onCreateUserSuccess, props]);

  useEffect(() => {
    if (isError && props.onCreateUserError) {
      props.onCreateUserError();
    }
  }, [isError, props.onCreateUserError, props]);

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
            label="Email"
            placeholder="user@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <TextInput
            withAsterisk
            label="Password"
            rightSection={showPasswordIcon}
            key={form.key("password")}
            {...form.getInputProps("password")}
            type={showPassword ? "text" : "password"}
          />

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
            Add
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default CreateUserView;
