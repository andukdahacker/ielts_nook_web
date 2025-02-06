import { Stack } from "@mantine/core";
import { Allotment } from "allotment";
import { Exercise } from "../../../../schema/types";

interface ReadingTasksProps {
  exercise: Exercise;
}

function ReadingTasks({ exercise }: ReadingTasksProps) {
  return (
    <Stack>
      <Allotment>
        <Allotment.Pane>
          <div>content</div>
        </Allotment.Pane>
        <Allotment.Pane>
          <div>2</div>
        </Allotment.Pane>
      </Allotment>
    </Stack>
  );
}

export default ReadingTasks;
