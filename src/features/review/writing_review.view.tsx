import { ActionIcon, ActionIconGroup, Box, Flex, Tooltip } from '@mantine/core';
import { RichTextEditor, RichTextEditorContent, RichTextEditorControlsGroup } from '@mantine/tiptap';
import { IconEdit, IconMessagePlus } from '@tabler/icons-react';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Assignment, Exercise, Submission, WritingSubmissionContent } from '../../schema/types';

interface WritingingReviewViewProps {
    submission: Submission;
    exercise: Exercise;
    assignment: Assignment;
}

function WritingReviewView({ submission, exercise, assignment }: WritingingReviewViewProps) {
    const content = submission.content as WritingSubmissionContent;
    const value = content.value;
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        editable: false,
    });

    return (
        <>
            <Flex direction={'row'}>
                <RichTextEditor editor={editor} flex={1}>
                    {editor && (
                        <BubbleMenu editor={editor} shouldShow={({ editor }) => !editor.state.selection.empty}>
                            <RichTextEditorControlsGroup>
                                <ActionIconGroup>
                                    <Tooltip label="Add comment">
                                        <ActionIcon
                                            onClick={() => {
                                                console.log('selection', editor.state.selection);
                                            }}
                                        >
                                            <IconMessagePlus />
                                        </ActionIcon>
                                    </Tooltip>
                                    <Tooltip label="Suggest edits">
                                        <ActionIcon>
                                            <IconEdit />
                                        </ActionIcon>
                                    </Tooltip>
                                </ActionIconGroup>
                            </RichTextEditorControlsGroup>
                        </BubbleMenu>
                    )}
                    <RichTextEditorContent />
                </RichTextEditor>
                <Box flex={1}></Box>
            </Flex>
        </>
    );
}

export default WritingReviewView;
