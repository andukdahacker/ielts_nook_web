import { Content } from '@tiptap/react';
import { PropsWithChildren, useState } from 'react';
import {
    Exercise,
    ReadingExercise,
    ReadingExerciseType,
    ReadingMultipleChoiceTask,
    ReadingSentenceCompletionTask,
    ReadingSummaryCompletionTask,
    ReadingTask,
    ReadingTFNGTask,
    ReadingYNNGTask,
} from '../../../../schema/types';
import { ReadingComposerContext } from './reading_composer.context';

interface ReadingComposerProviderProps {
    exercise?: Exercise;
    readingExercise?: ReadingExercise;
}

function ReadingComposerProvider({
    children,
    readingExercise,
    exercise,
}: PropsWithChildren<ReadingComposerProviderProps>) {
    const [tasks, setTasks] = useState<ReadingExercise['tasks']>(readingExercise?.tasks ?? []);

    const [content, setContent] = useState<Content>(readingExercise?.content ?? '');

    const [title, setTitle] = useState(readingExercise?.title ?? '');

    const [name, setName] = useState(exercise?.name ?? '');

    const addTask = (type: ReadingExerciseType) => {
        switch (type) {
            case 'Multiple choice': {
                const multipleChoiceTask = {
                    order: tasks.length + 1,
                    type: 'Multiple choice',
                    instructions: '',
                    questions: [],
                } as ReadingMultipleChoiceTask;
                setTasks([...tasks, multipleChoiceTask]);
                break;
            }
            case 'True/False/Not Given': {
                const task = {
                    order: tasks.length + 1,
                    type: 'True/False/Not Given',
                    instructions: '',
                    questions: [],
                } as ReadingTFNGTask;
                setTasks([...tasks, task]);
                break;
            }
            case 'Yes/No/Not Given': {
                const task = {
                    order: tasks.length + 1,
                    instructions: '',
                    questions: [],
                    type: 'Yes/No/Not Given',
                } as ReadingYNNGTask;
                setTasks([...tasks, task]);
                break;
            }
            case 'Sentence Completion': {
                const task = {
                    order: tasks.length + 1,
                    type: 'Sentence Completion',
                    instruction: '',
                    questions: [],
                    title: '',
                    content: '',
                } as ReadingSentenceCompletionTask;
                setTasks([...tasks, task]);
                break;
            }
            case 'Summary Completion': {
                const task = {
                    order: tasks.length + 1,
                    type: 'Summary Completion',
                    instruction: '',
                    questions: [],
                    content: '',
                    title: '',
                } as ReadingSummaryCompletionTask;
                setTasks([...tasks, task]);
                break;
            }
            default: {
                return;
            }
        }
    };

    const removeTask = (index: number) => {
        setTasks(tasks => {
            const newArray = [...tasks];
            newArray.splice(index, 1);

            const remappedOrder: typeof newArray = newArray.map((e, i) => {
                return {
                    ...e,
                    order: i + 1,
                };
            });

            return remappedOrder;
        });
    };

    function editTask<T extends ReadingTask>(index: number, task: T) {
        setTasks(tasks => {
            const newArray = [...tasks];

            newArray[index] = task;
            const remappedOrder: typeof newArray = newArray.map((e, i) => {
                return {
                    ...e,
                    order: i + 1,
                };
            });
            return remappedOrder;
        });
    }

    return (
        <ReadingComposerContext.Provider
            value={{
                name,
                setName,
                content,
                setContent,
                title,
                setTitle,
                tasks,
                addTask,
                removeTask,
                editTask,
            }}
        >
            {children}
        </ReadingComposerContext.Provider>
    );
}

export default ReadingComposerProvider;
