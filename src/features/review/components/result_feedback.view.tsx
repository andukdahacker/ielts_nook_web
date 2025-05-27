import { Button, Slider, Space, Stack, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { Assignment, Submission, WritingSubmissionGrade } from '../../../schema/types';
import useUpdateSubmission from '../../submission/hooks/use_update_submission';

interface ResultFeedbackViewProps {
    submission: Submission;
    assignment: Assignment;
}

function ResultFeedbackView({ submission, assignment }: ResultFeedbackViewProps) {
    const grade = submission.grade as WritingSubmissionGrade | null;
    const form = useForm<WritingSubmissionGrade>({
        mode: 'uncontrolled',
        initialValues: {
            taskAchievement: grade?.taskAchievement ?? 0,
            taskAchievementComment: grade?.taskAchievementComment ?? '',
            lexicalResource: grade?.lexicalResource ?? 0,
            lexicalResourceComment: grade?.lexicalResourceComment ?? '',
            coherenceAndCohesion: grade?.coherenceAndCohesion ?? 0,
            coherenceAndCohesionComment: grade?.coherenceAndCohesionComment ?? '',
            grammaticalRangeAndAccuracy: grade?.grammaticalRangeAndAccuracy ?? 0,
            grammaticalRangeAndAccuracyComment: grade?.grammaticalRangeAndAccuracyComment ?? '',
        },
    });

    const { mutateAsync } = useUpdateSubmission();

    const navigate = useNavigate();

    return (
        <form
            onSubmit={form.onSubmit(async values => {
                await mutateAsync({ id: submission.id, grade: values, isReviewed: true });
                navigate(`/class/${assignment.classMemberClassId}/member/${assignment.classMemberUserId}`);
            })}
        >
            <Stack>
                <Stack>
                    <Text>Task achievement</Text>
                    <Slider
                        key={form.key('taskAchievement')}
                        {...form.getInputProps('taskAchievement')}
                        min={0}
                        max={9}
                        step={0.5}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 3, label: '3' },
                            { value: 6, label: '6' },
                            { value: 9, label: '9' },
                        ]}
                    />
                    <Space />
                    <Textarea
                        key={form.key('taskAchievementComment')}
                        {...form.getInputProps('taskAchievementComment')}
                    />
                </Stack>
                <Stack>
                    <Text>Grammatical range & Accuracy</Text>
                    <Slider
                        key={form.key('grammaticalRangeAndAccuracy')}
                        {...form.getInputProps('grammaticalRangeAndAccuracy')}
                        min={0}
                        max={9}
                        step={0.5}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 3, label: '3' },
                            { value: 6, label: '6' },
                            { value: 9, label: '9' },
                        ]}
                    />
                    <Space />
                    <Textarea
                        key={form.key('grammaticalRangeAndAccuracyComment')}
                        {...form.getInputProps('grammaticalRangeAndAccuracyComment')}
                    />
                </Stack>
                <Stack>
                    <Text>Lexical resource</Text>
                    <Slider
                        key={form.key('lexicalResource')}
                        {...form.getInputProps('lexicalResource')}
                        min={0}
                        max={9}
                        step={0.5}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 3, label: '3' },
                            { value: 6, label: '6' },
                            { value: 9, label: '9' },
                        ]}
                    />
                    <Space />
                    <Textarea
                        key={form.key('lexicalResourceComment')}
                        {...form.getInputProps('lexicalResourceComment')}
                    />
                </Stack>
                <Stack>
                    <Text>Coherence and cohesion</Text>
                    <Slider
                        key={form.key('coherenceAndCohesion')}
                        {...form.getInputProps('coherenceAndCohesion')}
                        min={0}
                        max={9}
                        step={0.5}
                        marks={[
                            { value: 0, label: '0' },
                            { value: 3, label: '3' },
                            { value: 6, label: '6' },
                            { value: 9, label: '9' },
                        ]}
                    />
                    <Space />
                    <Textarea
                        key={form.key('coherenceAndCohesion')}
                        {...form.getInputProps('coherenceAndCohesionComment')}
                    />
                </Stack>
                <Button type="submit">Submit</Button>
            </Stack>
        </form>
    );
}

export default ResultFeedbackView;
