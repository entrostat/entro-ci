import { executeCommand } from './execute-command';
import { Logger } from '../interfaces/logger';

export async function hashFile(filePath: string, log: Logger, error: Logger): Promise<string> {
    // Check here for the command:
    // https://stackoverflow.com/questions/545387/linux-compute-a-single-hash-for-a-given-folder-contents

    let hash = await executeCommand(`sha1sum ${filePath}`, log, error, false);
    hash = hash.replace(/ +.+/, '');
    hash = hash.replace(/\n/, '');
    return hash;
}
