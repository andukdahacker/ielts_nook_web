import client from '../../../core/client';
import { GetClassMemberInput } from '../../../schema/types';

async function getClassMember(input: GetClassMemberInput) {
    const result = await client.GET('/api/class/{classId}/member/{userId}', {
        params: {
            path: input,
        },
    });

    if (result.error) {
        throw new Error(result.error.error);
    }

    return result.data.data;
}

export default getClassMember;
