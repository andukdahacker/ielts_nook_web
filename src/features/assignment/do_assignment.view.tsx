import { Center, Loader } from "@mantine/core";
import { useParams } from "react-router";
import WritingExerciseAssignmentView from "../exercise/components/writing/writing_exercise_assignment.view";
import useGetAssignment from "./hooks/use_get_assignment";

function DoAssignmentView() {
  const { id } = useParams();

  const { data, status, error } = useGetAssignment(id as string);

  if (status == "pending")
    return (
      <Center>
        <Loader />
      </Center>
    );
  if (status == "error") return <Center>{error.message}</Center>;

  switch (data.exercise.type) {
    case "WRITING": {
      return (
        <>
          <WritingExerciseAssignmentView
            exercise={data.exercise}
            assignment={data.assignment}
          />
        </>
      );
    }
    case "LISTENING":
    case "READING":
    case "SPEAKING":
      return <>{data.exercise.type}</>;
  }
}

export default DoAssignmentView;
