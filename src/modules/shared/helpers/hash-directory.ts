import { executeCommand } from './execute-command';
import { Logger } from '../interfaces/logger';

export async function hashDirectory(directory: string, log: Logger, error: Logger): Promise<string> {
    // Check here for the command:
    // https://stackoverflow.com/questions/545387/linux-compute-a-single-hash-for-a-given-folder-contents

    let hash = await executeCommand(
        `find ${directory} -type f -print0 | sort -z | xargs -0 sha1sum | sha1sum`,
        log,
        error,
        false,
    );
    hash = hash.replace(/ +-/, '');
    hash = hash.replace(/\n/, '');
    return hash;
}
