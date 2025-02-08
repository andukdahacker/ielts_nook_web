import { createContext } from "react";
import {
  ReadingExercise,
  ReadingExerciseType,
  ReadingTask,
} from "../../../../schema/types";

interface ReadingComposerContextProps {
  content: string;
  tasks: ReadingExercise["tasks"];
  addTask: (type: ReadingExerciseType) => void;
  removeTask: (index: number) => void;
  editTask<T extends ReadingTask>(index: number, task: T): void;
}

export const ReadingComposerContext =
  createContext<ReadingComposerContextProps>({
    content: "",
    tasks: [],
    addTask: () => {},
    removeTask: () => {},
    editTask: () => {},
  });
