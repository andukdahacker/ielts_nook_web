import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createClass from "../network/create_class";

function useCreateClass() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["centerClass"] });
      notifications.show({ message: "Created class successfully" });
    },
    onError: (error) => {
      notifications.show({
        message: "Failed to create class due to error: " + error.message,
      });
    },
  });

  return mutation;
}

export default useCreateClass;
