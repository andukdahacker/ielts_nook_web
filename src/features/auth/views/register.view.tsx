import {
  Box,
  Button,
  Center,
  Flex,
  Space,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router";
import {
  validateEmail,
  validatePassword,
} from "../../../core/utils/validation_utils";
import useRegister from "../hooks/use_register.hook";

export type RegisterFormInput = {
  email: string;
  password: string;
  name: string;
};

function RegisterView() {
  const theme = useMantineTheme();
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordIcon = (
    <IconEye onClick={() => setShowPassword(!showPassword)} />
  );
  const form = useForm<RegisterFormInput>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: {
      email: validateEmail,
      name: (value) =>
        value.length > 3
          ? null
          : "Center name cannot be less than 3 characters.",
      password: validatePassword,
    },
  });

  const { mutate, isPending } = useRegister();

  return (
    <>
      <Center>
        <Flex direction={"column"}>
          <Center>
            <img src={"/src/assets/nook_logo_naked.png"} width={"200"} />
          </Center>
          <Title order={1}>Create Your Account</Title>
          <Space h={"md"} />
          <Flex direction={"row"} gap={2}>
            <Title order={3}>Have an account?</Title>
            <Link to={"/signIn"} style={{ textDecoration: "none" }}>
              <Title order={3} style={{ color: theme.primaryColor }}>
                Sign In
              </Title>
            </Link>
          </Flex>
          <Space h={"md"} />
          <Box maw={400}>
            <form onSubmit={form.onSubmit((values) => mutate(values))}>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />

              <Space h={"md"} />

              <TextInput
                withAsterisk
                label="Password"
                rightSection={showPasswordIcon}
                key={form.key("password")}
                {...form.getInputProps("password")}
                type={showPassword ? "text" : "password"}
              />

              <Space h={"md"} />

              <TextInput
                withAsterisk
                label="Center name"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />

              <Space h={"md"} />
              <Center>
                <Button type="submit" fullWidth loading={isPending}>
                  Sign Up
                </Button>
              </Center>
            </form>
          </Box>
        </Flex>
      </Center>
    </>
  );
}

export default RegisterView;
