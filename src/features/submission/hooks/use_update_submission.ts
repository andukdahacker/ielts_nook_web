import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateSubmission from '../network/update_submission';

function useUpdateSubmission() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateSubmission,
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['assignment', data.assignment.id] });
            notifications.show({ message: 'Submission updated' });
        },
        onError: error => {
            notifications.show({ message: error.message });
        },
    });

    return mutation;
}

export default useUpdateSubmission;
