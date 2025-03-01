import { components } from "./schema";

export type UserRole = components["schemas"]["UserRole"];
export type Center = components["schemas"]["Center"];
export type User = components["schemas"]["User"];
export type Class = components["schemas"]["Class"];
export type Exercise = components["schemas"]["Exercise"];
export type ExerciseType = components["schemas"]["ExerciseType"];

export type ReadingExercise = components["schemas"]["ReadingExercise"];
export type ReadingExerciseType = ReadingExercise["tasks"][0]["type"];
export type ReadingMultipleChoiceTask =
  components["schemas"]["ReadingMultipleChoiceTask"];
export type ReadingTFNGTask = components["schemas"]["ReadingTFNGTaskSchema"];
export type ReadingTask = ReadingMultipleChoiceTask | ReadingTFNGTask;

export type ListeningExercise = components["schemas"]["ListeningExercise"];
export type ListeningExerciseType = ListeningExercise["tasks"][0]["type"];
export type ListeningMultipleChoiceTask =
  components["schemas"]["ListeningMultipleChoiceTask"];
export type ListeningTask = ListeningMultipleChoiceTask;

export type RegisterCenterInput = components["schemas"]["RegisterCenterInput"];
export type GetCenterClassListInput =
  components["schemas"]["GetClassListInput"];
export type UpdateClassInput = components["schemas"]["UpdateClassInput"];
export type GetExerciseListInput =
  components["schemas"]["GetExerciseListInput"];
export type CreateExerciseInput = components["schemas"]["CreateExerciseInput"];
export type UpdateExerciseInput = components["schemas"]["UpdateExerciseInput"];
export type UploadListeningFileInput =
  components["schemas"]["UploadListeningFileInput"];
export type DeleteListeningFileInput =
  components["schemas"]["DeleteListeningFileInput"];

export type CreateExerciseResponse =
  components["schemas"]["CreateExerciseResponseSchema"];
