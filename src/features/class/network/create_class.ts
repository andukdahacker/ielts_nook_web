import client from "../../../core/client";
import { CreateClassFormInput } from "../create_class.modal";

async function createClass(input: CreateClassFormInput) {
  const result = await client.POST("/api/class/", {
    body: {
      centerId: input.centerId,
      name: input.name,
      description: input.description,
      classMember: input.classMembers.map((user) => user.id),
    },
  });

  if (result.error) {
    throw new Error(result.error.error);
  }

  return result.data.data;
}

export default createClass;
