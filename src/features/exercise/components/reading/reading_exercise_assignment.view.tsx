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
  Submission,
} from "../../../../schema/types";
import Link from "@tiptap/extension-link";
import { IconCheck } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import useCreateSubmission from "../../../submission/hooks/use_create_submission";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";

interface ReadingExerciseAssignmentViewProps {
  exercise: Exercise;
  assignment: Assignment;
  submission: Submission | null;
}

function ReadingExerciseAssignmentView({
  exercise,
  assignment,
  submission,
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
    form.setValues({
      tasks: tasks.map((task, taskIndex) => {
        return {
          order: task.order,
          questions: task.questions.map((question, questionIndex) => {
            if (submission) {
              const submissionContent =
                submission.content as ReadingSubmissionContent;

              const answer =
                submissionContent.tasks[taskIndex].questions[questionIndex]
                  .answer;

              return {
                order: question.order,
                answer,
              };
            }
            return {
              order: question.order,
              answer: null,
            };
          }),
        };
      }),
    });
  }, []);

  const navigate = useNavigate();

  const { mutateAsync } = useCreateSubmission({
    onSuccess: () => {
      navigate("/assignment");
    },
  });

  const handleSubmit = async (values: ReadingSubmissionContent) => {
    if (submission) return;

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
      <form
        style={{ height: "100%" }}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
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
                          {task.questions.map((question, questionIndex) => {
                            const submissionContent =
                              submission?.content as ReadingSubmissionContent | null;

                            const answer =
                              submissionContent?.tasks[taskIndex].questions[
                                questionIndex
                              ].answer;

                            return (
                              <Stack
                                key={`task-${task.type}-question${question.order}`}
                              >
                                <Group>
                                  <Text>
                                    {question.order + questionBefore()}
                                  </Text>
                                  <Text>{question.content}</Text>
                                </Group>

                                <Radio.Group value={answer}>
                                  <Stack>
                                    {question.options.map((option) => {
                                      if (submission) {
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
                                      }

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
                            );
                          })}
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
        <Flex h={"65px"} direction={"row"} justify={"end"} align={"center"}>
          {!submission && (
            <ActionIcon size={"xl"} type="submit">
              <IconCheck />
            </ActionIcon>
          )}
        </Flex>
      </form>
    </Box>
  );
}

export default ReadingExerciseAssignmentView;
