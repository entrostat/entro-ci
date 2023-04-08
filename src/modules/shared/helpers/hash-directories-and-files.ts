import { executeCommand } from './execute-command';
import { hashDirectories } from './hash-directories';
import { hashFiles } from './hash-files';

export async function hashDirectoriesAndFiles(directories: string[], files: string[]): Promise<string> {
    const directoriesHash = await hashDirectories(directories);
    const filesHash = await hashFiles(files);

    let hash = await executeCommand(`echo ${directoriesHash.trim() + filesHash.trim()} | sha1sum`, false);
    hash = hash.replace(/ +-/, '');
    hash = hash.replace(/\n/, '');

    return hash;
}
