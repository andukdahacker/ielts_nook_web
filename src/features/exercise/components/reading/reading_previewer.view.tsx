import {
  Box,
  Center,
  Group,
  Radio,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
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
    <Box h={"calc(100vh - 6rem)"}>
      <Allotment>
        <Allotment.Pane>
          <ScrollArea h={"calc(100vh - 6rem)"}>
            <Stack>
              <Center>
                <Title order={3}>{title}</Title>
              </Center>
              <Center>
                <EditorContent editor={editor} />
              </Center>
            </Stack>
          </ScrollArea>
        </Allotment.Pane>
        <Allotment.Pane>
          <ScrollArea h={"calc(100vh - 6rem)"}>
            <Stack p={"md"}>
              {tasks.map((e, taskIndex) => {
                switch (e.type) {
                  case "Multiple choice": {
                    const task = e as ReadingMultipleChoiceTask;

                    const questionBefore = () => {
                      const tasksBefore = tasks.slice(0, taskIndex);

                      let result = 0;

                      tasksBefore.forEach((task) => {
                        task.questions.forEach(() => {
                          result++;
                        });
                      });

                      return result;
                    };

                    return (
                      <Stack key={`task-${task.type}-${task.order}`}>
                        {task.questions.map((question) => (
                          <Stack
                            key={`task-${task.type}-question${question.order}`}
                          >
                            <Group>
                              <Text>{question.order + questionBefore()}</Text>
                              <Text>{question.content}</Text>
                            </Group>

                            <Radio.Group>
                              <Stack>
                                {question.options.map((option) => {
                                  return (
                                    <Group
                                      key={`task-${task.type}-question${question.order}-option${option.order}`}
                                    >
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
          </ScrollArea>
        </Allotment.Pane>
      </Allotment>
    </Box>
  );
}

export default ReadingPreviewerView;
