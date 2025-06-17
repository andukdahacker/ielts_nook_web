import { Center, Flex, Image, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import { Link, RichTextEditor, RichTextEditorContent } from '@mantine/tiptap';
import TextAlign from '@tiptap/extension-text-align';
import { Content, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useContext, useEffect, useState } from 'react';
import { Comment as CommentExtention } from '../../../common/components/editor/comment/comment';
import { CommentClickPlugin } from '../../../common/components/editor/comment/comment_click.plugin';
import { CommentHighlightPlugin } from '../../../common/components/editor/comment/comment_highlight.plugin';
import { selectedCommentRef } from '../../../constants';
import {
    Assignment,
    Exercise,
    Submission,
    WritingComment,
    WritingExercise,
    WritingSubmissionContent,
    WritingSubmissionFeedback,
    WritingSubmissionGrade,
} from '../../../schema/types';
import AuthContext from '../../auth/auth.context';
import WritingCommentView from '../../review/components/writing_comment.view';

interface ViewWritingAssignmentViewProps {
    exercise: Exercise;
    submission: Submission;
    assignment: Assignment;
}

function ViewWritingAssignmentView({ exercise, submission, assignment }: ViewWritingAssignmentViewProps) {
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
    const submissionGrade = submission.grade as WritingSubmissionGrade | null;

    const [comments, setComments] = useState<WritingComment[]>(feedbackComments);
    const [selectedComment, setSelectedComment] = useState<string | null>(null);

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
                                                onCancel={() => {}}
                                                isDraft={false}
                                                onCommentSuccess={newComments => {}}
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
                            <Stack p={'md'}>
                                <Stack>
                                    <Text>Task achivement</Text>
                                    <Text>{submissionGrade?.taskAchievement}/9</Text>
                                    <Text>{submissionGrade?.taskAchievementComment}</Text>
                                </Stack>
                                <Stack>
                                    <Text>Coherence and cohesion</Text>
                                    <Text>{submissionGrade?.coherenceAndCohesion}/9</Text>
                                    <Text>{submissionGrade?.coherenceAndCohesionComment}</Text>
                                </Stack>
                                <Stack>
                                    <Text>Grammatical range and Accuracy</Text>
                                    <Text>{submissionGrade?.grammaticalRangeAndAccuracy}/9</Text>
                                    <Text>{submissionGrade?.grammaticalRangeAndAccuracyComment}</Text>
                                </Stack>
                                <Stack>
                                    <Text>Grammatical range and Accuracy</Text>
                                    <Text>{submissionGrade?.lexicalResource}/9</Text>
                                    <Text>{submissionGrade?.lexicalResourceComment}</Text>
                                </Stack>
                            </Stack>
                        </Tabs.Panel>
                    </Tabs>
                </ScrollArea>
            </Flex>
        </>
    );
}

export default ViewWritingAssignmentView;
