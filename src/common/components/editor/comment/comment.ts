import { Mark, mergeAttributes } from '@tiptap/core';

export interface CommentOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        comment: {
            addComment: (id: string) => ReturnType;
            removeComment: (id: string) => ReturnType;
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
                (id: string) =>
                ({ tr, state, dispatch }) => {
                    const { doc, selection } = state;

                    const { from, to } = selection;

                    const markType = state.schema.marks.comment;

                    if (!markType) return false;

                    let hasChanged = false;

                    doc.nodesBetween(from, to, (node, pos) => {
                        if (!node.isText) {
                            node.content?.forEach((child, childOffset) => {
                                if (!child.isText) return;

                                const commentMark = child.marks.find(
                                    mark => mark.type === markType && mark.attrs.id === id,
                                );

                                if (commentMark) {
                                    hasChanged = true;
                                    const fromPos = pos + childOffset;
                                    const toPos = fromPos + (child.text?.length ?? 0) + 1;
                                    tr.removeMark(fromPos, toPos, markType);
                                }
                            });
                        } else if (node.isText) {
                            const marks = node.marks.filter(mark => !(mark.type === markType && mark.attrs.id == id));

                            if (marks.length !== node.marks.length) {
                                hasChanged = true;

                                tr.removeMark(pos, pos + node.nodeSize, markType);
                            }
                        }
                    });

                    if (hasChanged && dispatch) {
                        dispatch(tr);
                    }

                    return hasChanged;
                },
        };
    },
});
