import { Stack, Text } from "@mantine/core";
import { IconNewSection } from "@tabler/icons-react";
import classes from "./task_placeholder.module.css";

interface TaskPlaceholderProps<T> {
  isDragging: boolean;
  onDrop: (data: T) => void;
}

function TaskPlaceholder<T>({ isDragging, onDrop }: TaskPlaceholderProps<T>) {
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
          const data = event.dataTransfer.getData("text/plain") as T;

          onDrop(data);
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

export default TaskPlaceholder;
