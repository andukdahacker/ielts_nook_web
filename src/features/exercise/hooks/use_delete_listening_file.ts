import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import deleteListeningFile from "../network/delete_listening_file";

interface UseDeleteListeningFileProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

function useDeleteListeningFile(props?: UseDeleteListeningFileProps) {
  const mutation = useMutation({
    mutationFn: deleteListeningFile,
    onSuccess: () => {
      if(props?.onSuccess) {
        props.onSuccess();
      }
    },
    onError: (error) => {
      if(props?.onError) {
        props.onError(error);
      }
      notifications.show({ message: "Failed to remove listening file due to " + error.message });
    }
  });

  return mutation;
}

export default useDeleteListeningFile;
