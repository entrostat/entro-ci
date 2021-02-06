import { executeCommand } from './execute-command';
import { fixHash } from './fix-hash';
import { hashFile } from './hash-file';

export async function hashFiles(filePaths: string[]): Promise<string> {
    const hashes = await Promise.all(filePaths.map(filePath => hashFile(filePath)));
    const combinedHash = hashes.sort().reduce((a, b) => `${a}${b}`, '');
    const finalHash = await executeCommand(`echo -n "${combinedHash}" | sha1sum`, false);
    return fixHash(finalHash);
}
