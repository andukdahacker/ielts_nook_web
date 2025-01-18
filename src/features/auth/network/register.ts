import { createUserWithEmailAndPassword } from "@firebase/auth";
import client from "../../../core/client";
import { firebaseAuth } from "../../../core/firebase";
import { RegisterFormInput } from "../views/register.view";

async function register(input: RegisterFormInput) {
  const userCredentials = await createUserWithEmailAndPassword(
    firebaseAuth,
    input.email,
    input.password,
  );
  const result = await client.POST("/api/center/register", {
    body: { email: input.email, name: input.name },
  });

  if (result.error) {
    throw new Error(result.error.error);
  }

  return {
    center: result.data.data,
    shouldVerifyEmail: !userCredentials.user.emailVerified,
  };
}

export default register;
