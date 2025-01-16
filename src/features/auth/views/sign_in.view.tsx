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
import { IconEye } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import client from "../../../core/client";
import { firebaseAuth } from "../../../core/firebase";

type SignInInput = {
  email: string;
  password: string;
};

function SignInView() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordIcon = (
    <IconEye onClick={() => setShowPassword(!showPassword)} />
  );
  const form = useForm<SignInInput>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email."),
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
    mutationFn: async (values: SignInInput) => {
      const { email, password } = values;
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      const idToken = await firebaseAuth.currentUser?.getIdToken();

      if (!idToken) {
        throw new Error("Failed to sign in");
      }

      const result = await client.POST("/api/center/signIn", {
        body: { idToken },
      });

      if (result.error) {
        throw new Error(result.error.error);
      }

      return result.data.data;
    },
    onSuccess: (value) => {
      localStorage.setItem("token", value.token);
      notifications.show({
        message:
          "Sign in successfully. Great to have you back " + value.center.name,
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to sign in due to error: " + error.message,
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
            <Title order={3}>Don't have an account?</Title>
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <Title order={3} style={{ color: theme.primaryColor }}>
                Sign Up
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

              <Center>
                <Button type="submit" fullWidth loading={isPending}>
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
