import { Center, Loader } from '@mantine/core';
import { useParams } from 'react-router';
import useGetAssignment from '../assignment/hooks/use_get_assignment';
import ListeningReviewView from './listening_review.view';
import ReadingReviewView from './reading_review.view';
import WritingReviewView from './writing_review.view';

function ReviewView() {
    const { id } = useParams();
    const { data, status, error } = useGetAssignment(id ?? '');
    if (status == 'pending') {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    if (status == 'error') {
        return <Center>{error.message}</Center>;
    }

    const exercise = data.exercise;
    const submission = data.submission;
    const assignment = data.assignment;

    if (!submission) {
        return <Center>Submission is not found</Center>;
    }

    switch (exercise.type) {
        case 'LISTENING': {
            return (
                <>
                    <ListeningReviewView submission={submission} exercise={exercise} assignment={assignment} />
                </>
            );
        }
        case 'READING': {
            return (
                <>
                    <ReadingReviewView submission={submission} exercise={exercise} assignment={assignment} />
                </>
            );
        }
        case 'WRITING': {
            return (
                <>
                    <WritingReviewView submission={submission} exercise={exercise} assignment={assignment} />
                </>
            );
        }
        case 'SPEAKING': {
            return <></>;
        }
    }
}

export default ReviewView;
