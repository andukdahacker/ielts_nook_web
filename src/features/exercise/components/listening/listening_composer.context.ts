import { createContext } from "react";
import {
  Exercise,
  ListeningExercise,
  ListeningExerciseType,
  ListeningTask,
} from "../../../../schema/types";

interface ListeningComposerContextProps {
  name: string;
  setName: (value: string) => void;
  file?: ListeningExercise["file"];
  setFile: (value: ListeningExercise["file"] | undefined) => void;
  tasks: ListeningExercise["tasks"];
  addTask: (type: ListeningExerciseType) => void;
  removeTask: (index: number) => void;
  editTask<T extends ListeningTask>(index: number, task: T): void;
  exercise?: Exercise;
}

const ListeningComposerContext = createContext<ListeningComposerContextProps>({
  name: "",
  setName: () => {},
  setFile: () => {},
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  editTask: () => {},
});

export default ListeningComposerContext;
