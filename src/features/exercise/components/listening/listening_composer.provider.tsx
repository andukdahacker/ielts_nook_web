import { PropsWithChildren, useState } from "react";
import {
  Exercise,
  ListeningExercise,
  ListeningExerciseType,
  ListeningMultipleChoiceTask,
  ListeningTask,
} from "../../../../schema/types";
import ListeningComposerContext from "./listening_composer.context";

interface ListeningComposerProviderProps {
  exercise?: Exercise;
  listeningExercise?: ListeningExercise;
}

function ListeningComposerProvider({
  children,
  exercise,
  listeningExercise,
}: PropsWithChildren<ListeningComposerProviderProps>) {
  const [name, setName] = useState(exercise?.name ?? "");

  const [file, setFile] = useState(listeningExercise?.file);

  const [tasks, setTasks] = useState<ListeningExercise["tasks"]>(
    listeningExercise?.tasks ?? [],
  );

  const addTask = (type: ListeningExerciseType) => {
    switch (type) {
      case "Multiple choice": {
        const multipleChoiceTask = {
          order: 1,
          type: "Multiple choice",
          instructions: "",
          questions: [],
        } as ListeningMultipleChoiceTask;
        setTasks([...tasks, multipleChoiceTask]);
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

      const remappedOrder: typeof newArray = newArray.map((e, i) => {
        return {
          ...e,
          order: i + 1,
        };
      });

      return remappedOrder;
    });
  };

  function editTask<T extends ListeningTask>(index: number, task: T) {
    setTasks((tasks) => {
      const newArray = [...tasks];

      newArray[index] = task;
      const remappedOrder: typeof newArray = newArray.map((e, i) => {
        return {
          ...e,
          order: i + 1,
        };
      });
      return remappedOrder;
    });
  }

  return (
    <ListeningComposerContext.Provider
      value={{
        name,
        setName,
        file,
        setFile,
        tasks,
        addTask,
        removeTask,
        editTask,
        exercise,
      }}
    >
      {children}
    </ListeningComposerContext.Provider>
  );
}

export default ListeningComposerProvider;
