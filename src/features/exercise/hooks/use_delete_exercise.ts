import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import deleteExercise from "../network/delete_exercise";

function useDeleteExercise() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => {
      notifications.show({ message: "Deleted exercise successfully" });
      queryClient.invalidateQueries({ queryKey: ["exerciseList"] });
      navigate("/exercise");
    },
    onError: (error) => {
      notifications.show({ message: "Failed to delete exercise due to: " + error.message });
    }
  });

  return mutation;
}

export default useDeleteExercise;
