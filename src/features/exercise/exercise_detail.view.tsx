import { Center, Loader, Stack, Title } from "@mantine/core";
import { useParams } from "react-router";
import WritingExerciseDetailView from "./components/writing/writing_exercise_detail.view";
import useGetExercise from "./hooks/use_get_exercise";
import ReadingExerciseDetailView from "./components/reading/reading_exercise_detail.view";

function ExerciseDetailView() {
  const { id } = useParams();

  const { data, status, error } = useGetExercise(id!);

  switch (status) {
    case "pending":
      return (
        <Center>
          <Loader />
        </Center>
      );
    case "error":
      return <Center>{error.message}</Center>;
    case "success": {
      const type = data.exercise.type;
      switch (type) {
        case "READING": {
          return (
            <Stack p={"md"}>
              <Title order={1}>{data.exercise.name}</Title>
              <ReadingExerciseDetailView exercise={data.exercise} />
            </Stack>
          );
        }
        case "LISTENING": {
          return <></>;
        }
        case "SPEAKING": {
          return <></>;
        }
        case "WRITING": {
          return (
            <Stack p={"md"}>
              <Title order={1}>{data.exercise.name}</Title>
              <WritingExerciseDetailView exercise={data.exercise} />
            </Stack>
          );
        }
        default:
          return <>{data.exercise.name}</>;
      }
    }
  }
}

export default ExerciseDetailView;
