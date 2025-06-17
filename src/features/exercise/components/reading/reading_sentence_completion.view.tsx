import { Stack } from '@mantine/core';
import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import EditorInput from '../../../../common/components/editor/editor';
import { GapPlaceholderNode } from '../../../../common/components/editor/gapPlaceholder/gap_placeholder';
import { ReadingSentenceCompletionTask } from '../../../../schema/types';

interface ReadingSentenceCompletionProps {
    task: ReadingSentenceCompletionTask;
    index: number;
}

function ReadingSentenceCompletion({ task, index }: ReadingSentenceCompletionProps) {
    const editor = useEditor({
        extensions: [StarterKit, GapPlaceholderNode],
        content: '',
    });

    return (
        <>
            <Stack>
                <EditorInput editor={editor} />
            </Stack>
        </>
    );
}

export default ReadingSentenceCompletion;
