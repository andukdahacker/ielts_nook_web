import { ActionIcon, ActionIconGroup, Center, Flex, Image, ScrollArea, Stack, Tabs, Tooltip } from '@mantine/core';
import { RichTextEditor, RichTextEditorContent, RichTextEditorControlsGroup } from '@mantine/tiptap';
import { IconMessagePlus } from '@tabler/icons-react';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { BubbleMenu, Content, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import * as uuidV4 from 'uuid';
import { Comment as CommentExtention } from '../../common/components/editor/comment/comment';
import '../../common/components/editor/comment/comment.css';
import { CommentClickPlugin } from '../../common/components/editor/comment/comment_click.plugin';
import { CommentHighlightPlugin } from '../../common/components/editor/comment/comment_highlight.plugin';
import { selectedCommentRef } from '../../constants';
import {
    Assignment,
    Exercise,
    Submission,
    WritingComment,
    WritingExercise,
    WritingSubmissionContent,
    WritingSubmissionFeedback,
} from '../../schema/types';
import AuthContext from '../auth/auth.context';
import ResultFeedbackView from './components/result_feedback.view';
import WritingCommentView from './components/writing_comment.view';

interface WritingingReviewViewProps {
    submission: Submission;
    exercise: Exercise;
    assignment: Assignment;
}

function WritingReviewView({ submission, exercise, assignment }: WritingingReviewViewProps) {
    const { user } = useContext(AuthContext);
    const content = submission.content as WritingSubmissionContent;
    const [contentValue, setContentValue] = useState<Content>(content.value as Content);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            CommentExtention,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: contentValue,
        editable: false,
        onCreate: ({ editor }) => {
            editor.registerPlugin(
                CommentClickPlugin(id => {
                    setSelectedComment(id);
                    selectedCommentRef.current = id;
                }),
            );
            editor.registerPlugin(CommentHighlightPlugin(() => selectedCommentRef.current));
        },
    });

    const feedback = submission.feedback ? (submission.feedback as WritingSubmissionFeedback) : null;
    const feedbackComments = feedback ? feedback.comments : [];

    const [comments, setComments] = useState<WritingComment[]>(feedbackComments);
    const [selectedComment, setSelectedComment] = useState<string | null>(null);
    const [draftComment, setDraftComment] = useState<string | null>(null);

    const handleAddComment = async () => {
        if (!editor) return;

        const id = uuidV4.v4();
        editor.commands.addComment(id);

        const selection = editor.state.selection;

        const from = selection.from;

        const to = selection.to;

        const selectedText = editor.state.doc.textBetween(from, to, ' ') ?? '';

        const currentComments = comments.slice();

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

        const sorted = currentComments.sort((a, b) => a.from - b.from);

        setComments(sorted);
        setDraftComment(id);
        setSelectedComment(id);
        selectedCommentRef.current = id;
    };

    const handleRemoveComment = (id: string) => {
        editor?.commands.removeComment(id);

        const currentComments = [...comments];

        const filtered = currentComments.filter(e => e.id != id);

        setComments(filtered);
    };

    useEffect(() => {
        if (!selectedComment) return;

        const commentEl = document.querySelector(`span[data-comment-id="${selectedComment}"]`);
        const comment = document.querySelector(`div[id="${selectedComment}"`);

        if (commentEl) {
            commentEl.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }

        if (comment) {
            comment.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [editor, selectedComment]);

    const writingExercise = exercise.content as WritingExercise;
    const file = writingExercise.file;
    const type = writingExercise.type;
    const title = writingExercise.title;

    const questionEditor = useEditor({
        extensions: [
            StarterKit,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: title as Content,
        editable: false,
    });

    return (
        <>
            <Flex direction={'row'}>
                <ScrollArea h={'calc(100vh - 65px)'} flex={1}>
                    <RichTextEditor editor={editor} h={'calc(100vh - 65px)'}>
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
                </ScrollArea>
                <ScrollArea flex={1} h={'calc(100vh - 65px)'}>
                    <Tabs variant="pills" defaultValue={'question'} p={'md'}>
                        <Tabs.List>
                            <Tabs.Tab value="question">Question</Tabs.Tab>
                            <Tabs.Tab value="comments">Comments</Tabs.Tab>
                            <Tabs.Tab value="result">Result & Feedback</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="question">
                            <Stack p={'md'}>
                                <Center>
                                    <EditorContent editor={questionEditor} />
                                </Center>
                                {file && type == 'Task 1' && <Image src={file.url} fit="contain" />}
                            </Stack>
                        </Tabs.Panel>
                        <Tabs.Panel value="comments">
                            <Stack gap={'md'}>
                                {comments.map(comment => {
                                    const isSelected = comment.id == selectedComment;
                                    const isDraft = draftComment == comment.id;
                                    return (
                                        <div key={comment.id} id={comment.id}>
                                            <WritingCommentView
                                                submission={submission}
                                                comment={comment}
                                                isSelected={isSelected}
                                                onCommentClick={() => {
                                                    setSelectedComment(comment.id);
                                                    selectedCommentRef.current = comment.id;

                                                    if (editor) {
                                                        editor.view.dispatch(editor.view.state.tr);
                                                    }
                                                }}
                                                onCancel={() => {
                                                    handleRemoveComment(comment.id);
                                                }}
                                                isDraft={isDraft}
                                                onCommentSuccess={newComments => {
                                                    setDraftComment(null);
                                                    setComments(newComments);
                                                }}
                                                onCancelEditing={() => {
                                                    setSelectedComment(null);
                                                    selectedCommentRef.current = null;

                                                    if (editor) {
                                                        editor.view.dispatch(editor.view.state.tr);
                                                    }
                                                }}
                                                editor={editor}
                                            />
                                        </div>
                                    );
                                })}
                            </Stack>
                        </Tabs.Panel>
                        <Tabs.Panel value="result">
                            <ResultFeedbackView submission={submission} assignment={assignment} />
                        </Tabs.Panel>
                    </Tabs>
                </ScrollArea>
            </Flex>
        </>
    );
}

export default WritingReviewView;
