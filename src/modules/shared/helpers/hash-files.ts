import { Logger } from '../interfaces/logger';
import { executeCommand } from './execute-command';
import { fixHash } from './fix-hash';
import { hashFile } from './hash-file';

export async function hashFiles(filePaths: string[], log: Logger, error: Logger): Promise<string> {
    const hashes = await Promise.all(filePaths.map(filePath => hashFile(filePath, log, error)));
    const combinedHash = hashes.sort().reduce((a, b) => `${a}${b}`, '');
    const finalHash = await executeCommand(`echo -n "${combinedHash}" | sha1sum`, log, error, false);
    return fixHash(finalHash);
}
