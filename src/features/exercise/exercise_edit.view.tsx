import { Center, Loader } from "@mantine/core";
import { useParams } from "react-router";
import { ReadingExercise } from "../../schema/types";
import ReadingComposerEdit from "./components/reading/reading_compose_edit.view";
import ReadingComposerProvider from "./components/reading/reading_composer.provider";
import useGetExercise from "./hooks/use_get_exercise";

function ExerciseEditView() {
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
          const readingExercise = data.exercise.content as ReadingExercise;
          return (
            <ReadingComposerProvider
              exercise={data.exercise}
              readingExercise={readingExercise}
            >
              <ReadingComposerEdit />
            </ReadingComposerProvider>
          );
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

export default ExerciseEditView;
