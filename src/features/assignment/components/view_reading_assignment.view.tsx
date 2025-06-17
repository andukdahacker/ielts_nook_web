import { Center, Divider, Flex, Group, Radio, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from '@mantine/tiptap';
import TextAlign from '@tiptap/extension-text-align';
import { Content, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Assignment,
    Exercise,
    ReadingExercise,
    ReadingMultipleChoiceTask,
    ReadingSubmissionContent,
    ReadingSubmissionFeedback,
    ReadingSubmissionGrade,
    Submission,
} from '../../../schema/types';

interface ViewReadingAssignmentViewProps {
    exercise: Exercise;
    submission: Submission;
    assignment: Assignment;
}

function ViewReadingAssignmentView({ exercise, submission, assignment }: ViewReadingAssignmentViewProps) {
    const content = exercise.content as ReadingExercise;
    const tasks = content.tasks;

    const submissionContent = submission.content as ReadingSubmissionContent;
    const submissionContentTasks = submissionContent.tasks;

    const submissionGrade = submission.grade as ReadingSubmissionGrade;

    const submissionFeedback = submission.feedback as ReadingSubmissionFeedback | null;

    const readingExercise = exercise.content as ReadingExercise;

    const exerciseContent = readingExercise.content as Content;

    const form = useForm<ReadingSubmissionFeedback>({
        mode: 'uncontrolled',
        initialValues: {
            feedback: submissionFeedback?.feedback ?? '',
        },
    });

    const questionEditor = useEditor({
        extensions: [
            StarterKit,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: exerciseContent,
        editable: false,
    });

    return (
        <Flex direction={'row'}>
            <ScrollArea h={'calc(100vh - 65px)'} flex={1}>
                <Stack p={'md'}>
                    {tasks.map((e, taskIndex) => {
                        switch (e.type) {
                            case 'Multiple choice': {
                                const task = e as ReadingMultipleChoiceTask;

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
                                                                    submissionContentTasks[task.order - 1].questions[
                                                                        question.order - 1
                                                                    ].answer;
                                                                const isSelectedByStudent =
                                                                    option.content == studentAnswer;
                                                                const correctAnswer = question.correctAnswer;
                                                                const studentIsCorrect = studentAnswer == correctAnswer;
                                                                const isCorrectAnswer = option.content == correctAnswer;
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
                <Tabs variant="pills" defaultValue={'question'} p={'md'}>
                    <Tabs.List>
                        <Tabs.Tab value="question">Question</Tabs.Tab>
                        <Tabs.Tab value="result">Result & Feedback</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="question">
                        <Stack p={'md'}>
                            <Center>{<EditorContent editor={questionEditor} />}</Center>
                        </Stack>
                    </Tabs.Panel>
                    <Tabs.Panel value="result">
                        <Stack p={'md'}>
                            <Text>
                                {submissionGrade.score}/{submissionGrade.total}
                            </Text>

                            <Text>Feedback</Text>
                            <Text>{submissionFeedback?.feedback}</Text>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </ScrollArea>
        </Flex>
    );
}

export default ViewReadingAssignmentView;
