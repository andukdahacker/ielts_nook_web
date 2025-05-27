import {
    ActionIcon,
    Button,
    Flex,
    Group,
    Menu,
    MenuDropdown,
    MenuTarget,
    Paper,
    Stack,
    Text,
    Textarea,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical } from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import dayjs from 'dayjs';
import { useContext, useEffect, useRef, useState } from 'react';
import { Submission, WritingComment, WritingSubmissionFeedback } from '../../../schema/types';
import AuthContext from '../../auth/auth.context';
import useUpdateSubmission from '../../submission/hooks/use_update_submission';

interface WritingCommentProps {
    submission: Submission;
    comment: WritingComment;
    isSelected: boolean;
    onCommentClick: () => void;
    onCommentSuccess: (comments: WritingComment[]) => void;
    onCancelEditing: () => void;
    onCancel: () => void;
    isDraft: boolean;
    editor: Editor | null;
}

function WritingCommentView({
    comment,
    submission,
    isSelected,
    onCommentClick,
    onCancel,
    onCancelEditing,
    onCommentSuccess,
    isDraft,
    editor,
}: WritingCommentProps) {
    const { role } = useContext(AuthContext);
    const [value, setValue] = useState(comment.comment);
    const [isEditing, setIsEditing] = useState(false);
    const { mutateAsync, isError, isPending } = useUpdateSubmission();
    const draftCommentRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const feedback = submission.feedback ? (submission.feedback as WritingSubmissionFeedback) : null;
    const feedbackComments = feedback ? feedback.comments : [];
    const addComment = async () => {
        feedbackComments.push({ ...comment, comment: value });

        const sorted = feedbackComments.sort((a, b) => a.from - b.from);
        await mutateAsync({
            id: submission.id,
            feedback: {
                comments: sorted,
            },
            content: {
                value: editor?.getJSON(),
            },
        });

        onCommentSuccess(sorted);
        onCancelEditing();
    };

    const editComment = async () => {
        const index = feedbackComments.findIndex(e => e.id == comment.id);

        if (index < 0) {
            return;
        }

        feedbackComments[index] = {
            ...comment,
            comment: value,
            updatedAt: dayjs().toISOString(),
        };

        await mutateAsync({
            id: submission.id,
            feedback: {
                comments: feedbackComments,
            },
        });

        onCommentSuccess(feedbackComments);
        onCancelEditing();
        setIsEditing(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (draftCommentRef.current && !draftCommentRef.current.contains(event.target as Node)) {
                // onCancel();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [onCancel, isEditing, onCancelEditing, isDraft]);

    useEffect(() => {
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    }, []);

    const handleDelete = () => {
        modals.openConfirmModal({
            title: 'Delete comment',
            centered: true,
            children: <Text>Are you sure you want to delete this comment?</Text>,
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            onConfirm: async () => {
                const notificationId = notifications.show({
                    message: 'Deleting comment',
                    autoClose: false,
                });
                const feedback = submission.feedback ? (submission.feedback as WritingSubmissionFeedback) : null;
                const feedbackComments = feedback ? feedback.comments : [];

                const deleted = feedbackComments.filter(e => e.id != comment.id).sort((a, b) => a.from - b.from);

                if (editor) {
                    editor.commands.removeComment(comment.id);
                    editor.view.dispatch(editor.view.state.tr);
                }

                const content = editor?.getJSON();

                try {
                    await mutateAsync({
                        id: submission.id,
                        feedback: {
                            comments: deleted,
                        },
                        content: {
                            value: content,
                        },
                    });

                    onCommentSuccess(deleted);
                } finally {
                    notifications.hide(notificationId);
                }
            },
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    };

    const handleCancel = () => {
        if (isEditing) {
            onCancelEditing();
            setIsEditing(false);
        } else {
            onCancel();
        }
    };

    return (
        <Paper
            withBorder
            radius={'md'}
            m={'md'}
            p={'md'}
            bg={isSelected ? 'blue' : undefined}
            onClick={onCommentClick}
            ref={draftCommentRef}
        >
            <Stack gap={'md'}>
                {!isDraft && role != 'STUDENT' && (
                    <Group justify="end">
                        <Menu>
                            <MenuTarget>
                                <ActionIcon>
                                    <IconDotsVertical />
                                </ActionIcon>
                            </MenuTarget>
                            <MenuDropdown>
                                <Menu.Item onClick={handleEdit}>Edit</Menu.Item>
                                <Menu.Item onClick={handleDelete}>Delete</Menu.Item>
                            </MenuDropdown>
                        </Menu>
                    </Group>
                )}
                <Text>"{comment.selectedText}"</Text>
                {(isDraft || isEditing) && (
                    <Textarea ref={textareaRef} value={value} onChange={event => setValue(event.target.value)} />
                )}
                {(isDraft || isEditing) && (
                    <Flex direction={'row'} justify={'end'} align={'center'} gap={'md'}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                            onClick={isEditing ? editComment : addComment}
                            disabled={value == '' || isPending}
                            loading={isPending}
                        >
                            {isError ? 'Retry' : 'Comment'}
                        </Button>
                    </Flex>
                )}
                {!isDraft && !isEditing && <Text>{comment.comment}</Text>}
            </Stack>
        </Paper>
    );
}

export default WritingCommentView;
