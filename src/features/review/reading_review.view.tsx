import { Assignment, Exercise, Submission } from '../../schema/types';

interface ReadingReviewViewProps {
    submission: Submission;
    exercise: Exercise;
    assignment: Assignment;
}

function ReadingReviewView({ submission, exercise, assignment }: ReadingReviewViewProps) {
    return <></>;
}

export default ReadingReviewView;
