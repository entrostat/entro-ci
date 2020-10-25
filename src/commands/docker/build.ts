import { Command, flags } from '@oclif/command';
import { hashDirectory } from '../../modules/shared/helpers/hash-directory';
import { executeCommand } from '../../modules/shared/helpers/execute-command';
import { generateDockerImageName } from '../../modules/shared/helpers/docker/docker-image-name-builder';
import * as path from 'path';
import { buildDockerImage } from '../../modules/shared/helpers/docker/build-docker-image';
import { pushDockerImage } from '../../modules/shared/helpers/docker/push-docker-image';

export default class DockerBuild extends Command {
    static description =
        'Checks if the Docker image has been built before and if it has not then it will build it and push it with the' +
        ' hash to the Docker registry';

    static flags = {
        directory: flags.string({
            char: 'd',
            required: true,
            description: 'The path to the directory that you want to build',
        }),
        'image-name': flags.string({
            char: 'i',
            required: true,
            description:
                'The name of the Docker image name without the version on it, eg: entrostat/entro-ci is correct and' +
                ' entrostat/entro-ci:latest is not valid',
        }),
        'docker-file-name': flags.string({
            char: 'f',
            default: 'Dockerfile',
            description: 'The name of the Docker file in the directory',
        }),
        registry: flags.string({
            char: 'r',
            description: 'The registry that should be used (by default Docker Hub is used)',
        }),
        tag: flags.string({
            char: 't',
            description:
                'The tag version that should be pushed to the registry so that it can be used in automated deployments',
        }),
        'dry-run': flags.boolean({
            char: 'R',
            default: false,
            description: 'Whether to run this live or do a dry run',
        }),
    };

    static args = [];

    async run() {
        const { args, flags } = this.parse(DockerBuild);
        const directory = path.resolve(flags.directory);
        const hash = await hashDirectory(directory, this.log, this.error);
        const exists = await this.dockerImageExists(flags['image-name'], hash, flags.registry);

        if (exists) {
            this.log(`The image already exists, there is no need to build it again!`);
            this.exit(0);
        }

        this.log(`The image was not found in the registry, building the image now...`);

        const localImageName = await buildDockerImage(
            directory,
            flags['image-name'],
            this.log,
            this.warn,
            flags['docker-file-name'],
            flags.registry,
            flags['dry-run'],
        );
        const tags = [hash];
        if (flags['tag']) {
            tags.push(flags['tag']);
        }
        await pushDockerImage(
            localImageName,
            tags,
            flags['image-name'],
            this.log,
            this.warn,
            flags['dry-run'],
            flags.registry,
        );
    }

    private async dockerImageExists(imageName: string, hash: string, registry?: string): Promise<boolean> {
        try {
            await executeCommand(
                `docker pull ${generateDockerImageName(imageName, hash, registry)}`,
                this.log,
                this.warn,
                false,
            );
            return true;
        } catch (e) {
            return false;
        }
    }
}
