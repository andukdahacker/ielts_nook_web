import { Button, Center, Flex, Group, Modal, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from '@mantine/tiptap';
import { IconGripVertical } from '@tabler/icons-react';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import EditorInput from '../../../../common/components/editor/editor';
import {
    ReadingExerciseType,
    ReadingMultipleChoiceTask,
    ReadingSentenceCompletionTask,
    ReadingSummaryCompletionTask,
    ReadingTFNGTask,
    ReadingYNNGTask,
} from '../../../../schema/types';
import useUpdateExercise from '../../hooks/use_update_exercise';
import TaskPlaceholder from '../common/task_placeholder.view';
import { ReadingComposerContext } from './reading_composer.context';
import classes from './reading_composer.module.css';
import ReadingMultipleChoice from './reading_multiple_choice.view';
import ReadingPreviewerView from './reading_previewer.view';
import ReadingSentenceCompletion from './reading_sentence_completion.view';
import ReadingSummaryCompletion from './reading_summary_completion.view';
import ReadingTFNGView from './reading_tfng.view';
import ReadingYNNGView from './reading_ynng.view';

type ReadingTaskTag = {
    type: ReadingExerciseType;
    label: string;
};

const ReadingTaskTags: ReadingTaskTag[] = [
    {
        type: 'Multiple choice',
        label: 'Multiple choice',
    },
    {
        type: 'True/False/Not Given',
        label: 'True/False/Not Given',
    },
    {
        type: 'Yes/No/Not Given',
        label: 'Yes/No/Not Given',
    },
    {
        type: 'Sentence Completion',
        label: 'Sentence Completion',
    },
    {
        type: 'Summary Completion',
        label: 'Summary Completion',
    },
];

function ReadingComposerEdit() {
    const { name, setName, content, title, setTitle, tasks, setContent, addTask } = useContext(ReadingComposerContext);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getJSON());
        },
    });

    const [isDragging, setIsDragging] = useState(false);

    const { status, mutate } = useUpdateExercise();

    const [previewOpened, { open: openPreview, close: closePreview }] = useDisclosure();

    const { id } = useParams();

    return (
        <>
            <Stack>
                <Paper withBorder m={'1rem'}>
                    <Flex direction={'column'}>
                        <Group p={'xs'} h={'48px'} className={classes.header} align="center" justify="space-between">
                            <TextInput
                                value={name}
                                onChange={event => {
                                    setName(event.currentTarget.value);
                                }}
                                size="xs"
                            />
                            <Group>
                                <Button size="xs" variant="transparent" onClick={openPreview}>
                                    Preview form
                                </Button>
                            </Group>
                        </Group>
                        <Flex direction={'row'} h={'calc(100vh - 2rem - 48px - 65px - 0.625rem)'}>
                            <ScrollArea flex={1} className={classes.tagList}>
                                <Stack p={'xs'}>
                                    {ReadingTaskTags.map(e => (
                                        <Group
                                            key={e.type}
                                            className={classes.exerciseTag}
                                            justify="space-between"
                                            draggable
                                            id={e.type}
                                            onDragStart={event => {
                                                event.dataTransfer.setData('text/plain', e.type);
                                                event.dataTransfer.effectAllowed = 'copyMove';
                                                setIsDragging(true);
                                            }}
                                            onDragEnd={() => {
                                                setIsDragging(false);
                                            }}
                                        >
                                            <Text size="xs">{e.label}</Text>
                                            <Center>
                                                <IconGripVertical size={16} />
                                            </Center>
                                        </Group>
                                    ))}
                                </Stack>
                            </ScrollArea>
                            <Flex flex={4} direction={'column'}>
                                <ScrollArea w={'100%'} h={'calc(100% - 48px)'}>
                                    <Stack p={'lg'}>
                                        <TextInput
                                            label={'Title'}
                                            value={title}
                                            onChange={event => {
                                                setTitle(event.target.value);
                                            }}
                                        />
                                        <EditorInput editor={editor} label="Content" />
                                        <Stack>
                                            {tasks.map((e, index) => {
                                                switch (e.type) {
                                                    case 'Multiple choice':
                                                        return (
                                                            <ReadingMultipleChoice
                                                                task={e as ReadingMultipleChoiceTask}
                                                                index={index}
                                                                key={index}
                                                            />
                                                        );
                                                    case 'True/False/Not Given':
                                                        return (
                                                            <ReadingTFNGView
                                                                task={e as ReadingTFNGTask}
                                                                index={index}
                                                            />
                                                        );
                                                    case 'Yes/No/Not Given':
                                                        return (
                                                            <ReadingYNNGView
                                                                task={e as ReadingYNNGTask}
                                                                index={index}
                                                            />
                                                        );
                                                    case 'Summary Completion':
                                                        return (
                                                            <ReadingSummaryCompletion
                                                                task={e as ReadingSummaryCompletionTask}
                                                                index={index}
                                                            />
                                                        );
                                                    case 'Sentence Completion':
                                                        return (
                                                            <ReadingSentenceCompletion
                                                                task={e as ReadingSentenceCompletionTask}
                                                                index={index}
                                                            />
                                                        );
                                                    default:
                                                        return <Text key={index}>{e.type}</Text>;
                                                }
                                            })}
                                        </Stack>

                                        <TaskPlaceholder
                                            isDragging={isDragging}
                                            onDrop={(data: ReadingExerciseType) => addTask(data)}
                                        />
                                    </Stack>
                                </ScrollArea>
                                <Group
                                    h={'48px'}
                                    className={classes.composerFooter}
                                    justify="end"
                                    align="center"
                                    p={'xs'}
                                >
                                    <Button
                                        size="xs"
                                        onClick={() => {
                                            mutate({
                                                id: id!,
                                                content: {
                                                    title,
                                                    content,
                                                    tasks,
                                                },
                                                name,
                                            });
                                        }}
                                        loading={status == 'pending'}
                                        disabled={status == 'pending'}
                                    >
                                        Save changes
                                    </Button>
                                </Group>
                            </Flex>
                        </Flex>
                    </Flex>
                </Paper>
            </Stack>
            <Modal opened={previewOpened} onClose={closePreview} title={'Preview'} fullScreen={true}>
                <ReadingPreviewerView title={title} content={content} tasks={tasks} />
            </Modal>
        </>
    );
}

export default ReadingComposerEdit;
