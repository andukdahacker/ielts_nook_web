import {
  Button,
  Center,
  Flex,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import {
  IconGripVertical,
  IconHeadphones,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useContext, useState } from "react";
import {
  ListeningExerciseType,
  ListeningMultipleChoiceTask,
} from "../../../../schema/types";
import TaskPlaceholder from "../common/task_placeholder.view";
import ListeningComposerContext from "./listening_composer.context";
import classes from "./listening_composer.module.css";
import ListeningMultipleChoice from "./listening_multiple_choice.view";

type ListeningTaskTag = {
  type: ListeningExerciseType;
  label: string;
};

const ListeningTaskTags: ListeningTaskTag[] = [
  {
    type: "Multiple choice",
    label: "Multiple choice",
  },
  {
    type: "True/False/Not Given",
    label: "True/False/Not Given",
  },
];

function ListeningComposer() {
  const { name, setName, tasks, addTask } = useContext(
    ListeningComposerContext,
  );

  const [isDragging, setIsDragging] = useState(false);

  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Stack>
        <Paper withBorder m={"1rem"}>
          <Flex direction={"column"}>
            <Group
              p={"xs"}
              h={"48px"}
              className={classes.header}
              align="center"
              justify="space-between"
            >
              <TextInput
                value={name}
                onChange={(event) => {
                  setName(event.currentTarget.value);
                }}
                size="xs"
              />
              <Button size="xs" variant="transparent" onClick={open}>
                Preview form
              </Button>
            </Group>
            <Flex
              direction={"row"}
              h={"calc(100vh - 2rem - 48px - 65px - 0.625rem)"}
            >
              <ScrollArea flex={1} className={classes.tagList}>
                <Stack p={"xs"}>
                  {ListeningTaskTags.map((e) => (
                    <Group
                      key={e.type}
                      className={classes.exerciseTag}
                      justify="space-between"
                      draggable
                      id={e.type}
                      onDragStart={(event) => {
                        event.dataTransfer.setData("text/plain", e.type);
                        event.dataTransfer.effectAllowed = "copyMove";
                        setIsDragging(true);
                      }}
                      onDragEnd={() => {
                        setIsDragging(false);
                      }}
                    >
                      <Text size="xs">{e.label}</Text>
                      <Center>
                        <IconGripVertical size={16} />
                      </Center>
                    </Group>
                  ))}
                </Stack>
              </ScrollArea>
              <Flex flex={4} direction={"column"}>
                <ScrollArea w={"100%"} h={"calc(100% - 48px)"}>
                  <Stack p={"lg"}>
                    <Dropzone onDrop={(files) => {}} accept={["audio/*"]}>
                      <Group
                        justify="center"
                        gap="xl"
                        mih={220}
                        style={{ pointerEvents: "none" }}
                      >
                        <Dropzone.Accept>
                          <IconUpload
                            size={52}
                            color="var(--mantine-color-blue-6)"
                            stroke={1.5}
                          />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                          <IconX
                            size={52}
                            color="var(--mantine-color-red-6)"
                            stroke={1.5}
                          />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                          <IconHeadphones
                            size={52}
                            color="var(--mantine-color-dimmed)"
                            stroke={1.5}
                          />
                        </Dropzone.Idle>

                        <div>
                          <Text size="xl" inline>
                            Drag images here or click to select files
                          </Text>
                          <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should
                            not exceed 5mb
                          </Text>
                        </div>
                      </Group>
                    </Dropzone>
                    <Stack>
                      {tasks.map((e, index) => {
                        switch (e.type) {
                          case "Multiple choice":
                            return (
                              <ListeningMultipleChoice
                                task={e as ListeningMultipleChoiceTask}
                                index={index}
                                key={index}
                              />
                            );
                          default:
                            return <Text key={index}>{e.type}</Text>;
                        }
                      })}
                    </Stack>

                    <TaskPlaceholder
                      isDragging={isDragging}
                      onDrop={(data: ListeningExerciseType) => addTask(data)}
                    />
                  </Stack>
                </ScrollArea>
                <Group
                  h={"48px"}
                  className={classes.composerFooter}
                  justify="end"
                  align="center"
                  p={"xs"}
                >
                  <Button size="xs" onClick={() => {}}>
                    Save changes
                  </Button>
                </Group>
              </Flex>
            </Flex>
          </Flex>
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        title={"Preview"}
        fullScreen={true}
      ></Modal>
    </>
  );
}

export default ListeningComposer;
