import { Logger } from '../../interfaces/logger';
import { generateDockerImageName } from './docker-image-name-builder';
import cli from 'cli-ux';
import { executeCommand } from '../execute-command';

export async function pullDockerImage(
    hash: string,
    imageName: string,
    log: Logger,
    error: Logger,
    registry?: string,
    dryRun = false,
) {
    const dockerImageName = generateDockerImageName(imageName, hash, registry);
    cli.action.start(`Pulling docker image ${dockerImageName}`);
    await executeCommand(`docker pull ${dockerImageName}`, log, error, dryRun);
    cli.action.stop();
    return dockerImageName;
}
