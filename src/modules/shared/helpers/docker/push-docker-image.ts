import { generateDockerImageName } from './docker-image-name-builder';
import { executeCommand } from '../execute-command';
import cli from 'cli-ux';
import { container } from 'tsyringe';
import { Logger } from '../../services/logger';

export async function pushDockerImage(
    localImageName: string,
    tags: string[],
    imageName: string,
    dryRun: boolean,
    registry?: string,
) {
    const logger = container.resolve(Logger);
    for (const tag of tags) {
        const dockerImageName = generateDockerImageName(imageName, tag, registry);
        cli.action.start(`Pushing ${dockerImageName}...`);
        await executeCommand(
            `docker tag ${localImageName} ${dockerImageName} && docker push ${dockerImageName}`,
            dryRun,
        );
        cli.action.stop();
        logger.log(`Successfully pushed ${dockerImageName}`);
    }
}
