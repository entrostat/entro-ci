import { flags } from '@oclif/command';
import { BuildImageWorkflowBaseCommand } from '../../modules/shared/base-commands/build-image-workflow.base-command';
import * as path from 'path';
import { hashFile } from '../../modules/shared/helpers/hash-file';
import { hashFiles } from '../../modules/shared/helpers/hash-files';
import { plainToInstance } from 'class-transformer';
import { DockerBuildFromBuildFlags } from '../../modules/models/docker-build-from.build-flags';

export default class DockerBuildFromFile extends BuildImageWorkflowBaseCommand {
    static description =
        'Checks to see if a specific Dockerfile has changed (not the contents of a directory) and builds if this is the case';

    static examples = [
        `entro-ci docker:build-from-file --image-name=my-repo/my-image --docker-file-path=./backend/Dockerfile --watch-file=./backend/package.json --watch-file=./backend/manifest.json --tag=stable`,
        `entro-ci docker:build-from-file --image-name=my-repo/my-image --docker-file-path=./backend/Dockerfile --watch-file=./backend/package.json --watch-file=./backend/manifest.json --tag=stable --docker-build-flags="--build-arg API_VERSION=v2"`,
    ];

    static flags = {
        'image-name': flags.string({
            char: 'i',
            required: true,
            description:
                'The name of the Docker image name without the version on it, eg: entrostat/entro-ci is correct and' +
                ' entrostat/entro-ci:latest is not valid',
        }),
        'docker-file-path': flags.string({
            char: 'f',
            required: true,
            description: 'The path to the Docker file',
        }),
        'watch-file': flags.string({
            char: 'w',
            required: false,
            multiple: true,
            description:
                'One or more files that should be "watched" for change that fall into this Dockerfile. So it is not a whole folder but a file or two.',
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
        const { flags } = this.parse(DockerBuildFromFile);
        const filePath = path.resolve(flags['docker-file-path']);
        const watchedFilePaths = (flags['watch-file'] || []).map(file => path.resolve(file));
        const hash =
            watchedFilePaths.length > 0
                ? await hashFiles(watchedFilePaths.concat([filePath]))
                : await hashFile(filePath);
        const dockerBuildFromFileFlags = this.createBuildFlags(flags);
        this.log(`Running with the following options`, dockerBuildFromFileFlags);
        await this.buildFromHash(
            hash,
            path.dirname(dockerBuildFromFileFlags.dockerFilePath),
            Object.freeze(dockerBuildFromFileFlags),
        );
    }

    private createBuildFlags(flags: any) {
        flags['docker-file-name'] = path.basename(flags['docker-file-path']);
        const dockerBuildFromFileFlags = plainToInstance(DockerBuildFromBuildFlags, flags as object);
        dockerBuildFromFileFlags.imageName = flags['image-name'];
        dockerBuildFromFileFlags.dockerFileName = flags['docker-file-name'];
        dockerBuildFromFileFlags.dockerFilePath = flags['docker-file-path'];
        dockerBuildFromFileFlags.dryRun = flags['dry-run'];
        dockerBuildFromFileFlags.watchFile = flags['watch-file'];
        dockerBuildFromFileFlags.dockerBuildFlags = flags['docker-build-flags'];
        dockerBuildFromFileFlags.dockerUsername = flags['docker-username'];
        dockerBuildFromFileFlags.dockerPassword = flags['docker-password'];
        return dockerBuildFromFileFlags;
    }
}
