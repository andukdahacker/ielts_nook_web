import { ActionIcon, Box, Button, Center, Flex, Group, Overlay, Radio, ScrollArea, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconPlayerPlay } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Assignment,
    Exercise,
    ListeningExercise,
    ListeningMultipleChoiceTask,
    ListeningSubmissionContent,
    ReadingSubmissionContent,
    Submission,
} from '../../../../schema/types';
import useCreateSubmission from '../../../submission/hooks/use_create_submission';

interface ListeningExerciseAssignmentViewProps {
    exercise: Exercise;
    assignment: Assignment;
    submission: Submission | null;
}

function ListeningExerciseAssignmentView({ exercise, assignment, submission }: ListeningExerciseAssignmentViewProps) {
    const listeningExercise = exercise.content as ListeningExercise;
    const tasks = listeningExercise.tasks;
    const file = listeningExercise.file;

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [showOverlay, setShowOverlay] = useState(true);

    const handleClickPlay = () => {
        setShowOverlay(false);
        audioRef.current?.play();
    };

    const form = useForm<ListeningSubmissionContent>({
        mode: 'uncontrolled',
    });

    useEffect(() => {
        form.setValues({
            tasks: tasks.map((task, taskIndex) => {
                return {
                    order: task.order,
                    questions: task.questions.map((question, questionIndex) => {
                        if (submission) {
                            const submissionContent = submission.content as ListeningSubmissionContent;
                            const answer = submissionContent.tasks[taskIndex].questions[questionIndex].answer;

                            return {
                                order: question.order,
                                answer,
                            };
                        }

                        return {
                            order: question.order,
                            answer: null,
                        };
                    }),
                };
            }),
        });
    }, []);

    const navigate = useNavigate();

    const { mutateAsync } = useCreateSubmission();

    const handleSubmit = async (values: ReadingSubmissionContent) => {
        if (submission) return;

        const id = notifications.show({
            message: 'Submitting...',
            autoClose: false,
        });

        console.log('values', values);

        try {
            await mutateAsync({
                assignmentId: assignment.id,
                content: values,
            });

            navigate('/assignment');
        } finally {
            notifications.hide(id);
        }
    };

    return (
        <form style={{ height: '100%' }} onSubmit={form.onSubmit(values => handleSubmit(values))}>
            <Box pos={'relative'}>
                {file && <audio src={file.url} ref={audioRef}></audio>}
                {showOverlay && (
                    <Overlay color="black.5" backgroundOpacity={0.5}>
                        <Center h={'100%'}>
                            <Stack justify="center" align="center">
                                <Text>
                                    You will be listening to an audio clip during this test. You will not be permitted
                                    to pause or rewind the audio while answering the questions.
                                </Text>
                                <Text>To continue, click Play</Text>
                                <Group>
                                    <Button leftSection={<IconPlayerPlay />} onClick={handleClickPlay}>
                                        Play
                                    </Button>
                                </Group>
                            </Stack>
                        </Center>
                    </Overlay>
                )}
                <ScrollArea h={'calc(100vh - 65px - 65px)'}>
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
                                            {task.questions.map((question, questionIndex) => (
                                                <Stack key={`task-${task.type}-question${question.order}`}>
                                                    <Group>
                                                        <Text>{question.order + questionBefore()}</Text>
                                                        <Text>{question.content}</Text>
                                                    </Group>

                                                    <Radio.Group>
                                                        <Stack>
                                                            {question.options.map(option => {
                                                                if (submission)
                                                                    return (
                                                                        <Group
                                                                            key={`task-${task.type}-question${question.order}-option${option.order}`}
                                                                        >
                                                                            <Radio
                                                                                label={option.content}
                                                                                value={option.value}
                                                                            />
                                                                        </Group>
                                                                    );

                                                                return (
                                                                    <>
                                                                        <Group
                                                                            key={`task-${task.type}-question${question.order}-option${option.order}`}
                                                                        >
                                                                            <Radio
                                                                                label={option.content}
                                                                                value={option.value}
                                                                                onChange={() => {
                                                                                    const currentValues = [
                                                                                        ...form.getValues().tasks,
                                                                                    ];

                                                                                    const targetTask =
                                                                                        currentValues[taskIndex];

                                                                                    const targetQuestion =
                                                                                        targetTask.questions[
                                                                                            questionIndex
                                                                                        ];

                                                                                    targetQuestion.answer =
                                                                                        option.value;
                                                                                    form.setFieldValue(
                                                                                        'tasks',
                                                                                        currentValues,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </Group>
                                                                    </>
                                                                );
                                                            })}
                                                        </Stack>
                                                    </Radio.Group>
                                                </Stack>
                                            ))}
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
                <Flex h={'65px'} direction={'row'} justify={'end'} align={'center'}>
                    {!submission && (
                        <ActionIcon size={'xl'} type="submit">
                            <IconCheck />
                        </ActionIcon>
                    )}
                </Flex>
            </Box>
        </form>
    );
}

export default ListeningExerciseAssignmentView;
