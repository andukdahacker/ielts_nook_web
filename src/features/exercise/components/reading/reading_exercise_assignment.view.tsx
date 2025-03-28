import {
  Box,
  ScrollArea,
  Stack,
  Center,
  Title,
  Group,
  Radio,
  Text,
  ActionIcon,
  Flex,
} from "@mantine/core";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Allotment } from "allotment";
import {
  Assignment,
  Exercise,
  ReadingExercise,
  ReadingMultipleChoiceTask,
  ReadingSubmissionContent,
} from "../../../../schema/types";
import Link from "@tiptap/extension-link";
import { IconCheck } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import useCreateSubmission from "../../../submission/hooks/use_create_submission";
import { notifications } from "@mantine/notifications";

interface ReadingExerciseAssignmentViewProps {
  exercise: Exercise;
  assignment: Assignment;
}

function ReadingExerciseAssignmentView({
  exercise,
  assignment,
}: ReadingExerciseAssignmentViewProps) {
  const readingExercise = exercise.content as ReadingExercise;
  const tasks = readingExercise.tasks;
  const title = readingExercise.title;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: readingExercise.content as Content,
    editable: false,
  });

  const form = useForm<ReadingSubmissionContent>({
    mode: "uncontrolled",
  });

  useEffect(() => {
    form.setInitialValues({
      tasks: tasks.map((task) => {
        return {
          order: task.order,
          questions: task.questions.map((question) => {
            return {
              order: question.order,
              answer: null,
            };
          }),
        };
      }),
    });
  });

  const { mutateAsync } = useCreateSubmission();

  const handleSubmit = async (values: ReadingSubmissionContent) => {
    const id = notifications.show({
      message: "Submitting...",
      autoClose: false,
    });

    try {
      await mutateAsync({
        assignmentId: assignment.id,
        content: values,
      });
    } finally {
      notifications.hide(id);
    }
  };

  return (
    <Box h={"calc(100vh - 65px - 65px)"}>
      <Allotment>
        <Allotment.Pane>
          <ScrollArea h={"calc(100vh - 65px - 65px)"}>
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
          <ScrollArea h={"100%"}>
            <Stack p={"md"}>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
                          {task.questions.map((question, questionIndex) => (
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
                                          onChange={() => {
                                            const currentValues = [
                                              ...form.getValues().tasks,
                                            ];

                                            const targetTask =
                                              currentValues[taskIndex];

                                            const targetQuestion =
                                              targetTask.questions[
                                                questionIndex
                                              ];

                                            targetQuestion.answer =
                                              option.value;
                                            form.setFieldValue(
                                              "tasks",
                                              currentValues,
                                            );
                                          }}
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
              </form>
            </Stack>
          </ScrollArea>
        </Allotment.Pane>
      </Allotment>
      <Flex h={"65px"} direction={"row"} justify={"end"} align={"center"}>
        <ActionIcon size={"xl"} type="submit">
          <IconCheck />
        </ActionIcon>
      </Flex>
    </Box>
  );
}

export default ReadingExerciseAssignmentView;
