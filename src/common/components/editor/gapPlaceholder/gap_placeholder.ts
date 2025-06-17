import { mergeAttributes, Node } from '@tiptap/core';
import { Selection } from '@tiptap/pm/state';
import { ReactNodeViewRenderer } from '@tiptap/react';
import GapPlaceholderView from './gap_placeholder.view';
export const GapPlaceholderNode = Node.create({
    name: 'gapPlaceholder',
    inline: true,
    group: 'inline',
    content: 'inline*',
    addAttributes() {
        return {
            index: {
                default: 0,
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'gap-placeholder',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['gap-placeholder', mergeAttributes(HTMLAttributes), 0];
    },
    addKeyboardShortcuts() {
        return {
            'Mod-Enter': ({ editor }) => {
                const state = editor.state;
                const { selection, doc } = state;
                const { $from } = selection;

                const parentNode = $from.node($from.depth);
                if (parentNode.type.name !== 'gapPlaceholder') {
                    return false;
                }

                const posAfter = $from.after($from.depth);
                const nextSelection = Selection.near(doc.resolve(posAfter), 1);

                const transaction = state.tr.setSelection(nextSelection);
                editor.view.dispatch(transaction);
                editor.view.focus();
                return true;
            },
        };
    },
    addNodeView() {
        return ReactNodeViewRenderer(GapPlaceholderView);
    },
});
