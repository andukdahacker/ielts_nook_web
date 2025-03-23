import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { Exercise } from "../../../schema/types";
import uploadWritingFile from "../network/upload_writing_file";

interface UseUploadWritingImageProps {
  onSuccess?: (data: Exercise) => void;
  onError?: (error: Error) => void;
}

function useUploadWritingImage(props?: UseUploadWritingImageProps) {
  const mutation = useMutation({
    mutationFn: uploadWritingFile,
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

export default useUploadWritingImage;
