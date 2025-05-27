import { Plugin, PluginKey } from 'prosemirror-state';

export const CommentClickPlugin = (onCommentClick: (id: string) => void) =>
    new Plugin({
        key: new PluginKey('comment-click'),
        props: {
            handleDOMEvents: {
                mousedown(view, event) {
                    const target = event.target as HTMLElement;

                    const commentId = target?.dataset?.commentId;
                    if (commentId) {
                        onCommentClick(commentId);
                        return true; // prevent default click behavior
                    }
                    return false;
                },
            },
        },
    });
