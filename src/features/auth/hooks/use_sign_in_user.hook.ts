import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import signInUser from "../network/signInUser";

function useSignInUser() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (value) => {
      localStorage.setItem("token", value.token);
      notifications.show({
        message:
          "Sign in successfully. Great to have you back " +
          value.user.firstName,
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to sign in due to error: " + error.message,
      });
    },
  });

  return mutation;
}

export default useSignInUser;
