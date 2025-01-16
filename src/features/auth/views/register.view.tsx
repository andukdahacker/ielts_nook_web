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
import { notifications } from "@mantine/notifications";
import { IconEye, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import client from "../../../core/client";
import { firebaseAuth } from "../../../core/firebase";

type RegisterFormInput = {
  email: string;
  password: string;
  name: string;
};

function RegisterView() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email."),
      name: (value) =>
        value.length > 3
          ? null
          : "Center name cannot be less than 3 characters.",
      password: (value) => {
        if (value == "") {
          return "Please enter your password.";
        }

        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]).*$/.test(
            value,
          )
        ) {
          return null;
        }

        return "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.";
      },
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterFormInput) => {
      const userCredentials = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password,
      );

      const result = await client.POST("/api/center/register", {
        body: { email: values.email, name: values.name },
      });

      if (result.error) {
        throw new Error(result.error.error);
      }

      return {
        center: result.data.data,
        shouldVerifyEmail: !userCredentials.user.emailVerified,
      };
    },
    onSuccess: (value) => {
      navigate("/signIn");
      notifications.show({
        title: "Registered successfully",
        message: value.shouldVerifyEmail
          ? "We've sent a email verification request to your email address. Please verify before continuing to sign in."
          : "Please continue to sign in.",
        autoClose: 10000,
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Failed to register",
        message: `Failed to register due to error: ${error.message}`,
        color: "red",
        icon: <IconX />,
      });
    },
  });

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
