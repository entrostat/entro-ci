import { executeCommand } from '../execute-command';
import { generateDockerImageName } from './docker-image-name-builder';
import { Logger } from '../../interfaces/logger';

export async function dockerImageExists(
    imageName: string,
    hash: string,
    log: Logger,
    error: Logger,
    registry?: string,
): Promise<boolean> {
    try {
        await executeCommand(`docker pull ${generateDockerImageName(imageName, hash, registry)}`, log, error, false);
        return true;
    } catch (e) {
        return false;
    }
}
