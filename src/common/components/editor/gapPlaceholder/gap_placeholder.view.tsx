import { Group } from '@mantine/core';
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import classes from './gap_placeholder.module.css';

function GapPlaceholderView({ editor, node, getPos }: NodeViewProps) {
    return (
        <NodeViewWrapper className={classes.gapPlaceholder}>
            <Group>
                <span contentEditable={false}>1</span>
                <NodeViewContent contentEditable={true} className={classes.content} />
            </Group>
        </NodeViewWrapper>
    );
}

export default GapPlaceholderView;
