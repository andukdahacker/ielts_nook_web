import client from '../../../core/client';
import { UpdateSubmissionInput } from '../../../schema/types';

async function updateSubmission(input: UpdateSubmissionInput) {
    const result = await client.PUT('/api/submission/', {
        body: input,
    });

    if (result.error) {
        throw new Error(result.error.error);
    }

    return result.data.data;
}

export default updateSubmission;
