import client from "../../../core/client";
import { CreateAssignmentsInput } from "../../../schema/types";

async function createAssignments(input: CreateAssignmentsInput) {
  const result = await client.POST("/api/assignment/", { body: input });

  if (result.error) {
    throw new Error(result.error.error);
  }

  return result.data;
}

export default createAssignments;
