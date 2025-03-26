import client from "../../../core/client";
import { GetAssignmentsByUserInput } from "../../../schema/types";

async function getAssignmentsByUser(input: GetAssignmentsByUserInput) {
  const result = await client.GET("/api/assignment/student", {
    params: {
      query: input,
    },
  });

  if (result.error) {
    throw new Error(result.error.error);
  }

  return result.data.data;
}

export default getAssignmentsByUser;
