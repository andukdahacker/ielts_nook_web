import { Button, Flex, Text } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { TextSelection } from '@tiptap/pm/state';
import { Editor } from '@tiptap/react';

interface EditorProps {
    editor: Editor | null;
    label?: string;
}

function EditorInput({ editor, label }: EditorProps) {
    return (
        <>
            <Flex direction={'column'}>
                {label && (
                    <Text size="sm" fw={500} lh={'xs'}>
                        {label}
                    </Text>
                )}
                <RichTextEditor editor={editor} variant="subtle">
                    <RichTextEditor.Toolbar>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Blockquote />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.H1 />
                            <RichTextEditor.H2 />
                            <RichTextEditor.H3 />
                            <RichTextEditor.H4 />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.AlignLeft />
                            <RichTextEditor.AlignCenter />
                            <RichTextEditor.AlignJustify />
                            <RichTextEditor.AlignRight />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Undo />
                            <RichTextEditor.Redo />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <Button
                                onClick={() => {
                                    if (!editor) return;
                                    const insertPos = editor.state.selection.head;
                                    const placeholderText = 'Type your answer here';
                                    editor
                                        .chain()
                                        .focus()
                                        .insertContentAt(editor.state.selection.head, {
                                            type: 'gapPlaceholder',
                                            content: [{ type: 'text', text: placeholderText }],
                                        })
                                        .focus()
                                        .run();
                                    const insidePos = insertPos + 1 + placeholderText.length;
                                    const tr = editor.state.tr.setSelection(
                                        TextSelection.create(editor.state.doc, insidePos),
                                    );
                                    editor.view.dispatch(tr);
                                    editor.view.focus();
                                }}
                            >
                                Add gap
                            </Button>
                        </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>
                    <RichTextEditor.Content />
                </RichTextEditor>
            </Flex>
        </>
    );
}

export default EditorInput;
