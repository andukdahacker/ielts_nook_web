import { Center, Loader, Paper, Stack } from "@mantine/core";
import { Content } from "@tiptap/react";
import { Fragment } from "react/jsx-runtime";
import { Exercise, WritingExercise } from "../../../../schema/types";
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
    <Stack>
      <Paper withBorder p={"lg"} m={"lg"}>
        <WritingPreviewerView
          title={writingExercise.title as Content}
          type={writingExercise.type}
          name={exercise.name}
          duration={writingExercise.duration ?? 0}
          file={writingExercise.file}
        />
      </Paper>

      {status == "pending" ? (
        <Center>
          <Loader />
        </Center>
      ) : status == "error" ? (
        <Center>{error.message}</Center>
      ) : (
        <>
          <Stack>
            {data.assignments.map((e) => {
              return (
                <Fragment key={e.assignment.id}>{e.assignment.title}</Fragment>
              );
            })}
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default WritingExerciseDetailView;
