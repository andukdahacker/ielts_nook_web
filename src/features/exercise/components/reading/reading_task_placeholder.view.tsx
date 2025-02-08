import { Stack, Text } from "@mantine/core";
import { IconNewSection } from "@tabler/icons-react";
import { useContext } from "react";
import { ReadingExerciseType } from "../../../../schema/types";
import { ReadingComposerContext } from "./reading_composer.context";
import classes from "./reading_task_placeholder.module.css";

interface ReadingTaskPlaceholderProps {
  isDragging: boolean;
}

function ReadingTaskPlaceholder({ isDragging }: ReadingTaskPlaceholderProps) {
  const { addTask } = useContext(ReadingComposerContext);
  return (
    <>
      <Stack
        justify={"center"}
        align={"center"}
        className={classes.container}
        p={"lg"}
        id="dropzone"
        onDrop={(event) => {
          event.preventDefault();
          const data = event.dataTransfer.getData(
            "text/plain",
          ) as ReadingExerciseType;

          addTask(data);
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
        }}
      >
        <Text c="gray.5">
          {isDragging ? "Drop here" : "Drag and Drop here"}
        </Text>
        <IconNewSection />
      </Stack>
    </>
  );
}

export default ReadingTaskPlaceholder;
