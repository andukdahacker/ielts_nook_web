import { components } from "./schema";

export type UserRole = components["schemas"]["UserRole"];
export type Center = components["schemas"]["Center"];
export type User = components["schemas"]["User"];
export type Class = components["schemas"]["Class"];
export type Exercise = components["schemas"]["Exercise"];

export type ReadingExercise = components["schemas"]["ReadingExercise"];
export type ReadingExerciseType = ReadingExercise["tasks"][0]["type"];
export type ReadingExerciseQuestion = ReadingExercise["tasks"][0]["questions"];

export type ReadingMultipleChoiceTask =
  components["schemas"]["ReadingMultipleChoiceTask"];
export type ReadingTFNGTask = components["schemas"]["ReadingTFNGTaskSchema"];

export type ReadingTask = ReadingMultipleChoiceTask | ReadingTFNGTask;

export type RegisterCenterInput = components["schemas"]["RegisterCenterInput"];
export type GetCenterClassListInput =
  components["schemas"]["GetClassListInput"];
export type UpdateClassInput = components["schemas"]["UpdateClassInput"];
export type GetExerciseListInput =
  components["schemas"]["GetExerciseListInput"];
export type CreateExerciseInput = components["schemas"]["CreateExerciseInput"];
