import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext } from "react";
import EditorInput from "../../../../common/components/editor/editor";
import { ReadingMultipleChoiceTask } from "../../../../schema/types";
import { ReadingComposerContext } from "./reading_composer.context";
import classes from "./reading_multiple_choice.module.css";

interface ReadingMultipleChoiceProps {
  index: number;
  task: ReadingMultipleChoiceTask;
}

function ReadingMultipleChoice({ task, index }: ReadingMultipleChoiceProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "Choose the appropriate letters A, B, C or D",
  });

  const { removeTask, editTask } = useContext(ReadingComposerContext);

  const addQuestion = () => {
    const order = task.questions.length + 1;
    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: [
        ...task.questions,
        {
          order,
          options: [
            { order: 1, value: "A", content: "Option A" },
            { order: 2, value: "B", content: "Option B" },
            { order: 3, value: "C", content: "Option C" },
            { order: 4, value: "D", content: "Option D" },
          ],
          content: `Question ${order}`,
          correctAnswer: "A",
        },
      ],
    });
  };

  return (
    <Stack className={classes.container} p={"xs"} draggable>
      <Group justify="space-between">
        <Text>Type: Multiple Choice</Text>
        <Group>
          <ActionIcon
            variant="filled"
            color="red"
            onClick={() => removeTask(index)}
          >
            <IconTrash />
          </ActionIcon>
          <IconGripVertical />
        </Group>
      </Group>
      <EditorInput editor={editor} label="Instructions" />
      <Stack>
        {task.questions.map((question, index) => (
          <Box key={index}>
            <Group justify="start" align="start">
              <Text>{index + 1}. </Text>
              <TextInput label="Question" withAsterisk />
              <TextInput label="Correct answer" withAsterisk />
            </Group>
            <Stack>
              {question.options.map((option, index) => (
                <Group
                  key={index}
                  ml={"lg"}
                  mt={"lg"}
                  justify="start"
                  align="start"
                >
                  <Text>{option.value}. </Text>
                  <TextInput label="Option" withAsterisk />
                </Group>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Button onClick={() => addQuestion()}>Add question</Button>
    </Stack>
  );
}

export default ReadingMultipleChoice;
