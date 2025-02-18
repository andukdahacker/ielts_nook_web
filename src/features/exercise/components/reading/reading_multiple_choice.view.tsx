import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Radio,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { JSONContent, useEditor } from "@tiptap/react";
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
  const { removeTask, editTask } = useContext(ReadingComposerContext);

  const editInstruction = (value: JSONContent) => {
    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      instructions: value,
    });
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content:
      task.instructions != undefined ? (task.instructions as JSONContent) : "",
    onUpdate: ({ editor }) => {
      editInstruction(editor.getJSON());
    },
  });

  const addQuestion = () => {
    const order = task.questions.length + 1;
    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: [
        ...task.questions,
        {
          order,
          options: [],
          content: `Question ${order}`,
          correctAnswer: "Option A",
        },
      ],
    });
  };

  const editQuestionContent = (questionIndex: number, content: string) => {
    const newQuestions = [...task.questions];

    newQuestions[questionIndex].content = content;

    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: newQuestions,
    });
  };

  const removeQuestion = (questionIndex: number) => {
    const newQuestions = [...task.questions];

    newQuestions.splice(questionIndex, 1);

    const remappedOrder: typeof newQuestions = newQuestions.map((e, i) => {
      return {
        ...e,
        order: i + 1,
      };
    });

    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: remappedOrder,
    });
  };

  const onDragEndQuestion = (sourceIndex: number, destinationIndex: number) => {
    const newQuestions = [...task.questions];

    const temp = newQuestions[destinationIndex];

    newQuestions[destinationIndex] = newQuestions[sourceIndex];
    newQuestions[sourceIndex] = temp;

    const remappedOrder: typeof newQuestions = newQuestions.map((e, i) => {
      return {
        ...e,
        order: i + 1,
      };
    });

    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: remappedOrder,
    });
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...task.questions];

    const newOptions = [...newQuestions[questionIndex].options];

    newOptions.push({
      order: newOptions.length + 1,
      value: "",
      content: "",
    });

    newQuestions[questionIndex].options = newOptions;

    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: newQuestions,
    });
  };

  const editOptionContent = (
    questionIndex: number,
    optionIndex: number,
    content: string,
  ) => {
    const newQuestions = [...task.questions];

    const newOptions = [...newQuestions[questionIndex].options];

    newOptions[optionIndex].content = content;
    newOptions[optionIndex].value = content;

    newQuestions[questionIndex].options = newOptions;

    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: newQuestions,
    });
  };

  const markOptionCorrect = (questionIndex: number, value: string) => {
    const newQuestions = [...task.questions];

    newQuestions[questionIndex].correctAnswer = value;
    console.log(newQuestions);

    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: newQuestions,
    });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...task.questions];

    const options = [...newQuestions[questionIndex].options];

    const isCorrectAnswer =
      options[optionIndex].value == newQuestions[questionIndex].correctAnswer;

    options.splice(optionIndex, 1);

    const remappedOrder: typeof options = options.map((e, i) => {
      return {
        ...e,
        order: i + 1,
      };
    });

    newQuestions[questionIndex].options = remappedOrder;

    if (isCorrectAnswer) {
      newQuestions[questionIndex].correctAnswer = "";
    }

    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: newQuestions,
    });
  };

  const onDragEndOption = (
    questionIndex: number,
    sourceIndex: number,
    destinationIndex: number,
  ) => {
    const newQuestions = [...task.questions];

    const options = [...newQuestions[questionIndex].options];

    const temp = options[destinationIndex];

    options[destinationIndex] = options[sourceIndex];

    options[sourceIndex] = temp;

    const remappedOrder: typeof options = options.map((e, i) => {
      return {
        ...e,
        order: i + 1,
      };
    });

    newQuestions[questionIndex].options = remappedOrder;

    editTask<ReadingMultipleChoiceTask>(index, {
      ...task,
      questions: newQuestions,
    });
  };

  return (
    <Stack className={classes.container} p={"xs"}>
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
        <DragDropContext
          onDragEnd={(result) => {
            console.log("result", result);
            const source = result.source.index;
            const destination = result.destination?.index;

            if (destination != undefined) {
              onDragEndQuestion(source, destination);
            }
          }}
        >
          <Droppable droppableId={`task${index}question`}>
            {(provided) => (
              <Stack {...provided.droppableProps} ref={provided.innerRef}>
                {task.questions.map((question, questionIndex) => (
                  <Draggable
                    key={question.order}
                    index={questionIndex}
                    draggableId={`${question.order}`}
                  >
                    {(provided) => (
                      <Stack
                        key={questionIndex}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Group align="center">
                          <Center>
                            <Text>{questionIndex + 1}. </Text>
                          </Center>
                          <TextInput
                            flex={1}
                            value={question.content}
                            onChange={(event) => {
                              editQuestionContent(
                                questionIndex,
                                event.target.value,
                              );
                            }}
                          />

                          <ActionIcon
                            color="red"
                            onClick={() => removeQuestion(questionIndex)}
                          >
                            <IconTrash />
                          </ActionIcon>
                          <IconGripVertical />
                        </Group>
                        <Stack ml={"xl"} justify="center">
                          <DragDropContext
                            onDragEnd={(result) => {
                              const source = result.source.index;
                              const destination = result.destination?.index;

                              if (destination != undefined) {
                                onDragEndOption(
                                  questionIndex,
                                  source,
                                  destination,
                                );
                              }
                            }}
                          >
                            <Droppable
                              droppableId={`question${questionIndex}option`}
                            >
                              {(provided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  {question.options.map(
                                    (option, optionIndex) => (
                                      <Draggable
                                        key={option.order}
                                        draggableId={`${option.order}`}
                                        index={optionIndex}
                                      >
                                        {(provided) => (
                                          <Group
                                            key={optionIndex}
                                            mt={"lg"}
                                            justify="start"
                                            align="center"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <TextInput
                                              flex={1}
                                              value={option.content}
                                              onChange={(event) =>
                                                editOptionContent(
                                                  questionIndex,
                                                  optionIndex,
                                                  event.target.value,
                                                )
                                              }
                                            />
                                            <Radio
                                              checked={
                                                option.content ==
                                                  question.correctAnswer &&
                                                option.content != ""
                                              }
                                              onChange={(event) => {
                                                if (event.target.checked) {
                                                  markOptionCorrect(
                                                    questionIndex,
                                                    option.value,
                                                  );
                                                }
                                              }}
                                              label={"Correct answer"}
                                            />
                                            <ActionIcon
                                              color="red"
                                              onClick={() =>
                                                removeOption(
                                                  questionIndex,
                                                  optionIndex,
                                                )
                                              }
                                            >
                                              <IconTrash />
                                            </ActionIcon>
                                            <IconGripVertical />
                                          </Group>
                                        )}
                                      </Draggable>
                                    ),
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>

                          <Group>
                            <Button
                              onClick={() => {
                                addOption(questionIndex);
                              }}
                              leftSection={<IconPlus />}
                            >
                              Add option
                            </Button>
                          </Group>
                        </Stack>
                      </Stack>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>

      <Group>
        <Button onClick={() => addQuestion()} leftSection={<IconPlus />}>
          Add question
        </Button>
      </Group>
    </Stack>
  );
}

export default ReadingMultipleChoice;
