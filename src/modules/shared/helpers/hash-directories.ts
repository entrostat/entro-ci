import { executeCommand } from './execute-command';
import { hashDirectory } from './hash-directory';

export async function hashDirectories(directories: string[]): Promise<string> {
    const hashes = await Promise.all(directories.map(directory => hashDirectory(directory)));
    const sortedHashes = hashes.sort();

    let hash = await executeCommand(`echo ${sortedHashes.map(hash => `"${hash}"`).join(' ')} | sha1sum`, false);
    hash = hash.replace(/ +-/, '');
    hash = hash.replace(/\n/, '');

    return hash;
}
