import { Center, Loader } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import ListeningExerciseAssignmentView from '../exercise/components/listening/listening_exercise_assignment.view';
import ReadingExerciseAssignmentView from '../exercise/components/reading/reading_exercise_assignment.view';
import WritingExerciseAssignmentView from '../exercise/components/writing/writing_exercise_assignment.view';
import useGetAssignment from './hooks/use_get_assignment';

function DoAssignmentView() {
    const { id } = useParams();

    const { data, status, error } = useGetAssignment(id as string);

    const navigate = useNavigate();

    useEffect(() => {
        if (!data) return;
        if (data.assignment.status != 'ASSIGNED') {
            navigate(`/assignment/${data.assignment.id}/view`);
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
                    <WritingExerciseAssignmentView exercise={data.exercise} assignment={data.assignment} />
                </>
            );
        }
        case 'LISTENING': {
            return (
                <>
                    <ListeningExerciseAssignmentView
                        exercise={data.exercise}
                        assignment={data.assignment}
                        submission={data.submission}
                    />
                </>
            );
        }
        case 'READING': {
            return (
                <>
                    <ReadingExerciseAssignmentView
                        exercise={data.exercise}
                        assignment={data.assignment}
                        submission={data.submission}
                    />
                </>
            );
        }
        case 'SPEAKING':
            return <>{data.exercise.type}</>;
    }
}

export default DoAssignmentView;
