import {
  ActionIcon,
  Center,
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
import { useSearchParams } from "react-router";
import ReadingComposer from "./components/reading/reading_composer.view";

function ExerciseComposerView() {
  const [searchParams, setSearchParams] = useSearchParams();

  switch (searchParams.get("type")) {
    case "reading":
      return <ReadingComposer />;
    case "listening":
      return <>Listening</>;
    case "writing":
      return <>Writing</>;
    case "speaking":
      return <>Speaking</>;
    default:
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
                  onClick={() => setSearchParams("type=reading")}
                  size={128}
                >
                  <IconBook size={64} />
                </ActionIcon>
                <Text>Reading</Text>
              </Stack>
              <Stack justify="center" align="center">
                <ActionIcon
                  onClick={() => setSearchParams("type=listening")}
                  size={128}
                >
                  <IconEar size={64} />
                </ActionIcon>
                <Text>Listening</Text>
              </Stack>
              <Stack justify="center" align="center">
                <ActionIcon
                  onClick={() => setSearchParams("type=writing")}
                  size={128}
                >
                  <IconWriting size={64} />
                </ActionIcon>

                <Text>Writing</Text>
              </Stack>
              <Stack justify="center" align="center">
                <ActionIcon
                  onClick={() => setSearchParams("type=speaking")}
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
}

export default ExerciseComposerView;
