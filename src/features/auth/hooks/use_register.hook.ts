import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import register from "../network/register";

function useRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
      mutationFn: register,
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
        });
      },
    });

  return mutation;
}

export default useRegister;
