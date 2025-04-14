import client from "../../../core/client";
import { GetClassListByUserInput } from "../../../schema/types";

async function getClassListByUser(input: GetClassListByUserInput) {
    const result = await client.GET("/api/class/list/user", {
        params: { query: input },
    });

    if (result.error) {
        throw new Error(result.error.error);
    }

    return result.data.data;
}

export default getClassListByUser