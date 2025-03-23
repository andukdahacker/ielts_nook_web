import { Center, Loader } from "@mantine/core";
import { useParams } from "react-router";
import {
  ListeningExercise,
  ReadingExercise,
  WritingExercise,
} from "../../schema/types";
import ListeningComposerProvider from "./components/listening/listening_composer.provider";
import ListeningComposerEdit from "./components/listening/listening_composer_edit.view";
import ReadingComposerEdit from "./components/reading/reading_compose_edit.view";
import ReadingComposerProvider from "./components/reading/reading_composer.provider";
import WritingComposerProvider from "./components/writing/writing_composer.provider";
import WritingComposerEditView from "./components/writing/writing_composer_edit.view";
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
        case "LISTENING": {
          const listeningExercise = data.exercise.content as ListeningExercise;

          return (
            <ListeningComposerProvider
              exercise={data.exercise}
              listeningExercise={listeningExercise}
            >
              <ListeningComposerEdit />
            </ListeningComposerProvider>
          );
        }
        case "WRITING": {
          const writingExercise = data.exercise.content as WritingExercise;

          return (
            <WritingComposerProvider
              writingExercise={writingExercise}
              exercise={data.exercise}
            >
              <WritingComposerEditView />
            </WritingComposerProvider>
          );
        }
        case "SPEAKING":
        default:
          return <>{data.exercise.name}</>;
      }
    }
  }
}

export default ExerciseEditView;
