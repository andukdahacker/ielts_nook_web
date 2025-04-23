import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const CommentHighlightPlugin = (id: string) =>
    new Plugin({
        key: new PluginKey('comment-highlight'),
        state: {
            init: () => DecorationSet.empty,
            apply(tr) {
                console.log('id', id);
                const decos: Decoration[] = [];

                tr.doc.descendants((node, pos) => {
                    if (!node.isText) {
                        node.content?.forEach(child => {
                            if (!child.isText) return;

                            const commentMark = child.marks.find(
                                mark => mark.type.name == 'comment' && mark.attrs.id == id,
                            );

                            if (commentMark) {
                                decos.push(
                                    Decoration.inline(pos, pos + (node.text?.length ?? 0) + 1, {
                                        class: 'comment-highlight-active',
                                    }),
                                );
                            }
                        });

                        return;
                    }

                    const commentMark = node.marks.find(mark => mark.type.name === 'comment' && mark.attrs.id === id);

                    if (commentMark) {
                        decos.push(
                            Decoration.inline(pos, pos + node.text!.length, {
                                class: 'comment-highlight-active',
                            }),
                        );
                    }
                });

                return DecorationSet.create(tr.doc, decos);
            },
        },
        props: {
            decorations(state) {
                return this.getState(state);
            },
        },
    });
