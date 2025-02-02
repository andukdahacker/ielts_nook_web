import {
  Box,
  Button,
  Center,
  Checkbox,
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
import useSignInCenter from "../hooks/use_sign_in_center.hook";
import useSignInUser from "../hooks/use_sign_in_user.hook";

export type SignInFormInput = {
  email: string;
  password: string;
};

function SignInView() {
  const theme = useMantineTheme();
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordIcon = (
    <IconEye onClick={() => setShowPassword(!showPassword)} />
  );

  const [signInAsCenter, setSignInAsCenter] = useState(false);

  const form = useForm<SignInFormInput>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
    },
  });

  const { mutate: signInCenter, isPending: signInCenterIsPending } =
    useSignInCenter();

  const { mutate: signInUser, isPending: signInUserIsPending } =
    useSignInUser();

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
            <Title order={3}>Don't have an account?</Title>
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <Title order={3} style={{ color: theme.primaryColor }}>
                Sign Up
              </Title>
            </Link>
          </Flex>
          <Space h={"md"} />
          <Box maw={400}>
            <form
              onSubmit={form.onSubmit((values) => {
                if (signInAsCenter) {
                  signInCenter(values);
                } else {
                  signInUser(values);
                }
              })}
            >
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

              <Checkbox
                label="Sign in as center"
                checked={signInAsCenter}
                onChange={(event) =>
                  setSignInAsCenter(event.currentTarget.checked)
                }
              />

              <Space h={"md"} />

              <Center>
                <Button
                  type="submit"
                  fullWidth
                  loading={signInCenterIsPending || signInUserIsPending}
                >
                  Sign In
                </Button>
              </Center>
            </form>
          </Box>
        </Flex>
      </Center>
    </>
  );
}

export default SignInView;
