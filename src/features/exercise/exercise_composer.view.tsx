import {
  ActionIcon,
  Center,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBook,
  IconEar,
  IconMessage,
  IconWriting,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import useCreateExercise from "./hooks/use_create_exercise";
import {
  ListeningExercise,
  ReadingExercise,
  WritingExercise,
} from "../../schema/types";

function ExerciseComposerView() {
  const navigate = useNavigate();

  const { mutate, status } = useCreateExercise({
    onSuccess: (data) => {
      navigate(`/exercise/${data.exercise.id}/edit`);
    },
  });

  if (status == "pending")
    return (
      <Center>
        <Loader />
      </Center>
    );

  return (
    <Center h={"100vh"}>
      <Stack justify="center" align="center">
        <Title order={1}>Exercise Composer</Title>
        <Title order={4} mt={"lg"}>
          Please pick a skill
        </Title>
        <SimpleGrid cols={2} mt={"lg"}>
          <Stack justify="center" align="center">
            <ActionIcon
              onClick={() => {
                mutate({
                  name: "Untitled exercise",
                  content: {
                    content: "",
                    tasks: [],
                    title: "",
                  } as ReadingExercise,
                  type: "READING",
                });
              }}
              size={128}
            >
              <IconBook size={64} />
            </ActionIcon>
            <Text>Reading</Text>
          </Stack>
          <Stack justify="center" align="center">
            <ActionIcon
              onClick={() => {
                mutate({
                  name: "Untitled exercise",
                  content: {
                    tasks: [],
                  } as ListeningExercise,
                  type: "LISTENING",
                });
              }}
              size={128}
            >
              <IconEar size={64} />
            </ActionIcon>
            <Text>Listening</Text>
          </Stack>
          <Stack justify="center" align="center">
            <ActionIcon
              onClick={() => {
                mutate({
                  name: "Untitled exercise",
                  content: {
                    duration: 0,
                    type: "Task 1",
                  } as WritingExercise,
                  type: "WRITING",
                });
              }}
              size={128}
            >
              <IconWriting size={64} />
            </ActionIcon>

            <Text>Writing</Text>
          </Stack>
          <Stack justify="center" align="center">
            <ActionIcon
              onClick={() => {
                mutate({
                  name: "Untitled exercise",
                  content: "",
                  type: "SPEAKING",
                });
              }}
              size={128}
            >
              <IconMessage size={64} />
            </ActionIcon>

            <Text>Speaking</Text>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Center>
  );
}

export default ExerciseComposerView;
