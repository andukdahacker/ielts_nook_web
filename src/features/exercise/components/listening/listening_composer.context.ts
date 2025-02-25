import { createContext } from "react";
import {
  ListeningExercise,
  ListeningExerciseType,
  ListeningTask,
} from "../../../../schema/types";

interface ListeningComposerContextProps {
  name: string;
  setName: (value: string) => void;
  tasks: ListeningExercise["tasks"];
  addTask: (type: ListeningExerciseType) => void;
  removeTask: (index: number) => void;
  editTask<T extends ListeningTask>(index: number, task: T): void;
}

const ListeningComposerContext = createContext<ListeningComposerContextProps>({
  name: "",
  setName: () => {},
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  editTask: () => {},
});

export default ListeningComposerContext;
