import { generateDockerImageName } from './docker-image-name-builder';
import { executeCommand } from '../execute-command';
import { Logger } from '../../interfaces/logger';
import cli from 'cli-ux';

export async function pushDockerImage(
    localImageName: string,
    tags: string[],
    imageName: string,
    log: Logger,
    error: Logger,
    dryRun: boolean,
    registry?: string,
) {
    for (const tag of tags) {
        const dockerImageName = generateDockerImageName(imageName, tag, registry);
        cli.action.start(`Pushing ${dockerImageName}...`);
        await executeCommand(
            `docker tag ${localImageName} ${dockerImageName} && docker push ${dockerImageName}`,
            log,
            error,
            dryRun,
        );
        cli.action.stop();
        log(`Successfully pushed ${dockerImageName}`);
    }
}
