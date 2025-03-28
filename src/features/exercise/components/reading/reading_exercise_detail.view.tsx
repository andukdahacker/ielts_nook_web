import { Stack, Title, Paper, Space, Center, Loader } from "@mantine/core";
import AssignmentsByExerciseTable from "../../../assignment/components/assignment_by_exercise_table.view";
import ReadingPreviewerView from "./reading_previewer.view";
import { Exercise, ReadingExercise } from "../../../../schema/types";
import useGetAssignmentByExercise from "../../../assignment/hooks/use_get_assignment_by_exercise";

interface ReadingExerciseDetailViewProps {
  exercise: Exercise;
}

function ReadingExerciseDetailView({
  exercise,
}: ReadingExerciseDetailViewProps) {
  const readingExercise =
    exercise.content == "" ? null : (exercise.content as ReadingExercise);

  const { data, status, error } = useGetAssignmentByExercise(exercise.id);

  return (
    <Stack p={"lg"}>
      <Title order={3}>Preview</Title>
      <Paper withBorder p={"lg"}>
        <ReadingPreviewerView
          title={readingExercise?.title ?? ""}
          content={readingExercise?.content ?? ""}
          tasks={readingExercise?.tasks ?? []}
        />
      </Paper>

      <Space h={"md"} />
      {status == "pending" ? (
        <Center>
          <Loader />
        </Center>
      ) : status == "error" ? (
        <Center>{error.message}</Center>
      ) : (
        <>
          <AssignmentsByExerciseTable data={data} />
        </>
      )}
    </Stack>
  );
}

export default ReadingExerciseDetailView;
