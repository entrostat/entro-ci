import { executeCommand } from './execute-command';
import { fixHash } from './fix-hash';

export async function hashFile(filePath: string): Promise<string> {
    // Check here for the command:
    // https://stackoverflow.com/questions/545387/linux-compute-a-single-hash-for-a-given-folder-contents

    return fixHash(await executeCommand(`sha1sum '${filePath}'`, false));
}
