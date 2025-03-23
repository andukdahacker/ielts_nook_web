import { Content } from "@tiptap/react";
import { PropsWithChildren, useState } from "react";
import {
  Exercise,
  WritingExercise,
  WritingExerciseType,
} from "../../../../schema/types";
import { WritingComposerContext } from "./writing_composer.context";

interface WritingComposerProviderProps {
  exercise?: Exercise;
  writingExercise?: WritingExercise;
}

function WritingComposerProvider({
  exercise,
  writingExercise,
  children,
}: PropsWithChildren<WritingComposerProviderProps>) {
  const [name, setName] = useState(exercise?.name ?? "");

  const [title, setTitle] = useState<Content>(writingExercise?.title ?? "");

  const [file, setFile] = useState<WritingExercise["file"] | undefined>(
    writingExercise?.file,
  );

  const [type, setType] = useState<WritingExerciseType>(
    writingExercise?.type ?? "Task 1",
  );

  const [duration, setDuration] = useState(writingExercise?.duration ?? 0);

  return (
    <WritingComposerContext.Provider
      value={{
        name,
        setName,
        title,
        setTitle,
        file,
        setFile,
        exercise,
        type,
        setType,
        duration,
        setDuration,
      }}
    >
      {children}
    </WritingComposerContext.Provider>
  );
}

export default WritingComposerProvider;
