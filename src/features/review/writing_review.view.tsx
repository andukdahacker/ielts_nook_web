import { ActionIcon, ActionIconGroup, Flex, Paper, Stack, Text, Textarea, Tooltip } from '@mantine/core';
import { RichTextEditor, RichTextEditorContent, RichTextEditorControlsGroup } from '@mantine/tiptap';
import { IconMessagePlus, IconTrash } from '@tabler/icons-react';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import * as uuidV4 from 'uuid';
import { Comment as CommentExtention } from '../../common/components/editor/comment/comment';
import '../../common/components/editor/comment/comment.css';
import { CommentClickPlugin } from '../../common/components/editor/comment/comment_click.plugin';
import { CommentHighlightPlugin } from '../../common/components/editor/comment/comment_highlight.plugin';
import { Assignment, Comment, Exercise, Submission, WritingSubmissionContent } from '../../schema/types';
import AuthContext from '../auth/auth.context';

interface WritingingReviewViewProps {
    submission: Submission;
    exercise: Exercise;
    assignment: Assignment;
}

function WritingReviewView({ submission, exercise, assignment }: WritingingReviewViewProps) {
    const { user } = useContext(AuthContext);
    const content = submission.content as WritingSubmissionContent;
    const value = content.value;
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            CommentExtention,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        editable: false,
        onCreate: ({ editor }) => {
            editor.registerPlugin(
                CommentClickPlugin(id => {
                    setSelectedComment(id);
                }),
            );
        },
    });

    const [comments, setComments] = useState<Comment[]>([]);
    const [selectedComment, setSelectedComment] = useState<string | null>(null);

    const handleAddComment = () => {
        const id = uuidV4.v4();

        if (!editor) return;

        editor.commands.addComment(id);

        const selection = editor.state.selection;

        const from = selection.from;

        const to = selection.to;

        const selectedText = editor.state.doc.textBetween(from, to, ' ') ?? '';

        const currentComments = [...comments];

        currentComments.push({
            id,
            selectedText: selectedText,
            from,
            to,
            author: user?.id ?? '',
            comment: '',
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
        });

        setComments(currentComments);
    };

    const handleRemoveComment = (id: string) => {
        editor?.commands.removeComment(id);

        const currentComments = [...comments];

        const filtered = currentComments.filter(e => e.id != id);

        setComments(filtered);
    };

    useEffect(() => {
        if (!editor) return;
        if (!selectedComment) return;

        editor.registerPlugin(CommentHighlightPlugin(selectedComment));
    }, [editor, selectedComment]);

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
                                                handleAddComment();
                                            }}
                                        >
                                            <IconMessagePlus />
                                        </ActionIcon>
                                    </Tooltip>
                                </ActionIconGroup>
                            </RichTextEditorControlsGroup>
                        </BubbleMenu>
                    )}
                    <RichTextEditorContent />
                </RichTextEditor>
                <Stack flex={1} gap={'md'}>
                    {comments.map(comment => {
                        return (
                            <Paper key={comment.id} withBorder radius={'md'} m={'md'} p={'md'}>
                                <Stack gap={'md'}>
                                    <Flex direction={'row'} justify={'end'}>
                                        <ActionIcon
                                            color="red"
                                            onClick={() => {
                                                handleRemoveComment(comment.id);
                                            }}
                                        >
                                            <IconTrash />
                                        </ActionIcon>
                                    </Flex>
                                    <Text>{comment.selectedText}</Text>
                                    <Textarea />
                                </Stack>
                            </Paper>
                        );
                    })}
                </Stack>
            </Flex>
        </>
    );
}

export default WritingReviewView;
