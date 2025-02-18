import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import createExercise from "../network/create_exercise";

function useCreateExercise() {
  const mutation = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      notifications.show({ message: "Created exercise successfully" });
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to create new exercise due to error: " + error.message,
        color: "red",
      });
    },
  });

  return mutation;
}

export default useCreateExercise;
