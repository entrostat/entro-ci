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
        `entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable --watch-directory=./project/shared --watch-directory=./backend --docker-build-flags="--build-arg API_VERSION=v2 --build-arg ENV=prod"`,
        `entro-ci docker:build --directory=./backend --image-name=my-repo/my-image --tag=stable --watch-directory=./project/shared --watch-directory=./backend --docker-build-flags="--build-arg API_VERSION=v2" --docker-build-flags="--build-arg ENV=prod"`,
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
        'docker-build-flags': flags.string({
            char: 'b',
            required: false,
            multiple: true,
            description:
                'Any additional build flags that you would like to plug directly into the Docker build command',
        }),
        'docker-username': flags.string({
            char: 'u',
            required: false,
            multiple: false,
            description:
                'The username for logging into the docker repository (mainly for if you are running this build process inside a container)',
        }),
        'docker-password': flags.string({
            char: 'P',
            required: false,
            multiple: false,
            description:
                'The password for logging into the docker repository (mainly for if you are running this build process inside a container)',
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
        flags.dockerBuildFlags = flags['docker-build-flags'];
        flags.dockerUsername = flags['docker-username'];
        flags.dockerPassword = flags['docker-password'];
        return flags;
    }
}
