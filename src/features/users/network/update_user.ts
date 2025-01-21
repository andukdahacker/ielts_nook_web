import client from "../../../core/client";
import { EditUserFormInput } from "../edit_user.modal";

async function updateUser(input: EditUserFormInput, userId: string) {
  const result = await client.PUT("/api/user/", {
    body: {
      userId,
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      username: input.username,
      role: input.role,
    },
  });

  if (result.error) {
    throw new Error(result.error.error);
  }

  return result.data.data;
}

export default updateUser;
