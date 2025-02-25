import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import createExercise from "../network/create_exercise";

function useCreateExercise() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      notifications.show({ message: "Created exercise successfully" });
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
      navigate("/exercise");
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
