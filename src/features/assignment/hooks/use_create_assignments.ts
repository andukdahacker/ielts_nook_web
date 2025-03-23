import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { CreateAssignmentsResponse } from "../../../schema/types";
import createAssignments from "../network/create_assignments";

interface UseCreateAssignmentsProps {
  onSuccess?: (data: CreateAssignmentsResponse) => void;
}

function useCreateAssignments(props?: UseCreateAssignmentsProps) {
  const mutation = useMutation({
    mutationFn: createAssignments,
    onSuccess: (data) => {
      notifications.show({ message: "Assigned successfully" });
      if (props?.onSuccess) {
        props.onSuccess(data);
      }
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to assign due to: " + error.message,
      });
    },
  });

  return mutation;
}

export default useCreateAssignments;
