import {
  Button,
  Center,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconGripVertical } from "@tabler/icons-react";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classes from "./reading_composer.module.css";

function ReadingComposer() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
  });

  return (
    <Stack mah={"100vh"}>
      <Paper withBorder m={"1rem"}>
        <Flex direction={"column"}>
          <Group p={"xs"} h={"48px"} className={classes.header}>
            Header
          </Group>
          <Flex direction={"row"} h={"calc(100vh - 2rem - 48px)"}>
            <ScrollArea flex={1} className={classes.tagList}>
              <Stack p={"xs"}>
                <Group className={classes.exerciseTag} justify="space-between">
                  <Text>Multiple choice</Text>
                  <Center>
                    <IconGripVertical />
                  </Center>
                </Group>
                <Group className={classes.exerciseTag} justify="space-between">
                  <Text>Multiple choice</Text>
                  <Center>
                    <IconGripVertical />
                  </Center>
                </Group>
              </Stack>
            </ScrollArea>
            <Flex flex={4} bg={"red"} direction={"column"}>
              <ScrollArea w={"100%"} h={"calc(100% - 48px)"}>
                <Stack p={"lg"}>
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
                    </RichTextEditor.Toolbar>
                    <RichTextEditor.Content />
                  </RichTextEditor>
                </Stack>
              </ScrollArea>
              <Group h={"48px"} bg={"blue"}>
                <Button>Save changes</Button>
              </Group>
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Stack>
  );
}

export default ReadingComposer;
