import { Box, Center, Image, ScrollArea, Stack } from '@mantine/core';
import { Link } from '@mantine/tiptap';
import TextAlign from '@tiptap/extension-text-align';
import { Content, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { WritingExercise } from '../../../../schema/types';

interface WritingPreviewerViewProps {
    name: string;
    duration: number;
    title: Content;
    file?: WritingExercise['file'];
    type: WritingExercise['type'];
}

function WritingPreviewerView({ title, file, type }: WritingPreviewerViewProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: title,
        editable: false,
    });

    return (
        <>
            <Box h={'calc(100vh - 6rem)'}>
                <Allotment>
                    <Allotment.Pane>
                        <ScrollArea h={'calc(100vh - 6rem)'}>
                            <Stack>
                                <Center>
                                    <EditorContent editor={editor} />
                                </Center>
                                {file && type == 'Task 1' && <Image src={file.url} />}
                            </Stack>
                        </ScrollArea>
                    </Allotment.Pane>
                    <Allotment.Pane>
                        <Box p={'md'} h={'100%'}>
                            <textarea style={{ height: '100%', width: '100%', resize: 'none' }} />
                        </Box>
                    </Allotment.Pane>
                </Allotment>
            </Box>
        </>
    );
}

export default WritingPreviewerView;
