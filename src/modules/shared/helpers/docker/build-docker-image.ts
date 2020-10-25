import { Logger } from '../../interfaces/logger';
import { generateDockerImageName } from './docker-image-name-builder';
import { executeCommand } from '../execute-command';
import cli from 'cli-ux';

export async function buildDockerImage(
    directory: string,
    imageName: string,
    log: Logger,
    error: Logger,
    dockerFileName: string,
    registry?: string,
    dryRun = false,
) {
    const localDockerImageName = generateDockerImageName(imageName, 'local-build');
    cli.action.start(`Building local image ${localDockerImageName}`);
    await executeCommand(
        `cd ${directory} && docker build . -f ${dockerFileName} -t ${localDockerImageName}`,
        log,
        error,
        dryRun,
    );
    cli.action.stop();
    return localDockerImageName;
}
