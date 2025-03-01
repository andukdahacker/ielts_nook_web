import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { Exercise } from "../../../schema/types";
import uploadListeningFile from "../network/upload_listening_file";

interface UseUploadListeningFileProps {
  onSuccess?: (data: Exercise) => void;
  onError?: (error: Error) => void;
}

function useUploadListeningFile(props?: UseUploadListeningFileProps) {
  const mutation = useMutation({
    mutationFn: uploadListeningFile,
    onSuccess: (data) => {
      if (props?.onSuccess) {
        props.onSuccess(data);
      }

      notifications.show({ message: "Uploaded listening file successfully" });
    },
    onError: (error) => {
      if (props?.onError) {
        props.onError(error);
      }

      notifications.show({
        message: "Failed to upload listening file due to " + error.message,
      });
    },
  });

  return mutation;
}

export default useUploadListeningFile;
