import { Divider, Flex, Group, Radio, ScrollArea, Stack, Text } from '@mantine/core';
import {
    Assignment,
    Exercise,
    ListeningExercise,
    ListeningMultipleChoiceTask,
    ListeningSubmissionContent,
    ListeningSubmissionFeedback,
    ListeningSubmissionGrade,
    Submission,
} from '../../../schema/types';

interface ViewListeningAssignmentProps {
    exercise: Exercise;
    assignment: Assignment;
    submission: Submission;
}

function ViewListentingAssignment({ exercise, assignment, submission }: ViewListeningAssignmentProps) {
    const content = exercise.content as ListeningExercise;
    const tasks = content.tasks;

    const submissionContent = submission.content as ListeningSubmissionContent;
    const submissionContentTasks = submissionContent.tasks;

    const submissionGrade = submission.grade as ListeningSubmissionGrade;

    const submissionFeedback = submission.feedback as ListeningSubmissionFeedback | null;

    return (
        <>
            <Flex direction={'row'}>
                <ScrollArea h={'calc(100vh - 65px)'} flex={1}>
                    <Stack p={'md'}>
                        {tasks.map((e, taskIndex) => {
                            switch (e.type) {
                                case 'Multiple choice': {
                                    const task = e as ListeningMultipleChoiceTask;

                                    const questionBefore = () => {
                                        const tasksBefore = tasks.slice(0, taskIndex);

                                        let result = 0;

                                        tasksBefore.forEach(task => {
                                            task.questions.forEach(() => {
                                                result++;
                                            });
                                        });

                                        return result;
                                    };

                                    return (
                                        <Stack key={`task-${task.type}-${task.order}`}>
                                            {task.questions.map(question => {
                                                return (
                                                    <Stack key={`task-${task.type}-question${question.order}`}>
                                                        <Group>
                                                            <Text>{question.order + questionBefore()}</Text>
                                                            <Text>{question.content}</Text>
                                                        </Group>

                                                        <Radio.Group>
                                                            <Stack>
                                                                {question.options.map(option => {
                                                                    const studentAnswer =
                                                                        submissionContentTasks[task.order - 1]
                                                                            .questions[question.order - 1].answer;
                                                                    const isSelectedByStudent =
                                                                        option.content == studentAnswer;
                                                                    const correctAnswer = question.correctAnswer;
                                                                    const studentIsCorrect =
                                                                        studentAnswer == correctAnswer;
                                                                    const isCorrectAnswer =
                                                                        option.content == correctAnswer;
                                                                    return (
                                                                        <Group
                                                                            key={`task-${task.type}-question${question.order}-option${option.order}`}
                                                                            bg={
                                                                                isSelectedByStudent
                                                                                    ? studentIsCorrect
                                                                                        ? 'green'
                                                                                        : 'red'
                                                                                    : isCorrectAnswer
                                                                                      ? 'gray'
                                                                                      : undefined
                                                                            }
                                                                        >
                                                                            <Radio.Indicator
                                                                                checked={isSelectedByStudent}
                                                                                disabled
                                                                            />
                                                                            <Text>{option.content}</Text>
                                                                        </Group>
                                                                    );
                                                                })}
                                                            </Stack>
                                                        </Radio.Group>
                                                    </Stack>
                                                );
                                            })}
                                        </Stack>
                                    );
                                }
                                default: {
                                    return <>Not yet</>;
                                }
                            }
                        })}
                    </Stack>
                </ScrollArea>
                <Divider orientation="vertical" h={'calc(100vh - 65px)'} />
                <ScrollArea flex={1} h={'calc(100vh - 65px)'}>
                    <Stack p={'md'}>
                        <Text>
                            {submissionGrade.score}/{submissionGrade.total}
                        </Text>

                        <Text>Feedback</Text>
                        <Text>{submissionFeedback?.feedback}</Text>
                    </Stack>
                </ScrollArea>
            </Flex>
        </>
    );
}

export default ViewListentingAssignment;
