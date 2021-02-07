import { flags } from '@oclif/command';
import { hashDirectory } from '../../modules/shared/helpers/hash-directory';
import * as path from 'path';
import { BuildImageWorkflowBaseCommand } from '../../modules/shared/base-commands/build-image-workflow.base-command';
import { hashDirectories } from '../../modules/shared/helpers/hash-directories';

export default class DockerBuild extends BuildImageWorkflowBaseCommand {
    static description =
        'Checks if the Docker image has been built before and if it has not then it will build it and push it with the' +
        ' hash to the Docker registry';

    static examples = [
        `entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable`,
        `entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable --watch-directory=./backend/src`,
        `entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable --watch-directory=./backend/src --watch-directory=./backend/migrations`,
        `entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable --watch-directory=./project/shared --watch-directory=./backend`,
    ];

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
        package: flags.string({
            char: 'p',
            description: 'The path to the package.json that holds the version of the build',
            default: './package.json',
        }),
        'dry-run': flags.boolean({
            char: 'R',
            default: false,
            description: 'Whether to run this live or do a dry run',
        }),
        'watch-directory': flags.string({
            char: 'w',
            required: false,
            multiple: true,
            description: `Directories that should be watched to trigger the build. Note, if you set this then it IGNORES the build directory so you'd have to add that here as well.`,
        }),
    };

    static args = [];

    async run() {
        const { flags } = this.parse(DockerBuild);
        const directory = path.resolve(flags.directory);

        const watchDirectories = flags['watch-directory'] || [];
        // We override the hash that's generated depending on whether or not the
        //  watch directories flag has been set.
        const hash =
            watchDirectories.length > 0 ? await hashDirectories(watchDirectories) : await hashDirectory(directory);

        const dockerBuildFlags = this.createBuildFlags(flags);
        this.log(`Running with the following options`, dockerBuildFlags);
        await this.buildFromHash(hash, directory, Object.freeze(dockerBuildFlags) as any);
    }

    private createBuildFlags(flags: any) {
        // I found that the alias doesn't seem to be working in my deployment
        // environment. For short term, I'm going to set it using this.
        flags.imageName = flags['image-name'];
        flags.dockerFileName = flags['docker-file-name'];
        flags.dryRun = flags['dry-run'];
        flags.watchDirectories = flags['watch-directory'];
        return flags;
    }
}
