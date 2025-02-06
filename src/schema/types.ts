import { components } from "./schema";

export type UserRole = components["schemas"]["UserRole"];
export type Center = components["schemas"]["Center"];
export type User = components["schemas"]["User"];
export type Class = components["schemas"]["Class"];
export type Exercise = components["schemas"]["Exercise"];

export type ReadingExercise = components["schemas"]["ReadingExercise"];
export type ReadingExerciseType = components["schemas"]["ReadingExerciseType"];
export type ReadingMultipleChoiceTask =
  components["schemas"]["ReadingMultipleChoiceTask"];

export type RegisterCenterInput = components["schemas"]["RegisterCenterInput"];
export type GetCenterClassListInput =
  components["schemas"]["GetClassListInput"];
export type UpdateClassInput = components["schemas"]["UpdateClassInput"];
export type GetExerciseListInput =
  components["schemas"]["GetExerciseListInput"];
