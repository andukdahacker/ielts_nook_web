import { Center, Loader } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import ViewListentingAssignment from './components/view_listening_assignment.view';
import useGetAssignment from './hooks/use_get_assignment';

function ViewAssignmentView() {
    const { id } = useParams();

    const { data, status, error } = useGetAssignment(id as string);

    const navigate = useNavigate();

    useEffect(() => {
        if (!data) return;
        if (data.assignment.status == 'ASSIGNED') {
            navigate(`/assignment/${data.assignment.id}/do`);
        }
    }, [data, navigate]);

    if (status == 'pending')
        return (
            <Center>
                <Loader />
            </Center>
        );
    if (status == 'error') return <Center>{error.message}</Center>;

    switch (data.exercise.type) {
        case 'WRITING': {
            return <></>;
        }
        case 'LISTENING': {
            return (
                <>
                    <ViewListentingAssignment
                        exercise={data.exercise}
                        submission={data.submission!}
                        assignment={data.assignment}
                    />
                </>
            );
        }
        case 'READING': {
            return <>View</>;
        }
        case 'SPEAKING':
            return <>{data.exercise.type}</>;
    }
}

export default ViewAssignmentView;
