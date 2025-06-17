import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { ActionIcon, Button, Center, Group, Radio, Stack, Text, TextInput } from '@mantine/core';
import { Link } from '@mantine/tiptap';
import { IconGripVertical, IconPlus, IconTrash } from '@tabler/icons-react';
import TextAlign from '@tiptap/extension-text-align';
import { JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useContext } from 'react';
import EditorInput from '../../../../common/components/editor/editor';
import { ReadingTFNGTask } from '../../../../schema/types';
import { ReadingComposerContext } from './reading_composer.context';
import classes from './reading_tfng.module.css';

interface ReadingTFNGProps {
    task: ReadingTFNGTask;
    index: number;
}

function ReadingTFNGView({ task, index }: ReadingTFNGProps) {
    const { removeTask, editTask } = useContext(ReadingComposerContext);
    const editInstruction = (value: JSONContent) => {
        editTask<ReadingTFNGTask>(index, {
            ...task,
            instructions: value,
        });
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: task.instructions != undefined ? (task.instructions as JSONContent) : '',
        onUpdate: ({ editor }) => {
            editInstruction(editor.getJSON());
        },
    });

    const onDragEndQuestion = (sourceIndex: number, destinationIndex: number) => {
        const newQuestions = [...task.questions];

        const temp = newQuestions[destinationIndex];

        newQuestions[destinationIndex] = newQuestions[sourceIndex];
        newQuestions[sourceIndex] = temp;

        const remappedOrder: typeof newQuestions = newQuestions.map((e, i) => {
            return {
                ...e,
                order: i + 1,
            };
        });

        editTask<ReadingTFNGTask>(index, {
            ...task,
            questions: remappedOrder,
        });
    };

    const editQuestionContent = (questionIndex: number, content: string) => {
        const newQuestions = [...task.questions];

        newQuestions[questionIndex].content = content;

        editTask<ReadingTFNGTask>(index, {
            ...task,
            questions: newQuestions,
        });
    };

    const removeQuestion = (questionIndex: number) => {
        const newQuestions = [...task.questions];

        newQuestions.splice(questionIndex, 1);

        const remappedOrder: typeof newQuestions = newQuestions.map((e, i) => {
            return {
                ...e,
                order: i + 1,
            };
        });

        editTask<ReadingTFNGTask>(index, {
            ...task,
            questions: remappedOrder,
        });
    };

    const addQuestion = () => {
        const order = task.questions.length + 1;
        editTask<ReadingTFNGTask>(index, {
            ...task,
            questions: [
                ...task.questions,
                {
                    order,
                    content: `Question ${order}`,
                    correctAnswer: 'TRUE',
                },
            ],
        });
    };

    const markOptionCorrect = (questionIndex: number, value: 'TRUE' | 'FALSE' | 'NOT GIVEN') => {
        const newQuestions = [...task.questions];

        newQuestions[questionIndex].correctAnswer = value;

        editTask<ReadingTFNGTask>(index, {
            ...task,
            questions: newQuestions,
        });
    };

    return (
        <>
            <Stack className={classes.container} p="xs">
                <Group justify="space-between">
                    <Text>Type: True, False, Not given</Text>
                    <Group>
                        <ActionIcon variant="filled" color="red" onClick={() => removeTask(index)}>
                            <IconTrash />
                        </ActionIcon>
                    </Group>
                </Group>
                <EditorInput editor={editor} label="Instructions" />

                <Stack>
                    <DragDropContext
                        onDragEnd={result => {
                            const source = result.source.index;
                            const destination = result.destination?.index;

                            if (destination != undefined) {
                                onDragEndQuestion(source, destination);
                            }
                        }}
                    >
                        <Droppable droppableId={`task${index}question`}>
                            {provided => (
                                <Stack {...provided.droppableProps} ref={provided.innerRef}>
                                    {task.questions.map((question, questionIndex) => (
                                        <Draggable
                                            key={question.order}
                                            index={questionIndex}
                                            draggableId={`${question.order}`}
                                        >
                                            {provided => (
                                                <Stack
                                                    key={questionIndex}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Group align="center">
                                                        <Center>
                                                            <Text>{questionIndex + 1}. </Text>
                                                        </Center>
                                                        <TextInput
                                                            flex={1}
                                                            value={question.content}
                                                            onChange={event => {
                                                                editQuestionContent(questionIndex, event.target.value);
                                                            }}
                                                        />

                                                        <ActionIcon
                                                            color="red"
                                                            onClick={() => removeQuestion(questionIndex)}
                                                        >
                                                            <IconTrash />
                                                        </ActionIcon>
                                                        <IconGripVertical />
                                                    </Group>
                                                    <Stack ml={'xl'} justify="center">
                                                        <Text>Correct answer</Text>
                                                        <Radio.Group
                                                            value={question.correctAnswer}
                                                            onChange={value => {
                                                                if (
                                                                    value == 'TRUE' ||
                                                                    value == 'FALSE' ||
                                                                    value == 'NOT GIVEN'
                                                                )
                                                                    markOptionCorrect(questionIndex, value);
                                                            }}
                                                        >
                                                            <Stack gap={'md'}>
                                                                <Radio value={'TRUE'} label="True" />
                                                                <Radio value={'FALSE'} label="False" />
                                                                <Radio value={'NOT GIVEN'} label="Not Given" />
                                                            </Stack>
                                                        </Radio.Group>
                                                    </Stack>
                                                </Stack>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Stack>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Stack>

                <Group>
                    <Button onClick={() => addQuestion()} leftSection={<IconPlus />}>
                        Add question
                    </Button>
                </Group>
            </Stack>
        </>
    );
}

export default ReadingTFNGView;
