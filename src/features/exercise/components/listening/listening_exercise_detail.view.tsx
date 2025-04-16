import { Center, Loader, Paper, Space, Stack, Title } from "@mantine/core";
import { Exercise, ListeningExercise } from "../../../../schema/types";
import useGetAssignmentByExercise from "../../../assignment/hooks/use_get_assignment_by_exercise";
import ListeningPreviewerView from "./listening_previewer.view";
import { useRef } from "react";
import AssignmentsByExerciseTable from "../../../assignment/components/assignment_by_exercise_table.view";

interface ListeningExerciseDetailViewProps {
  exercise: Exercise;
}

function ListeningExerciseDetailView({
  exercise,
}: ListeningExerciseDetailViewProps) {
  const listeningExercise =
    exercise.content == "" ? null : (exercise.content as ListeningExercise);

  const { data, status, error } = useGetAssignmentByExercise(exercise.id);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <Stack p={"lg"}>
      <Title order={3}>Preview</Title>
      <Paper withBorder p={"lg"}>
        <ListeningPreviewerView
          tasks={listeningExercise?.tasks ?? []}
          file={listeningExercise?.file}
          audioRef={audioRef}
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
        <AssignmentsByExerciseTable data={data} />
      )}
    </Stack>
  );
}

export default ListeningExerciseDetailView;
