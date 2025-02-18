import { Box, Center, Group, Radio, Stack, Text, Title } from "@mantine/core";
import { Link } from "@mantine/tiptap";
import TextAlign from "@tiptap/extension-text-align";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import {
  ReadingExercise,
  ReadingMultipleChoiceTask,
} from "../../../../schema/types";

interface ReadingPreviewerViewProps {
  title: string;
  content: Content;
  tasks: ReadingExercise["tasks"];
}

function ReadingPreviewerView({
  title,
  content,
  tasks,
}: ReadingPreviewerViewProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    editable: false,
  });

  return (
    <Box h={"100vh"}>
      <Allotment>
        <Allotment.Pane>
          <Stack>
            <Center>
              <Title order={3}>{title}</Title>
            </Center>
            <EditorContent editor={editor} />
          </Stack>
        </Allotment.Pane>
        <Allotment.Pane>
          <Stack>
            {tasks.map((e, i) => {
              switch (e.type) {
                case "Multiple choice": {
                  const task = e as ReadingMultipleChoiceTask;
                  return (
                    <Stack key={`task-${task.type}-${task.order}`}>
                      {task.questions.map((question) => (
                        <Stack key={`question-${question.order}`}>
                          <Group>
                            <Text>{question.order}</Text>
                            <Text>{question.content}</Text>
                          </Group>

                          <Radio.Group>
                            <Stack>
                              {question.options.map((option) => {
                                return (
                                  <Group key={option.value}>
                                    <Radio
                                      label={option.content}
                                      value={option.value}
                                    />
                                  </Group>
                                );
                              })}
                            </Stack>
                          </Radio.Group>
                        </Stack>
                      ))}
                    </Stack>
                  );
                }
                default: {
                  return <>Not yet</>;
                }
              }
            })}
          </Stack>
        </Allotment.Pane>
      </Allotment>
    </Box>
  );
}

export default ReadingPreviewerView;
