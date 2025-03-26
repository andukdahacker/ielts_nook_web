import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Submission } from "../../../schema/types";
import createSubmission from "../network/create_submission";

interface UseCreateSubmissionProps {
  onSuccess?: (data: Submission) => void;
}

function useCreateSubmission(props?: UseCreateSubmissionProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSubmission,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["assignment"] });
      if (props?.onSuccess) {
        props.onSuccess(data);
      }
      notifications.show({ message: "Submitted assignment successfully" });
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to submit due to: " + error.message,
      });
    },
  });

  return mutation;
}

export default useCreateSubmission;
