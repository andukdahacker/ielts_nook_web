import { Mark, mergeAttributes } from '@tiptap/core';

export interface CommentOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        comment: {
            addComment: (id: string) => ReturnType;
            removeComment: () => ReturnType;
        };
    }
}

export const Comment = Mark.create<CommentOptions>({
    name: 'comment',
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    addAttributes() {
        return {
            id: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'span[data-comment-id]',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(HTMLAttributes, {
                'data-comment-id': HTMLAttributes.id,
                class: 'comment-highlight',
            }),
            0,
        ];
    },
    addCommands() {
        return {
            addComment:
                id =>
                ({ commands }) =>
                    commands.setMark(this.name, { id }),

            removeComment:
                () =>
                ({ commands }) =>
                    commands.unsetMark(this.name),
        };
    },
});
