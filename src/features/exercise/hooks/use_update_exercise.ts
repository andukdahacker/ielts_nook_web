import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import updateExercise from "../network/update_exercise";

function useUpdateExercise() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateExercise,
    onSuccess: () => {
      notifications.show({ message: "Updated exercise successfully" });
      queryClient.invalidateQueries({queryKey: ["exercise"]})
      navigate("/exercise");
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to update exercise due to " + error,
        color: "red",
      });
    },
  });

  return mutation;
}

export default useUpdateExercise;
