import { Center, Loader } from "@mantine/core";
import { useParams } from "react-router";
import ReadingTasks from "./components/reading/reading_tasks.layout";
import useGetExercise from "./hooks/use_get_exercise";

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
          return <ReadingTasks exercise={data.exercise} />;
        }
        case "LISTENING":
        case "SPEAKING":
        case "WRITING":
        default:
          return <>{data.exercise.name}</>;
      }
    }
  }
}

export default ExerciseDetailView;
