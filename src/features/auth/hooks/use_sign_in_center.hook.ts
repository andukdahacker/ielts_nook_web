import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router";
import signInCenter from "../network/signInCenter";

function useSignInCenter() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signInCenter,
    onSuccess: (value) => {
      localStorage.setItem("token", value.token);
      notifications.show({
        message:
          "Sign in successfully. Great to have you back " + value.center.name,
      });
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof FirebaseError) {
        notifications.show({
          message: "Failed to sign in due to error: " + error.code,
        });
      } else {
        notifications.show({
          message: "Failed to sign in due to error: " + error.message,
        });
      }
    },
  });

  return mutation;
}

export default useSignInCenter;
