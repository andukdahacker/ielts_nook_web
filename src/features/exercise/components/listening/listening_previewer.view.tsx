import {
  Box,
  Button,
  Center,
  Group,
  Overlay,
  Radio,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import { MutableRefObject, useState } from "react";
import {
  ListeningExercise,
  ListeningMultipleChoiceTask,
} from "../../../../schema/types";

interface ListeningPreviewerViewProps {
  file?: ListeningExercise["file"];
  tasks: ListeningExercise["tasks"];
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

function ListeningPreviewerView({
  file,
  tasks,
  audioRef,
}: ListeningPreviewerViewProps) {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleClickPlay = () => {
    setShowOverlay(false);
    audioRef.current?.play();
  };

  return (
    <>
      <Box pos={"relative"}>
        {file && <audio src={file.url} ref={audioRef}></audio>}
        {showOverlay && (
          <Overlay color="black.5" backgroundOpacity={0.5}>
            <Center h={"100%"}>
              <Stack justify="center" align="center">
                <Text>
                  You will be listening to an audio clip during this test. You
                  will not be permitted to pause or rewind the audio while
                  answering the questions.
                </Text>
                <Text>To continue, click Play</Text>
                <Group>
                  <Button
                    leftSection={<IconPlayerPlay />}
                    onClick={handleClickPlay}
                  >
                    Play
                  </Button>
                </Group>
              </Stack>
            </Center>
          </Overlay>
        )}
        <ScrollArea h={"calc(100vh - 6rem)"}>
          <Stack p={"md"}>
            {tasks.map((e, taskIndex) => {
              switch (e.type) {
                case "Multiple choice": {
                  const task = e as ListeningMultipleChoiceTask;
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
      </Box>
    </>
  );
}

export default ListeningPreviewerView;
