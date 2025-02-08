import { PropsWithChildren, useState } from "react";
import {
  ReadingExercise,
  ReadingExerciseType,
  ReadingMultipleChoiceTask,
  ReadingTask,
  ReadingTFNGTask,
} from "../../../../schema/types";
import { ReadingComposerContext } from "./reading_composer.context";

function ReadingComposerProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<ReadingExercise["tasks"]>([]);

  const addTask = (type: ReadingExerciseType) => {
    switch (type) {
      case "Multiple choice": {
        const multipleChoiceTask = {
          order: 1,
          type: "Multiple choice",
          instructions: "",
          questions: [],
        } as ReadingMultipleChoiceTask;
        setTasks([...tasks, multipleChoiceTask]);
        break;
      }
      case "True/False/Not Given": {
        const task = {
          order: 1,
          type: "True/False/Not Given",
          instructions: "",
          questions: [],
        } as ReadingTFNGTask;
        setTasks([...tasks, task]);
        break;
      }
      default: {
        return;
      }
    }
  };

  const removeTask = (index: number) => {
    setTasks((tasks) => {
      const newArray = [...tasks];
      newArray.splice(index, 1);

      return newArray;
    });
  };

  function editTask<T extends ReadingTask>(index: number, task: T) {
    setTasks((tasks) => {
      const newArray = [...tasks];

      newArray[index] = task;

      return newArray;
    });
  }

  return (
    <ReadingComposerContext.Provider
      value={{ content: "", tasks, addTask, removeTask, editTask }}
    >
      {children}
    </ReadingComposerContext.Provider>
  );
}

export default ReadingComposerProvider;
