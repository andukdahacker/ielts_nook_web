import client from "../../../core/client";

async function me() {
  const result = await client.GET("/api/me/");

  if (result.error) {
    throw new Error(result.error.error);
  }

  return result.data.data;
}

export default me;
