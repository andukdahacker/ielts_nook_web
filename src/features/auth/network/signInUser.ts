import client from "../../../core/client";
import { SignInFormInput } from "../views/sign_in.view";

async function signInUser(input: SignInFormInput) {
  const result = await client.POST("/api/user/signIn", {
    body: { email: input.email, password: input.password },
  });

  if (result.error) {
    throw new Error(result.error.error);
  }

  return result.data.data;
}

export default signInUser;
