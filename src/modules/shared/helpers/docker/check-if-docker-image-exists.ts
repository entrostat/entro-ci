import { generateDockerImageName } from './docker-image-name-builder';
import cli from 'cli-ux';
import { executeCommand } from '../execute-command';

export async function checkIfDockerImageExists(hash: string, imageName: string, registry?: string, dryRun = false) {
    const dockerImageName = generateDockerImageName(imageName, hash, registry);
    cli.action.start(`Pulling docker image ${dockerImageName}`);
    // Check the following link for the command:
    // https://stackoverflow.com/questions/32113330/check-if-imagetag-combination-already-exists-on-docker-hub
    const result = await executeCommand(`docker manifest inspect ${dockerImageName} > /dev/null ; echo $?`, dryRun);
    cli.action.stop();
    if (result.trim() !== '0') {
        throw new Error(`Docker image ${dockerImageName} does not exist`);
    }
    return dockerImageName;
}
