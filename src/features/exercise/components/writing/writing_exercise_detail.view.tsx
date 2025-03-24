import { Center, Loader, Paper, Space, Stack, Title } from "@mantine/core";
import { Content } from "@tiptap/react";
import { Exercise, WritingExercise } from "../../../../schema/types";
import AssignmentsByExerciseTable from "../../../assignment/components/assignment_by_exercise_table.view";
import useGetAssignmentByExercise from "../../../assignment/hooks/use_get_assignment_by_exercise";
import WritingPreviewerView from "./writing_previewer.view";

interface WritingExerciseDetailViewProps {
  exercise: Exercise;
}

function WritingExerciseDetailView({
  exercise,
}: WritingExerciseDetailViewProps) {
  const writingExercise = exercise.content as WritingExercise;

  const { data, status, error } = useGetAssignmentByExercise(exercise.id);

  return (
    <Stack p={"lg"}>
      <Title order={3}>Preview</Title>
      <Paper withBorder p={"lg"}>
        <WritingPreviewerView
          title={writingExercise.title as Content}
          type={writingExercise.type}
          name={exercise.name}
          duration={writingExercise.duration ?? 0}
          file={writingExercise.file}
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

export default WritingExerciseDetailView;
