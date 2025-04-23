import { Plugin, PluginKey } from 'prosemirror-state';

export const CommentClickPlugin = (onCommentClick: (id: string) => void) =>
    new Plugin({
        key: new PluginKey('comment-click'),

        props: {
            handleClick(view, pos, event) {
                const target = event.target as HTMLElement;
                console.log('target', target);
                const commentId = target?.dataset?.commentId;
                if (commentId) {
                    onCommentClick(commentId);
                    return true; // prevent default click behavior
                }
                return false;
            },
        },
    });
