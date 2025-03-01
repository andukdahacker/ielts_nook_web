import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateExerciseResponse } from "../../../schema/types";
import createExercise from "../network/create_exercise";

interface UseCreateExerciseProps {
  onSuccess?: (data: CreateExerciseResponse["data"]) => void;
  onError?: (e: Error) => void;
}

function useCreateExercise(props?: UseCreateExerciseProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createExercise,
    onSuccess: (data) => {
      notifications.show({ message: "Created exercise successfully" });
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
      if (props?.onSuccess) {
        props.onSuccess(data);
      }
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to create new exercise due to error: " + error.message,
        color: "red",
      });

      if (props?.onError) {
        props.onError(error);
      }
    },
  });

  return mutation;
}

export default useCreateExercise;
