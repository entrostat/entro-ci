import { executeCommand } from '../execute-command';
import { generateDockerImageName } from './docker-image-name-builder';

export async function dockerImageExists(imageName: string, hash: string, registry?: string): Promise<boolean> {
    try {
        await executeCommand(`docker pull ${generateDockerImageName(imageName, hash, registry)}`, false);
        return true;
    } catch (e) {
        return false;
    }
}
