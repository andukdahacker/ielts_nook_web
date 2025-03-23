import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import deleteWritingImage from "../network/delete_writing_image";

interface UseDeleteWritingImageProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

function useDeleteWritingImage(props?: UseDeleteWritingImageProps) {
  const mutation = useMutation({
    mutationFn: deleteWritingImage,
    onSuccess: () => {
      if (props?.onSuccess) {
        props.onSuccess();
      }
    },
    onError: (error) => {
      if (props?.onError) {
        props.onError(error);
      }
      notifications.show({
        message: "Failed to remove image file due to " + error.message,
      });
    },
  });

  return mutation;
}

export default useDeleteWritingImage;
