import { generateDockerImageName } from './docker-image-name-builder';
import { executeCommand } from '../execute-command';
import cli from 'cli-ux';

export interface BuildDockerImageParams {
    directory: string;
    imageName: string;
    dockerFileName: string;
    dryRun: boolean;
    dockerBuildFlags: string[];
}

export async function buildDockerImage({
    directory,
    imageName,
    dockerFileName,
    dryRun = false,
    dockerBuildFlags = [],
}: BuildDockerImageParams) {
    const localDockerImageName = generateDockerImageName(imageName, 'local-build');
    cli.action.start(`Building local image ${localDockerImageName}`);
    try {
        await executeCommand(
            `docker buildx create --name entro-ci-builder --driver docker-container --bootstrap`,
            dryRun,
        );
    } catch (e) {
        console.error('Error creating builder', ((e as any) || {}).message);
        console.error(`It's likely that the builder already, exists, continuing...`);
    }
    await executeCommand(`docker buildx use entro-ci-builder`, dryRun);
    await executeCommand(
        `cd ${directory} && docker buildx build . -f ${dockerFileName} -t ${localDockerImageName} ${dockerBuildFlags.join(
            ' ',
        )}`,
        dryRun,
    );
    cli.action.stop();
    return localDockerImageName;
}
