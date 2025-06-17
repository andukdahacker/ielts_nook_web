import { Center, Loader } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import ViewListentingAssignment from './components/view_listening_assignment.view';
import ViewReadingAssignmentView from './components/view_reading_assignment.view';
import ViewWritingAssignmentView from './components/view_writing_assignment.view';
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
            return (
                <>
                    <ViewWritingAssignmentView
                        exercise={data.exercise}
                        submission={data.submission!}
                        assignment={data.assignment}
                    />
                </>
            );
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
            return (
                <>
                    <ViewReadingAssignmentView
                        exercise={data.exercise}
                        submission={data.submission!}
                        assignment={data.assignment}
                    />
                </>
            );
        }
        case 'SPEAKING':
            return <>{data.exercise.type}</>;
    }
}

export default ViewAssignmentView;
