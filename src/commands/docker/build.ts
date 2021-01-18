import { flags } from '@oclif/command';
import { hashDirectory } from '../../modules/shared/helpers/hash-directory';
import * as path from 'path';
import { BuildImageWorkflowBaseCommand } from '../../modules/shared/base-commands/build-image-workflow.base-command';
import { DockerBuildFlags } from '../../modules/models/docker-build-flags';
import { plainToClass } from 'class-transformer';

export default class DockerBuild extends BuildImageWorkflowBaseCommand {
    static description =
        'Checks if the Docker image has been built before and if it has not then it will build it and push it with the' +
        ' hash to the Docker registry';

    static example = `entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable`;

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
        const { flags } = this.parse(DockerBuild);
        const directory = path.resolve(flags.directory);
        const hash = await hashDirectory(directory, this.log, this.error);
        const dockerBuildFlags = plainToClass(DockerBuildFlags, flags);
        // I found that the alias doesn't seem to be working in my deployment
        // environment. For short term, I'm going to set it using this.
        dockerBuildFlags.imageName = flags['image-name'];
        dockerBuildFlags.dockerFileName = flags['docker-file-name'];
        dockerBuildFlags.dryRun = flags['dry-run'];
        this.log(`Running with the following options`, dockerBuildFlags);
        await this.buildFromHash(hash, directory, dockerBuildFlags);
    }
}
