import { Content } from "@tiptap/react";
import { createContext } from "react";
import {
  Exercise,
  WritingExercise,
  WritingExerciseType,
} from "../../../../schema/types";

interface WritingComposerContextProps {
  exercise?: Exercise;
  type: WritingExerciseType;
  setType: (type: WritingExerciseType) => void;
  name: string;
  setName: (name: string) => void;
  title: Content;
  setTitle: (title: Content) => void;
  file?: WritingExercise["file"];
  setFile: (value: WritingExercise["file"] | undefined) => void;
  duration: number;
  setDuration: (value: number) => void;
}

export const WritingComposerContext =
  createContext<WritingComposerContextProps>({
    name: "",
    setName: () => {},
    title: "",
    setTitle: () => {},
    setFile: () => {},
    type: "Task 1",
    setType: () => {},
    duration: 0,
    setDuration: () => {},
  });
