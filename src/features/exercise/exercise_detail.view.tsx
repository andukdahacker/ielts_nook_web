import { Center, Loader, Text } from "@mantine/core";
import { useParams } from "react-router";
import { ReadingExercise, ReadingExerciseType } from "../../schema/types";
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
      const type = data.subType.exerciseType;
      switch (type) {
        case "READING": {
          const subType = data.subType.name as ReadingExerciseType;

          switch (subType) {
            case "Multiple choice": {
              const content = data.exercise.content as ReadingExercise;
              return (
                <>
                  <Text>{content.title}</Text>
                  <Text>{content.content}</Text>
                </>
              );
            }

            case "True/False/Not Given":
              return <>True false</>;
            default:
              return <></>;
          }
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
