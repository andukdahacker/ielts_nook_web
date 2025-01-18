import client from "../../../core/client";
import { CreateUserFormInput } from "../create_user.view";

async function createUser(input: CreateUserFormInput) {
  const result = await client.POST("/api/user/", {
    body: input,
  });

  if (result.error) {
    throw new Error(result.error.error);
  }

  return result.data.data;
}

export default createUser;
